import { apiService } from './api-service';
import { Post } from './types';

// API endpoints for posts
export const postService = {
  // Get all posts with filtering options
  async getPosts(options?: {
    skip?: number;
    limit?: number;
    published?: boolean;
    categoryId?: string;
    tagId?: string;
    authorId?: string;
  }): Promise<Post[]> {
    // Build query params
    const params = new URLSearchParams();
    if (options?.skip !== undefined) params.append('skip', options.skip.toString());
    if (options?.limit !== undefined) params.append('limit', options.limit.toString());
    if (options?.published !== undefined) params.append('published', options.published.toString());
    if (options?.categoryId) params.append('category_id', options.categoryId);
    if (options?.tagId) params.append('tag_id', options.tagId);
    if (options?.authorId) params.append('author_id', options.authorId);

    const queryString = params.toString() ? `?${params.toString()}` : '';
    return apiService.get<Post[]>(`/posts${queryString}`);
  },

  // Get a post by ID
  async getPostById(postId: string): Promise<Post> {
    return apiService.get<Post>(`/posts/${postId}`);
  },

  // Get a post by slug
  async getPostBySlug(slug: string): Promise<Post> {
    return apiService.get<Post>(`/posts/slug/${slug}`);
  },

  // Create a new post
  async createPost(postData: {
    title: string;
    content: string;
    summary?: string;
    cover_image?: string;
    is_published: boolean;
    category_ids?: string[];
    tag_ids?: string[];
  }): Promise<Post> {
    return apiService.post<Post>('/posts', postData);
  },

  // Update a post
  async updatePost(postId: string, postData: {
    title?: string;
    content?: string;
    summary?: string;
    cover_image?: string;
    is_published?: boolean;
    category_ids?: string[];
    tag_ids?: string[];
  }): Promise<Post> {
    return apiService.put<Post>(`/posts/${postId}`, postData);
  },

  // Delete a post
  async deletePost(postId: string): Promise<void> {
    return apiService.delete<void>(`/posts/${postId}`);
  },

  // Get posts by category
  async getPostsByCategory(categoryId: string, options?: { 
    skip?: number;
    limit?: number;
    published?: boolean;
  }): Promise<Post[]> {
    const params = new URLSearchParams();
    if (options?.skip !== undefined) params.append('skip', options.skip.toString());
    if (options?.limit !== undefined) params.append('limit', options.limit.toString());
    if (options?.published !== undefined) params.append('published', options.published.toString());

    const queryString = params.toString() ? `?${params.toString()}` : '';
    return apiService.get<Post[]>(`/posts/category/${categoryId}${queryString}`);
  },

  // Get posts by tag
  async getPostsByTag(tagId: string, options?: { 
    skip?: number;
    limit?: number;
    published?: boolean;
  }): Promise<Post[]> {
    const params = new URLSearchParams();
    if (options?.skip !== undefined) params.append('skip', options.skip.toString());
    if (options?.limit !== undefined) params.append('limit', options.limit.toString());
    if (options?.published !== undefined) params.append('published', options.published.toString());

    const queryString = params.toString() ? `?${params.toString()}` : '';
    return apiService.get<Post[]>(`/posts/tag/${tagId}${queryString}`);
  },

  // Get posts by user
  async getPostsByUser(userId: string, options?: { 
    skip?: number;
    limit?: number;
    published?: boolean;
  }): Promise<Post[]> {
    const params = new URLSearchParams();
    if (options?.skip !== undefined) params.append('skip', options.skip.toString());
    if (options?.limit !== undefined) params.append('limit', options.limit.toString());
    if (options?.published !== undefined) params.append('published', options.published.toString());

    const queryString = params.toString() ? `?${params.toString()}` : '';
    return apiService.get<Post[]>(`/posts/user/${userId}${queryString}`);
  },
};