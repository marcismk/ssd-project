import {
	ActionIcon,
	Avatar,
	Badge,
	Box,
	Group,
	Image,
	Stack,
	Text,
} from "@mantine/core";
import {
	IconBookmark,
	IconHeart,
	IconMessageCircle,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface PostUser {
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
}

export const Post = ({
	id,
	title,
	image,
	meta,
	created_at,
	user,
	likes,
	comments,
}: PostProps) => {
	const router = useRouter()
	const displayName =
		[user.name, user.surname].filter(Boolean).join(" ") || "Unknown User";
	const initials = [user.name?.[0], user.surname?.[0]]
		.filter(Boolean)
		.join("")
		.toUpperCase();

	const formattedDate = new Date(created_at).toLocaleString("en-GB", {
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit",
	});

	const tags = meta ? (meta.match(/#[\w]+/g) ?? []) : [];

	const bodyText = meta ? meta.replace(/#[\w]+/g, "").trim() : "";

	const handleNavigateToPost = () => {
		router.push(`/posts/${id}`);
	}

	return (
		<Box p="md" onClick={handleNavigateToPost} maw={800} mx="auto" style={{ cursor: "pointer" }}>
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
					style={{ width: "100%", objectFit: "cover" }}
				/>
			)}

			{bodyText && (
				<Text size="sm" mb="xs">
					{bodyText}
				</Text>
			)}

			{tags.length > 0 && (
				<Group gap={6} mb="sm">
					{tags.map((tag) => (
						<Badge
							key={tag}
							variant="transparent"
							color="blue"
							p={0}
							style={{ cursor: "pointer" }}
						>
							{tag}
						</Badge>
					))}
				</Group>
			)}

			<Group justify="space-between" mt="xs">
				<Group gap="md">
					<ActionIcon variant="subtle" color="red" aria-label="Like">
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
								{comments >= 1000
									? `${(comments / 1000).toFixed(1)}k`
									: comments}
							</Text>
						)}
					</ActionIcon>
				</Group>
				<ActionIcon variant="subtle" color="yellow" aria-label="Bookmark">
					<IconBookmark size={18} />
				</ActionIcon>
			</Group>
		</Box>
	);
};
