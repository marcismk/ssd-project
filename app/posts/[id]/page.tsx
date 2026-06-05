import { PostFeed } from '@/components/Feed/Post/PostFeed';
import { apiClient } from '@/lib/api';
import { checkIfAuthenticated } from '@/lib/auth';

export default async function PostPage({ params }: PageProps<'/posts/[id]'>) {
  await checkIfAuthenticated();
  const { id } = await params;
  const { post } = await apiClient.get(`/posts/${id}`);

  return <PostFeed post={post} />;
}
