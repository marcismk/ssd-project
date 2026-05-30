import { connectDB } from "@/lib/dbClient";
import { withAuth } from "@/lib/withAuth";

export const GET = withAuth(async () => {
	const db = connectDB();
	try {
		const posts = db
			.prepare(
				`SELECT p.id, p.title, p.image, p.meta, p.created_at,
				        u.id AS author_id, u.name AS author_name, u.surname AS author_surname,
                        (SELECT COUNT(*) FROM likes WHERE posts_id = p.id) AS likes,
                        (SELECT COUNT(*) FROM comments WHERE posts_id = p.id) AS comments
				 FROM posts p
				 JOIN users u ON u.id = p.users_id
				 ORDER BY p.created_at DESC`,
			)
			.all();

		return Response.json({ posts }, { status: 200 });
	} catch (error) {
		console.log(error);
		return Response.json({ error: "Failed to fetch posts" }, { status: 500 });
	} finally {
		db.close();
	}
});

export const POST = withAuth(async (req: Request, _ctx, token) => {
	const { userId } = token;
	try {
		const body = await req.json();
		const title = typeof body?.title === "string" ? body.title.trim() : "";
		const image = typeof body?.image === "string" ? body.image.trim() : null;
		const meta = typeof body?.meta === "string" ? body.meta.trim() : null;

		if (!title || !userId) {
			return Response.json(
				{ error: "title and userId are required" },
				{ status: 400 },
			);
		}

		const db = connectDB();
		try {
			const result = db
				.prepare(
					"INSERT INTO posts (title, image, meta, users_id, created_by) VALUES (?, ?, ?, ?, ?)",
				)
				.run(title, image, meta, userId, userId);

			const post = db
				.prepare("SELECT * FROM posts WHERE id = ?")
				.get(result.lastInsertRowid);

			return Response.json({ post }, { status: 201 });
		} finally {
			db.close();
		}
	} catch {
		return Response.json({ error: "Invalid request" }, { status: 400 });
	}
});
