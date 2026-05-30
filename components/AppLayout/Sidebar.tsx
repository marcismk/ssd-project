import {
	ActionIcon,
	AppShell,
	Avatar,
	Badge,
	Divider,
	Group,
	ScrollArea,
	Stack,
	Tabs,
	Text,
	TextInput,
} from "@mantine/core";
import {
	IconMessage,
	IconSearch,
	IconSend,
	IconUserPlus,
} from "@tabler/icons-react";

const messages = [
	{ name: "Julie Mendez", sub: "Memphis, TN, US" },
	{ name: "Johnathan Hartley", sub: "Newark, NJ, US" },
	{ name: "Maximus Mckay", sub: "Fort Worth, TX, US" },
	{ name: "Jasmin Alvarez", sub: "Springfield, MA, US" },
];

const suggestions = [
	{ name: "Alex Bishop", sub: "Sweat, smile, repeat! 🔥..." },
	{ name: "Bella Bean", sub: "Savoring every flavor life..." },
	{ name: "Tyra Dhillon", sub: "Style is a way to express w..." },
	{ name: "Adam Hayes", sub: "Finding peace in the bea..." },
];

const footerLinks = [
	"About",
	"Accessibility",
	"Help Center",
	"Privacy and Terms",
	"Advertising",
	"Business Services",
];

export const Sidebar = () => {
	return (
		<AppShell.Aside
			bg="dark.8"
			p="md"
			withBorder={false}
			style={{ borderLeft: "1px solid var(--mantine-color-dark-6)" }}
		>
			<AppShell.Section>
				<Group justify="space-between" mb="md">
					<Text fw={700} size="lg" c="white">
						Messages
					</Text>
					<ActionIcon variant="subtle" color="gray">
						<IconSend size={18} />
					</ActionIcon>
				</Group>

				<TextInput
					placeholder="Search..."
					leftSection={<IconSearch size={16} />}
					mb="md"
					styles={{
						input: {
							backgroundColor: "var(--mantine-color-dark-6)",
							borderColor: "transparent",
							color: "white",
						},
					}}
				/>

				<Tabs defaultValue="primary">
					<Tabs.List mb="sm">
						<Tabs.Tab value="primary">
							<Text size="xs" c="white">
								Primary
							</Text>
						</Tabs.Tab>
						<Tabs.Tab value="general">
							<Text size="xs" c="dimmed">
								General
							</Text>
						</Tabs.Tab>
						<Tabs.Tab
							value="requests"
							rightSection={
								<Badge size="xs" color="orange">
									3
								</Badge>
							}
						>
							<Text size="xs" c="dimmed">
								Requests
							</Text>
						</Tabs.Tab>
					</Tabs.List>
				</Tabs>
			</AppShell.Section>

			<AppShell.Section grow component={ScrollArea}>
				{/* DM list */}
				<Stack gap="sm" mb="lg">
					{messages.map((msg) => (
						<Group key={msg.name} gap="sm" wrap="nowrap">
							<Avatar size="md" radius="xl" />
							<Stack gap={0} style={{ flex: 1, minWidth: 0 }}>
								<Text size="sm" fw={500} c="white" truncate>
									{msg.name}
								</Text>
								<Text size="xs" c="dimmed" truncate>
									{msg.sub}
								</Text>
							</Stack>
							<ActionIcon variant="subtle" color="gray" size="sm">
								<IconMessage size={16} />
							</ActionIcon>
						</Group>
					))}
				</Stack>

				{/* Suggestions */}
				<Group justify="space-between" mb="sm">
					<Text fw={600} size="sm" c="white">
						Suggestions
					</Text>
					<Text size="xs" c="dimmed" style={{ cursor: "pointer" }}>
						View All
					</Text>
				</Group>
				<Stack gap="sm">
					{suggestions.map((s) => (
						<Group key={s.name} gap="sm" wrap="nowrap">
							<Avatar size="sm" radius="xl" />
							<Stack gap={0} style={{ flex: 1, minWidth: 0 }}>
								<Text size="xs" fw={500} c="white" truncate>
									{s.name}
								</Text>
								<Text size="xs" c="dimmed" truncate>
									{s.sub}
								</Text>
							</Stack>
							<ActionIcon variant="subtle" color="gray" size="xs">
								<IconUserPlus size={14} />
							</ActionIcon>
						</Group>
					))}
				</Stack>
			</AppShell.Section>

			{/* Footer links */}
			<AppShell.Section>
				<Divider color="dark.6" my="sm" />
				<Group gap={6} wrap="wrap">
					{footerLinks.map((link) => (
						<Text key={link} size="xs" c="dimmed" style={{ cursor: "pointer" }}>
							{link}
						</Text>
					))}
				</Group>
			</AppShell.Section>
		</AppShell.Aside>
	);
};
