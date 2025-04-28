import { apiService } from './api-service';
import { Tag } from './types';

// API endpoints for tags
export const tagService = {
  // Get all tags
  async getTags(options?: {
    skip?: number;
    limit?: number;
  }): Promise<Tag[]> {
    // Build query params
    const params = new URLSearchParams();
    if (options?.skip !== undefined) params.append('skip', options.skip.toString());
    if (options?.limit !== undefined) params.append('limit', options.limit.toString());

    const queryString = params.toString() ? `?${params.toString()}` : '';
    return apiService.get<Tag[]>(`/tags${queryString}`);
  },

  // Get a tag by ID
  async getTagById(tagId: string): Promise<Tag> {
    return apiService.get<Tag>(`/tags/${tagId}`);
  },

  // Get a tag by slug
  async getTagBySlug(slug: string): Promise<Tag> {
    return apiService.get<Tag>(`/tags/slug/${slug}`);
  },

  // Create a new tag
  async createTag(tagData: {
    name: string;
    slug: string;
  }): Promise<Tag> {
    return apiService.post<Tag>('/tags', tagData);
  },

  // Update a tag
  async updateTag(tagId: string, tagData: {
    name?: string;
    slug?: string;
  }): Promise<Tag> {
    return apiService.put<Tag>(`/tags/${tagId}`, tagData);
  },

  // Delete a tag
  async deleteTag(tagId: string): Promise<void> {
    return apiService.delete<void>(`/tags/${tagId}`);
  },

  // Add a post to a tag (superuser only)
  async addPostToTag(tagId: string, postId: string): Promise<any> {
    return apiService.post<any>(`/tags/${tagId}/posts/${postId}`, {});
  },

  // Remove a post from a tag (superuser only)
  async removePostFromTag(tagId: string, postId: string): Promise<any> {
    return apiService.delete<any>(`/tags/${tagId}/posts/${postId}`);
  }
};