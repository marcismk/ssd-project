import { httpClient } from "@/lib/client";
import type { User } from "@/types/user";

interface SignupPayload extends Record<string, unknown> {
    name: string;
    surname: string;
    email: string;
    password: string;
}

interface SignupResponse {
    user: User;
}

export const signupRequest = async (
    payload: SignupPayload,
): Promise<SignupResponse> =>
    httpClient.post<SignupResponse>("auth/signup", payload);
