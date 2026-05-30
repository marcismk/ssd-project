"use client";

import { ActionIcon, Divider, Flex, Group, Stack, Textarea, TextInput } from "@mantine/core"
import { Post } from "./Post"
import { getComments } from "@/requests/getComments"
import useSWR from "swr"
import type { Post as PostType } from "@/types/post"
import { Comment } from "./Comment";
import { IconSend } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { createComment } from "@/requests/createComment";
import { useState } from "react";

interface Props {
    post: PostType
}

export const PostFeed = ({ post }: Props) => {
    const [loading, setLoading] = useState(false);
    const { data, mutate } = useSWR(`/posts/${post.id}/comments`, () => getComments(post.id))
    const form = useForm({
        initialValues: {
            content: "",
        },
        validate: {
            content: (value) => (value.length < 1 ? "Comment cannot be empty" : null),
        },
    })


    const handleCommentSubmit = async ({ content }: { content: string }) => {
        setLoading(true);
        try {
            await createComment(post.id, content);
            await mutate();
            form.reset();
        } catch (error) {
            console.error("Failed to create comment", error);
        }
        setLoading(false);
    }

    return (
        <Stack style={{ position: "relative" }} gap="md" p="md">
            <Post id={post.id} title={post.title} image={post.image} meta={post.meta} created_at={post.created_at} user={{ name: post.author_name, surname: post.author_surname }} likes={post.likes} comments={post.comments} />

            <Stack gap="md" p="md" mb="80px">

                {data?.map((comment: any) => (<Comment key={comment.id} content={comment.content} createdAt={comment.created_at} authorName={comment.author_name} authorSurname={comment.author_surname} />))}
            </Stack>

            <Stack h="80px" w="100%" style={{ position: "absolute", bottom: 0, left: 0 }} p="md">
                <Divider />
                <form onSubmit={form.onSubmit(handleCommentSubmit)}>

                    <Stack gap="md">
                        <Textarea placeholder="Write a comment..." {...form.getInputProps("content")} />
                        <ActionIcon w="50px" variant="filled" color="blue" type="submit">
                            <IconSend size="1.25rem" />
                        </ActionIcon>
                    </Stack>
                </form>
            </Stack>
        </Stack>
    )
}