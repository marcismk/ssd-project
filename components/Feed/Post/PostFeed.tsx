'use client';

import { ActionIcon, Divider, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconSend } from '@tabler/icons-react';
import { useState } from 'react';
import useSWR from 'swr';
import { createComment } from '@/requests/createComment';
import { getComments } from '@/requests/getComments';
import type { Post as PostType } from '@/types/post';
import { Comment } from './Comment';
import { Editor } from './Editor';
import { Post } from './Post';

interface Props {
  post: PostType;
}

export const PostFeed = ({ post }: Props) => {
  const [loading, setLoading] = useState(false);
  const { data, mutate } = useSWR(`/posts/${post.id}/comments`, () => getComments(post.id));
  const form = useForm({
    initialValues: {
      content: '',
    },
    validate: {
      content: (value) => (value.length < 1 ? 'Comment cannot be empty' : null),
    },
  });

  const handleCommentSubmit = async ({ content }: { content: string }) => {
    setLoading(true);
    try {
      await createComment(post.id, content);
      await mutate();
      form.reset();
    } catch (error) {
      console.error('Failed to create comment', error);
    }
    setLoading(false);
  };

  return (
    <Stack style={{ position: 'relative' }} gap="md" p="md">
      <Post
        id={post.id}
        title={post.title}
        image={post.image}
        meta={post.meta}
        created_at={post.created_at}
        user={{ id: post.author_id, name: post.author_name, surname: post.author_surname }}
        likes={post.likes}
        comments={post.comments}
        view
      />

      <Stack gap="md" p="md" mb="80px">
        {data?.map((comment: any) => (
          <Comment
            key={comment.id}
            content={comment.content}
            createdAt={comment.created_at}
            authorName={comment.author_name}
            authorSurname={comment.author_surname}
          />
        ))}
      </Stack>

      <Stack h="80px" w="100%" style={{ position: 'absolute', bottom: 0, left: 0 }} p="md">
        <Divider />
        <form onSubmit={form.onSubmit(handleCommentSubmit)}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 50px',
              gap: '8px',
              alignItems: 'start',
            }}
          >
            <Editor
              value={form.values.content}
              onChange={(value) => form.setFieldValue('content', value)}
            />
            <ActionIcon
              w="50px"
              h="50px"
              variant="filled"
              color="blue"
              type="submit"
              loading={loading}
            >
              <IconSend size="1.25rem" />
            </ActionIcon>
          </div>
        </form>
      </Stack>
    </Stack>
  );
};
