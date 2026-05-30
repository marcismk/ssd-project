"use client";

import {
	Box,
	Button,
	Checkbox,
	Grid,
	Group,
	Image,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginRequest } from "@/requests/login";

export const Login = () => {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const form = useForm({
		initialValues: {
			email: "",
			password: "",
			remember: false,
		},
		validate: {
			email: (v: string) => (/^\S+@\S+\.\S+$/.test(v) ? null : "Invalid email"),
			password: (v: string) => (v.length > 0 ? null : "Password is required"),
		},
	});

	const handleSubmit = async (values: typeof form.values) => {
		setLoading(true);
		setError(null);
		try {
			await loginRequest({
				email: values.email,
				password: values.password,
				remember: values.remember,
			});

			router.push("/");
			router.refresh();
		} catch {
			setError("Invalid email or password");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Box
			style={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Box
				style={{
					width: "100%",
					maxWidth: 900,
					borderRadius: 20,
					overflow: "hidden",
					boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
				}}
			>
				<Grid gap={0}>
					{/* ── Left: Form ── */}
					<Grid.Col span={{ base: 12, sm: 5 }}>
						<Box
							p={{ base: "xl", sm: 48 }}
							style={{
								minHeight: 520,
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
							}}
						>
							<Stack gap="xs" mb="xl">
								<Title order={2} c="dark.9" fw={700}>
									Login
								</Title>
								<Text c="dimmed" size="sm">
									Enter your credentials to get in
								</Text>
							</Stack>

							<form onSubmit={form.onSubmit(handleSubmit)}>
								<Stack gap="md">
									<TextInput
										label="Email"
										placeholder="user@example.com"
										styles={{ label: { color: "#333", fontWeight: 500 } }}
										{...form.getInputProps("email")}
									/>
									<PasswordInput
										label="Password"
										placeholder="••••••••"
										styles={{ label: { color: "#333", fontWeight: 500 } }}
										{...form.getInputProps("password")}
									/>
									<Checkbox
										label="Remember me"
										color="dark"
										{...form.getInputProps("remember", { type: "checkbox" })}
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
										Login
									</Button>

									<Group justify="center">
										<Text size="sm" c="dimmed">
											Not a member?{" "}
											<Text
												component="a"
												href="/signup"
												size="sm"
												fw={700}
												c="dark.9"
												style={{ textDecoration: "none" }}
											>
												Create an account
											</Text>
										</Text>
									</Group>
								</Stack>
							</form>
						</Box>
					</Grid.Col>

					{/* ── Right: Image panel ── */}
					<Grid.Col span={{ base: 12, sm: 7 }} visibleFrom="sm">
						<Box
							style={{ position: "relative", height: "100%", minHeight: 520 }}
						>
							<Image
								src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&auto=format&fit=crop"
								alt="scenic"
								style={{ width: "100%", height: "100%", objectFit: "cover" }}
								h="100%"
							/>
							{/* Dark gradient overlay */}
							<Box
								style={{
									position: "absolute",
									inset: 0,
									background:
										"linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%)",
								}}
							/>
							{/* Bottom text */}
							<Box
								style={{
									position: "absolute",
									bottom: 36,
									left: 32,
									right: 32,
								}}
							>
								<Text c="white" size="xl" lh={1.3}>
									Be a Part of Something{" "}
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
