export interface Comment {
  commentId: number;
  user: {
    id: number;
    name: string;
    username: string;
    avatarUrl: string;
  };
  beach: {
    id: string;
    name: string;
    island: string;
    coverUrl: string;
  },
  comment: {
    text: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
  };
}
