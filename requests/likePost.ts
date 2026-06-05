import { httpClient } from '@/lib/client';

export const likePost = async (postId: number) => {
  try {
    return await httpClient.post(`posts/${postId}/like`);
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
};
