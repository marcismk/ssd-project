import { getCookie } from "cookies-next/client";

const DEFAULT_HEADERS = {
	"Content-Type": "application/json",
};

const fetcher = async (url: string, options?: RequestInit) => {
	try {
		const token = getCookie("token");

		const path = `${process.env.NEXT_PUBLIC_APP_URL || ""}/api/${url}`;
		const res = await fetch(path, {
			headers: { ...DEFAULT_HEADERS, Authorization: `Bearer ${token}` },
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

const get = async <T>(url: string): Promise<T> =>
	fetcher(url, { method: "GET" });
const post = async <T>(
	url: string,
	body?: Record<string, unknown>,
): Promise<T> =>
	fetcher(url, {
		method: "POST",
		body: body ? JSON.stringify(body) : undefined,
	});

export const httpClient = {
	get,
	post,
};
