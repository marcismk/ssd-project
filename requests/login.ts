import { httpClient } from "@/lib/client";
import type { User } from "@/types/user";

interface LoginPayload {
	email: string;
	password: string;
	remember?: boolean;
}

interface LoginResponse {
	user: User;
}

export const loginRequest = async (
	payload: LoginPayload,
): Promise<LoginResponse> =>
	httpClient.post<LoginResponse>("auth/login", payload);
