import { extractBearerToken, type TokenPayload, verifyToken } from "@/lib/jwt";

type AuthedHandler = (
	req: Request,
	ctx: { params: Promise<Record<string, string>> },
	token: TokenPayload,
) => Promise<Response>;

export function withAuth(handler: AuthedHandler) {
	return async (
		req: Request,
		ctx: { params: Promise<Record<string, string>> },
	): Promise<Response> => {
		const raw = extractBearerToken(req);
		if (!raw) {
			return Response.json({ error: "Unauthorized" }, { status: 401 });
		}
		try {
			const payload = await verifyToken(raw);
			return handler(req, ctx, payload);
		} catch {
			return Response.json(
				{ error: "Invalid or expired token" },
				{ status: 401 },
			);
		}
	};
}
