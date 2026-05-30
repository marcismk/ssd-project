import { httpClient } from "@/lib/client";


export const getComments = async (postId: number) => {
    try {
        return await httpClient.get<Comment[]>(`/posts/${postId}/comment`);
    } catch (error) {
        console.error("Failed to fetch comments", error);
        throw error;
    }
}