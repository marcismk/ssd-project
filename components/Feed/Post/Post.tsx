import { ActionIcon, Avatar, Box, Group, Image, Stack, Text } from '@mantine/core';
import { IconHeart, IconMessageCircle } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { mutate } from 'swr';
import { likePost } from '@/requests/likePost';
import { useAuth } from '@/stores/useAuth';
import { PostActions } from './PostActions';

interface PostUser {
  id: number;
  name: string | null;
  surname: string | null;
}

export interface PostProps {
  id: number;
  title: string;
  image: string | null;
  meta: string | null;
  created_at: string;
  user: PostUser;
  likes: number;
  comments: number;
  view?: boolean;
}

export const Post = ({ id, title, image, created_at, user, likes, comments, view }: PostProps) => {
  const router = useRouter();
  const currentUser = useAuth((state) => state.user);
  const displayName = [user.name, user.surname].filter(Boolean).join(' ') || 'Unknown User';
  const initials = [user.name?.[0], user.surname?.[0]].filter(Boolean).join('').toUpperCase();

  const formattedDate = new Date(created_at).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleNavigateToPost = () => {
    router.push(`/posts/${id}`);
  };

  const handleLike = async () => {
    try {
      await likePost(id);
      await mutate(`/posts`);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  console.log({ view, currentUser, postUser: user });

  return (
    <Box
      p="md"
      onClick={view ? undefined : handleNavigateToPost}
      maw={800}
      h="45dvh"
      mx="auto"
      style={{ cursor: view ? 'default' : 'pointer' }}
    >
      <Group justify="space-between" mb="sm">
        <Group gap="sm">
          <Avatar radius="xl" size="md" color="blue">
            {initials}
          </Avatar>
          <Stack gap={0}>
            <Text fw={600} size="sm">
              {displayName}
            </Text>
            <Text size="xs" c="dimmed">
              {formattedDate}
            </Text>
          </Stack>
        </Group>
      </Group>

      {image && (
        <Image
          src={image}
          alt={title}
          radius="md"
          mb="sm"
          style={{ height: 'calc(100% - 88px)', objectFit: 'cover' }}
        />
      )}

      {title && (
        <Text size="sm" mb="xs">
          {title}
        </Text>
      )}

      <Group justify="space-between" mt="xs">
        <Group gap="md">
          <ActionIcon variant="subtle" color="red" aria-label="Like" onClick={handleLike}>
            <IconHeart size={18} />
            {likes && (
              <Text size="xs" ml={4}>
                {likes >= 1000 ? `${(likes / 1000).toFixed(1)}k` : likes}
              </Text>
            )}
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray" aria-label="Comment">
            <IconMessageCircle size={18} />
            {comments && (
              <Text size="xs" ml={4}>
                {comments >= 1000 ? `${(comments / 1000).toFixed(1)}k` : comments}
              </Text>
            )}
          </ActionIcon>
        </Group>
        {view && currentUser?.id === user.id && <PostActions postId={id} />}
      </Group>
    </Box>
  );
};
