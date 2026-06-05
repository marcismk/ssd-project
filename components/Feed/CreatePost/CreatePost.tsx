import { Box, Button, Modal, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconMessageShare } from '@tabler/icons-react';
import { useState } from 'react';
import { mutate } from 'swr';
import { httpClient } from '@/lib/client';

export const CreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      title: '',
      image: '',
    },
    validate: {
      title: (value) => (value.length < 2 ? 'Title must be at least 2 characters' : null),
      image: (value) => (value.length < 5 ? 'Image URL must be at least 5 characters' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      await httpClient.post('/posts', values);
      await mutate('/posts');
      close();
    } catch (error) {
      console.error('Failed to create post', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Create post">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md" p="md">
            <TextInput
              withAsterisk
              label="Title"
              placeholder="Post title"
              key={form.key('title')}
              {...form.getInputProps('title')}
            />
            <TextInput
              withAsterisk
              label="Image URL"
              placeholder="Image URL"
              key={form.key('image')}
              {...form.getInputProps('image')}
            />
            <Button type="submit">Save post</Button>
          </Stack>
        </form>
      </Modal>

      <Box pos="sticky" w="100%" p="md" top={20} left={20}>
        <Button
          leftSection={<IconMessageShare style={{ height: 16, width: 16, marginRight: 8 }} />}
          variant="default"
          onClick={open}
          loading={loading}
        >
          New post
        </Button>
      </Box>
    </>
  );
};
