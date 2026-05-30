
import { httpClient } from "@/lib/client";


export const logout = async () => {
    try {
            return await httpClient.post("auth/logout");
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
}