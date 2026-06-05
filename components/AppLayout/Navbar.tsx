import { AppShell, Avatar, Divider, Group, Stack, Text, UnstyledButton } from '@mantine/core';
import { IconHome2, IconSettings, IconLogout, IconAdjustmentsCog } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import { httpClient } from '@/lib/client';
import { User } from '@/types/user';

interface Props {
  user?: User;
}

export const Navbar = ({ user }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await httpClient.post('/auth/logout');
    router.push('/login');
    router.refresh();
  };

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  const navItems = [
    { icon: IconHome2, label: 'Feed', active: pathname === '/', path: '/' },
    {
      icon: IconAdjustmentsCog,
      label: 'Admin panel',
      active: pathname === '/admin',
      hidden: !user?.is_admin,
      path: '/admin',
    },
    {
      icon: IconSettings,
      label: 'Settings',
      active: pathname === `/user/${user?.id}`,
      path: `/user/${user?.id}`,
    },
  ];

  return (
    <AppShell.Navbar
      bg="dark.8"
      p="md"
      withBorder={false}
      style={{ borderRight: '1px solid var(--mantine-color-dark-6)' }}
    >
      <AppShell.Section>
        {/* Profile */}
        <Stack align="center" gap="xs" mb="md">
          <Avatar size={72} radius="50%">
            {user ? `${user.name[0]}${user.surname[0]}` : '-'}
          </Avatar>
          <Group gap={4} align="center">
            <Text fw={600} size="sm" c="white">
              {user ? `${user.name} ${user.surname}` : '-'}
            </Text>
          </Group>
        </Stack>

        <Divider color="dark.6" mb="md" />
      </AppShell.Section>

      {/* Nav items */}
      <AppShell.Section grow>
        <Stack gap={4}>
          {navItems
            .filter((item) => !item.hidden)
            .map((item) => (
              <UnstyledButton
                key={item.label}
                px="sm"
                py="xs"
                style={(theme) => ({
                  borderRadius: theme.radius.md,
                  backgroundColor: item.active ? theme.colors.dark[6] : 'transparent',
                })}
                onClick={() => handleNavClick(item.path)}
              >
                <Group gap="sm">
                  <item.icon
                    size={20}
                    style={{
                      color: item.active
                        ? 'var(--mantine-color-white)'
                        : 'var(--mantine-color-dark-2)',
                    }}
                  />
                  <Text size="sm" c={item.active ? 'white' : 'dimmed'} style={{ flex: 1 }}>
                    {item.label}
                  </Text>
                </Group>
              </UnstyledButton>
            ))}
        </Stack>
      </AppShell.Section>

      {/* Contacts */}
      <AppShell.Section>
        <Divider color="dark.6" mb="md" />
        <Stack gap="sm">
          <UnstyledButton
            px="sm"
            py="xs"
            style={(theme) => ({
              borderRadius: theme.radius.md,
            })}
            onClick={handleLogout}
          >
            <Group gap="sm">
              <IconLogout />
              <Text size="sm" c="dimmed" style={{ flex: 1 }}>
                Logout
              </Text>
            </Group>
          </UnstyledButton>
        </Stack>
      </AppShell.Section>
    </AppShell.Navbar>
  );
};
