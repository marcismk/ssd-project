import { Avatar, Group, Stack, Text } from '@mantine/core';


interface CommentProps {
    content: string;
    authorName: string;
    authorSurname: string;
    createdAt: string;
}

export const Comment = ({ content, authorName, authorSurname, createdAt }: CommentProps) => (
    <Stack w="100%" gap="xs">
        <Group w="100%">
            <Avatar
                alt={`${authorName} ${authorSurname}`}
                radius="xl"
            >{`${authorName[0]}${authorSurname[0]}`}</Avatar>
            <div>
                <Text size="sm">{`${authorName} ${authorSurname}`}</Text>
                <Text size="xs" c="dimmed">
                    {new Date(createdAt).toLocaleString("en-GB", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </Text>
            </div>
        </Group>
        <Text w="100%" pl={54} pt="sm" size="sm">
            {content}
        </Text>
    </Stack>
);
