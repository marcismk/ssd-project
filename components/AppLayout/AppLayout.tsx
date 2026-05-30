"use client";

import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import type { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { getUser } from "@/requests/getUser";
import useSWR from "swr";

interface AppLayoutProps extends PropsWithChildren {
	isAuthenticated?: boolean;
}

export const AppLayout = ({ children, isAuthenticated }: AppLayoutProps) => {
	const [opened, { toggle }] = useDisclosure();
	const {data} = useSWR(isAuthenticated ? "profile" : null, getUser);

	if (!isAuthenticated) {
		return <>{children}</>;
	}

	return (
		<AppShell
			navbar={{
				width: 300,
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
			aside={{
				width: 300,
				breakpoint: "md",
				collapsed: { mobile: true },
			}}
			bg="dark.8"
		>
			<Navbar user={data} />
			<Sidebar />
			<AppShell.Main bg="dark.8" style={{position: "relative"}}>
				<Burger
					opened={opened}
					onClick={toggle}
					hiddenFrom="sm"
					size="sm"
					mb="md"
					color="white"
				/>
				{children}
			</AppShell.Main>
		</AppShell>
	);
};
