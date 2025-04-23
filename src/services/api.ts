import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export interface Post {
  body: string;
  userId: number;
  id: number;
  title: string;
  content: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const api = {
  getPosts: async (
    page: number,
    limit: number
  ): Promise<{ posts: Post[]; total: number }> => {
    const response = await axios.get(`${API_URL}/posts`);
    const allPosts = response.data;

    // Simulate pagination
    const startIndex = (page - 1) * limit;
    const paginatedPosts = allPosts.slice(startIndex, startIndex + limit);

    return {
      posts: paginatedPosts,
      total: allPosts.length,
    };
  },

  getPostById: async (id: number): Promise<Post> => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) {
      // Try fallback
      const localPosts = JSON.parse(localStorage.getItem('newPosts') || '[]');
      return localPosts.find((p: Post) => p.id === id) || null;
    }

    return res.json();
  },

  getCommentsByPostId: async (postId: number): Promise<Comment[]> => {
    const response = await axios.get(`${API_URL}/posts/${postId}/comments`);
    return response.data;
  },
};
