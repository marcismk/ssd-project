import { connectDB } from "@/lib/dbClient";
import { withAuth } from "@/lib/withAuth";

export const GET = withAuth(async (_req, _ctx, token) => {
    const { userId } = token;
    const db = connectDB();
    try {
        const user = db
            .prepare(
                `SELECT id, name, surname, email from users WHERE id = ?`,
            )
            .get(userId);

        return Response.json(user, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ error: "Failed to fetch posts" }, { status: 500 });
    } finally {
        db.close();
    }
});
