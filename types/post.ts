export interface Post {
  id: number;
  title: string;
  image: string | null;
  meta: string | null;
  users_id: number;
  author_id: number;
  author_name: string | null;
  author_surname: string | null;
  likes: number;
  comments: number;
  created_at: string;
  created_by: number;
}

export interface Comment {
  id: number;
  content: string;
  posts_id: number;
  users_id: number;
  created_at: string;
  created_by: number;
}
