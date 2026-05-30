import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Feed } from "@/components/Feed";
import { verifyToken } from "@/lib/jwt";

export default async function HomePage() {
	const cookieStore = await cookies();
	const token = cookieStore.get("token")?.value;

	if (!token) {
		redirect("/login");
	}

	try {
		await verifyToken(token);
	} catch {
		redirect("/login");
	}

	return <Feed />;
}
