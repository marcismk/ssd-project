'use client';

import { Paper, Avatar, Text } from '@mantine/core';
import useSWR from 'swr';
import { getUserDetails } from '@/requests/getUserDetails';
import { ROLES } from '../Admin/Role';

interface Props {
  userId: number;
}

export const Profile = ({ userId }: Props) => {
  const { data } = useSWR(`/user/${userId}`, () => getUserDetails(userId));

  return (
    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
      <Avatar
        src="https://as2.ftcdn.net/v2/jpg/08/55/20/41/1000_F_855204118_eXsiYhATfTEQXECdkHE65Q1FTCfgvKGC.jpg"
        size={120}
        radius={120}
        mx="auto"
        alt={`${data?.name} ${data?.surname}`}
      />
      <Text ta="center" fz="lg" fw={500} mt="md">
        {`${data?.name} ${data?.surname}`}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {data?.email} • {ROLES[data?.role ?? 0]?.name} • {data?.secret}
        {data?.secret}
      </Text>
    </Paper>
  );
};
