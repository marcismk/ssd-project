'use client';

import { Box, Table } from '@mantine/core';
import useSWR from 'swr';
import { getUsers } from '@/requests/getUsers';
import { Role } from './Role';

export const AdminDashboard = () => {
  const { data: users } = useSWR('/api/admin', getUsers);

  const rows =
    users?.map((user) => (
      <Table.Tr key={user.id}>
        <Table.Td>{user.id}</Table.Td>
        <Table.Td>{user.name}</Table.Td>
        <Table.Td>{user.surname}</Table.Td>
        <Table.Td>{user.email}</Table.Td>
        <Table.Td>
          <Role roleId={user.roles_id} />
        </Table.Td>
      </Table.Tr>
    )) ?? [];

  return (
    <Box p="xl">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Surname</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Role</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Box>
  );
};
