import { httpClient } from "@/lib/client";
import { User } from "@/types/user";

export const getUser = async () => {
	try {
		return await httpClient.get<User>("profile");
	} catch (error) {
		console.error("Error fetching user:", error);
		throw error;
	}
};
