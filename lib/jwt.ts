import { type JWTPayload, jwtVerify, SignJWT } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
	throw new Error("JWT_SECRET environment variable is not set");
}

const secret = new TextEncoder().encode(JWT_SECRET);
const ALGORITHM = "HS256";
const EXPIRATION = "7d";

export interface TokenPayload extends JWTPayload {
	userId: number;
	email: string;
}

export async function signToken(
	payload: Omit<TokenPayload, keyof JWTPayload>,
): Promise<string> {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: ALGORITHM })
		.setIssuedAt()
		.setExpirationTime(EXPIRATION)
		.sign(secret);
}

export async function verifyToken(token: string): Promise<TokenPayload> {
	const { payload } = await jwtVerify<TokenPayload>(token, secret, {
		algorithms: [ALGORITHM],
	});
	return payload;
}

export function extractBearerToken(req: Request): string | null {
	const auth = req.headers.get("Authorization");
	if (!auth?.startsWith("Bearer ")) return null;
	return auth.slice(7);
}
