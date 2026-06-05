'use client';

import { Stack } from '@mantine/core';
import useSWR from 'swr';
import { getPosts } from '@/requests/getPosts';
import { CreatePost } from './CreatePost';
import { PostCard } from './Post/PostCard';

export const Feed = () => {
  const { data } = useSWR('/posts', getPosts);

  return (
    <div style={{ position: 'relative' }}>
      <CreatePost />
      <Stack maw={600} mx="auto" p="md">
        {data?.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Stack>
    </div>
  );
};
