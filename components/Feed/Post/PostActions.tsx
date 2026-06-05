import { Menu, ActionIcon, Loader } from '@mantine/core';
import { IconDotsVertical, IconTrash } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deletePost } from '@/requests/deletePost';

interface Props {
  postId: number;
}

export const PostActions = ({ postId }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deletePost(postId);
      router.push('/');
    } catch (error) {
      console.error('Failed to delete post', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon variant="subtle" aria-label="Actions">
          <IconDotsVertical size={16} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<IconTrash size={14} />} onClick={handleDelete} disabled={loading}>
          {loading ? <Loader size="sm" /> : 'Delete post'}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
