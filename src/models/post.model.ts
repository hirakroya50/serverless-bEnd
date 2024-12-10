export interface CreatePostRequest {
  postname: string;
}

export interface CreatePostResponse {
  status: number;
  post?: {
    id: string;
    name: string;
    createdAt: string;
  };
  error?: string;
}
