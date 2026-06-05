import { httpClient } from '@/lib/client';

export const deletePost = async (postId: number) => {
  try {
    return await httpClient.delete(`posts/${postId}/delete`);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};
