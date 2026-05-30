"use client";

import { Stack } from "@mantine/core";
import useSWR from "swr";
import { getPosts } from "@/requests/getPosts";
import { Post } from "./Post/Post";
import { CreatePost } from "./CreatePost";

export const Feed = () => {
	const { data, isLoading, error } = useSWR("/posts", getPosts);

	return (
		<>
			<Stack maw={600} mx="auto" p="md">
				{data?.posts.map((post) => (
					<Post
						key={post.id}
						id={post.id}
						title={post.title}
						image={post.image}
						meta={post.meta}
						created_at={post.created_at}
						user={{
							name: post.author_name,
							surname: post.author_surname,
						}}
						likes={post.likes || 0}
						comments={post.comments || 0}
					/>
				))}
			</Stack>
			<CreatePost />
		</>
	);
};
