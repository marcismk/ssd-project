import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/jwt";
import { PostFeed } from "@/components/Feed/Post/PostFeed";
import { apiClient } from "@/lib/api";

export default async function PostPage({ params }: PageProps<"/posts/[id]">) {
    const { id } = await params
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

    const { post } = await apiClient.get(`/posts/${id}`);

    return <PostFeed post={post} />;
}
