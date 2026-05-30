import { httpClient } from "@/lib/client";
import type { Post } from "@/types/post";

interface PostWithAuthor extends Post {
	author_id: number;
	author_name: string;
	author_surname: string;
	likes: number;
	comments: number;
}

interface PostResponse {
	posts: PostWithAuthor[];
}

export const getPosts = async () => {
	try {
		return await httpClient.get<PostResponse>("posts");
	} catch (error) {
		console.error("Error fetching posts:", error);
		throw error;
	}
};
