import { Card, Center, Group, Text, useMantineTheme } from '@mantine/core';
import { IconHeart, IconMessageCircle } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { Post } from '@/types/post';
import classes from './PostCard.module.css';

interface Props {
  post: Post;
}

export function PostCard({ post }: Props) {
  const theme = useMantineTheme();
  const router = useRouter();

  const handleNavigateToPost = () => {
    router.push(`/posts/${post.id}`);
  };

  return (
    <Card p="lg" shadow="lg" className={classes.card} radius="md" onClick={handleNavigateToPost}>
      <div
        className={classes.image}
        style={{
          backgroundImage: `url(${post.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Text size="lg" className={classes.title} fw={500}>
            {post.title}
          </Text>

          <Group justify="space-between" gap="xs">
            <Text size="sm" className={classes.author}>
              {`${post.author_name} ${post.author_surname}`}
            </Text>

            <Group gap="lg">
              <Center>
                <IconHeart size={16} stroke={1.5} color={theme.colors.dark[2]} />
                <Text size="sm" className={classes.bodyText}>
                  {post.likes}
                </Text>
              </Center>
              <Center>
                <IconMessageCircle size={16} stroke={1.5} color={theme.colors.dark[2]} />
                <Text size="sm" className={classes.bodyText}>
                  {post.comments}
                </Text>
              </Center>
            </Group>
          </Group>
        </div>
      </div>
    </Card>
  );
}
