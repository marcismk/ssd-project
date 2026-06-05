import { Badge } from '@mantine/core';

export const ROLES: Record<number, { name: string; color: string }> = {
  1: { name: 'User', color: 'blue' },
  2: { name: 'Moderator', color: 'green' },
  3: { name: 'Admin', color: 'red' },
};

interface Props {
  roleId: number;
}

export const Role = ({ roleId }: Props) => {
  const role = ROLES[roleId];

  if (!role) {
    return null;
  }

  return <Badge color={role.color}>{role.name}</Badge>;
};
