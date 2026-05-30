import { connectDB } from "@/lib/dbClient";

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;
	const postId = Number(id);

	if (!Number.isInteger(postId) || postId <= 0) {
		return Response.json({ error: "Invalid post id" }, { status: 400 });
	}

	const db = connectDB();
	try {
		const post = db
			.prepare(
				`SELECT p.id, p.title, p.image, p.meta, p.created_at,
				        u.id AS author_id, u.name AS author_name, u.surname AS author_surname
				 FROM posts p
				 JOIN users u ON u.id = p.users_id
				 WHERE p.id = ?`,
			)
			.get(postId);

		if (!post) {
			return Response.json({ error: "Post not found" }, { status: 404 });
		}

		return Response.json({ post }, { status: 200 });
	} catch {
		return Response.json({ error: "Failed to fetch post" }, { status: 500 });
	} finally {
		db.close();
	}
}
