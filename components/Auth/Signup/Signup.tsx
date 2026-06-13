'use client';

import {
  Box,
  Button,
  Grid,
  Group,
  Image,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { isNotEmpty, useForm, isEmail } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signupRequest } from '@/requests/signup';

const DEFAULT_USER_SECRET = 'This is user secret for testing purposes';

export const Signup = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      secret: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      name: isNotEmpty('Name is required'),
      surname: isNotEmpty('Surname is required'),
      email: isEmail('Invalid email address'),
      password: isNotEmpty('Password is required'),
      confirmPassword: (v: string, values) =>
        v === values.password ? null : 'Passwords do not match',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError(null);
    try {
      await signupRequest({
        name: values.name,
        surname: values.surname,
        email: values.email,
        password: values.password,
        secret: values.secret || DEFAULT_USER_SECRET,
      });

      router.push('/');
      router.refresh();
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        style={{
          width: '100%',
          maxWidth: 900,
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
        }}
      >
        <Grid gap={0}>
          {/* ── Left: Form ── */}
          <Grid.Col span={{ base: 12, sm: 5 }}>
            <Box
              p={{ base: 'xl', sm: 48 }}
              style={{
                minHeight: 520,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Stack gap="xs" mb="xl">
                <Title order={2} c="dark.9" fw={700}>
                  Sign up
                </Title>
                <Text c="dimmed" size="sm">
                  Create an account to access exclusive features and stay updated
                </Text>
              </Stack>

              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="md">
                  <TextInput
                    label="Name"
                    placeholder="Antons"
                    styles={{ label: { color: '#333', fontWeight: 500 } }}
                    {...form.getInputProps('name')}
                  />
                  <TextInput
                    label="Surname"
                    placeholder="Spainis"
                    styles={{ label: { color: '#333', fontWeight: 500 } }}
                    {...form.getInputProps('surname')}
                  />
                  <TextInput
                    label="Email"
                    placeholder="user@example.com"
                    styles={{ label: { color: '#333', fontWeight: 500 } }}
                    {...form.getInputProps('email')}
                  />
                  <TextInput
                    label="Secret (optional)"
                    placeholder="Enter a secret"
                    styles={{ label: { color: '#333', fontWeight: 500 } }}
                    {...form.getInputProps('secret')}
                  />
                  <PasswordInput
                    label="Password"
                    placeholder="••••••••"
                    styles={{ label: { color: '#333', fontWeight: 500 } }}
                    {...form.getInputProps('password')}
                  />

                  <PasswordInput
                    label="Confirm Password"
                    placeholder="••••••••"
                    styles={{ label: { color: '#333', fontWeight: 500 } }}
                    {...form.getInputProps('confirmPassword')}
                  />

                  {error && (
                    <Text c="red" size="sm">
                      {error}
                    </Text>
                  )}

                  <Button
                    type="submit"
                    fullWidth
                    bg="dark.9"
                    radius="md"
                    size="md"
                    loading={loading}
                    style={{ fontWeight: 600 }}
                  >
                    Sign up
                  </Button>

                  <Group justify="center">
                    <Text size="sm" c="dimmed">
                      Already have an account?{' '}
                      <Text
                        component="a"
                        href="/login"
                        size="sm"
                        fw={700}
                        c="dark.9"
                        style={{ textDecoration: 'none' }}
                      >
                        Login
                      </Text>
                    </Text>
                  </Group>
                </Stack>
              </form>
            </Box>
          </Grid.Col>

          {/* ── Right: Image panel ── */}
          <Grid.Col span={{ base: 12, sm: 7 }} visibleFrom="sm">
            <Box style={{ position: 'relative', height: '100%', minHeight: 520 }}>
              <Image
                src="https://plus.unsplash.com/premium_photo-1674917000586-b7564f21540e?q=80&w=776&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="scenic"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                h="100%"
              />
              {/* Dark gradient overlay */}
              <Box
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%)',
                }}
              />
              {/* Bottom text */}
              <Box
                style={{
                  position: 'absolute',
                  bottom: 36,
                  left: 32,
                  right: 32,
                }}
              >
                <Text c="white" size="xl" lh={1.3}>
                  Be a Part of Something{' '}
                  <Text component="span" c="white" fw={800} size="xl">
                    Beautiful
                  </Text>
                </Text>
              </Box>
            </Box>
          </Grid.Col>
        </Grid>
      </Box>
    </Box>
  );
};
