import { connectDB } from "@/lib/dbClient";
import type { TokenPayload } from "@/lib/jwt";
import { withAuth } from "@/lib/withAuth";

export const GET = withAuth(
	async (
		req: Request,
		{ params }: { params: Promise<Record<string, string>> },
		token: TokenPayload,
	) => {
		const { id } = await params;
		const postId = Number(id);

		if (!Number.isInteger(postId) || postId <= 0) {
			return Response.json({ error: "Invalid post id" }, { status: 400 });
		}

		try {
			const db = connectDB();
			try {
				const comments = db
					.prepare(
						`SELECT 
						c.id, c.content, c.posts_id, c.created_at, c.created_by, u.name AS author_name, u.surname AS author_surname
						FROM comments c
						LEFT JOIN users u ON c.created_by = u.id
						WHERE c.posts_id = ?
						ORDER BY c.created_at DESC`,
					)
					.all(postId);
				return Response.json(comments, { status: 200 });
			} finally {
				db.close();
			}
		} catch (error) {
			console.log(error);
			return Response.json({ error: "Invalid request" }, { status: 400 });
		}
	},
);

export const POST = withAuth(
	async (
		req: Request,
		{ params }: { params: Promise<Record<string, string>> },
		token: TokenPayload,
	) => {
		const body = await req.json();
		const { userId } = token;
		const { id } = await params;
		const postId = Number(id);

		if (!userId) {
			return Response.json({ error: "userId is required" }, { status: 400 });
		}

		if (!Number.isInteger(postId) || postId <= 0) {
			return Response.json({ error: "Invalid post id" }, { status: 400 });
		}

		try {
			const db = connectDB();
			try {
				const statement = `INSERT INTO comments (content, posts_id, created_by) VALUES ('${body.content}', '${postId}', '${userId}')`;
				db.prepare(
					statement
				).run();

				return Response.json(
					{ message: "Comment added successfully" },
					{ status: 201 },
				);
			} finally {
				db.close();
			}
		} catch (error) {
			console.log(error);
			return Response.json({ error: "Invalid request" }, { status: 400 });
		}
	},
);
