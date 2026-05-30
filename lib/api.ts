import { cookies } from "next/headers";

const DEFAULT_HEADERS = {
	"Content-Type": "application/json",
};

const fetcher = async (url: string, options?: RequestInit) => {
	try {
		const cookieStore = await cookies();
		const token = await cookieStore.get("token");
		const authHeaders = token ? { Authorization: `Bearer ${token.value}` } : {};
		const path = `${process.env.NEXT_PUBLIC_APP_URL || ""}/api/${url}`;
		const res = await fetch(path, {
			...DEFAULT_HEADERS,
			...authHeaders,
			...options,
		});

		if (!res.ok) {
			throw new Error(`Error fetching ${url}: ${res.statusText}`);
		}

		return res.json();
	} catch (error) {
		console.error(`Error fetching ${url}:`, error);
		throw error;
	}
};

const get = (url: string) => fetcher(url, { method: "GET" });
const post = (url: string, body: Record<string, unknown>) =>
	fetcher(url, {
		method: "POST",
		body: JSON.stringify(body),
	});

export const apiClient = {
	get,
	post,
};
