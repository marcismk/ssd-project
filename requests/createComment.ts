import { httpClient } from "@/lib/client";


export const createComment = async (postId: number, content: string) => {
    try {
        return await httpClient.post(`posts/${postId}/comment`, { content });
    } catch (error) {
        console.error("Error creating comment:", error);
        throw error;
    }
}