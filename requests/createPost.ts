import { httpClient } from "@/lib/client";


export const createPost = async (title: string, image: File) => {
    try {
        return await httpClient.post("posts", { title, image });
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
}