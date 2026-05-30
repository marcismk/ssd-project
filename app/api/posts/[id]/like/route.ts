import { connectDB } from "@/lib/dbClient";
import type { TokenPayload } from "@/lib/jwt";
import { withAuth } from "@/lib/withAuth";

export const POST = withAuth(
	async (
		_req: Request,
		{ params }: { params: Promise<Record<string, string>> },
		token: TokenPayload,
	) => {
		const { userId } = token;
		const { id } = await params;
		const postId = Number(id);

		if (!userId) {
			return Response.json({ error: "userId is required" }, { status: 400 });
		}

		if (!id) {
			return Response.json({ error: "Invalid post id" }, { status: 400 });
		}

		if (!Number.isInteger(postId) || postId <= 0) {
			return Response.json({ error: "Invalid post id" }, { status: 400 });
		}

		try {
			const db = connectDB();
			try {
				db.prepare(
					"INSERT INTO likes (posts_id, created_by) VALUES (?, ?)",
				).run(postId, userId);

				return Response.json(
					{ message: "Like added successfully" },
					{ status: 201 },
				);
			} finally {
				db.close();
			}
		} catch {
			return Response.json({ error: "Invalid request" }, { status: 400 });
		}
	},
);
