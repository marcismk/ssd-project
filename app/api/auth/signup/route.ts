import { connectDB } from "@/lib/dbClient";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const email = typeof body?.email === "string" ? body.email : "";
		const password = typeof body?.password === "string" ? body.password : "";
		const secret = typeof body?.secret === "string" ? body.secret : "";
		const name = typeof body?.name === "string" ? body.name : null;
		const surname = typeof body?.surname === "string" ? body.surname : null;

		if (!email || !password) {
			return Response.json(
				{ error: "Email and password are required" },
				{ status: 400 },
			);
		}

		const db = connectDB();
		try {
			const existing = db
				.prepare("SELECT id FROM users WHERE email = ? LIMIT 1")
				.get(email);

			if (existing) {
				return Response.json(
					{ error: "Email already in use" },
					{ status: 409 },
				);
			}

			const result = db
				.prepare(
					"INSERT INTO users (name, surname, email, password, secret) VALUES (?, ?, ?, ?, ?)",
				)
				.run(name, surname, email, password, secret);

			const user = db
				.prepare(
					"SELECT id, email, name, surname FROM users WHERE id = ? LIMIT 1",
				)
				.get(result.lastInsertRowid);

			return Response.json({ user }, { status: 201 });
		} finally {
			db.close();
		}
	} catch {
		return Response.json({ error: "Invalid request" }, { status: 400 });
	}
}
