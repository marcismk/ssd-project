import {
	ColorSchemeScript,
	MantineProvider,
	mantineHtmlProps,
} from "@mantine/core";
import { cookies } from "next/dist/server/request/cookies";
import { CookiesProvider } from "next-client-cookies/server";
import type { PropsWithChildren } from "react";
import { AppLayout } from "@/components/AppLayout";
import { theme } from "../theme";
import "@mantine/core/styles.css";

export const metadata = {
	title: "SSD Project",
	description: "Playground for SSD course",
};

export default async function RootLayout({ children }: PropsWithChildren) {
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;

	return (
		<html lang="en" {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
				<link rel="shortcut icon" href="/favicon.svg" />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
				/>
			</head>
			<body>
				<CookiesProvider>
					<MantineProvider theme={theme} defaultColorScheme="dark">
						<AppLayout isAuthenticated={!!token}>{children}</AppLayout>
					</MantineProvider>
				</CookiesProvider>
			</body>
		</html>
	);
}
