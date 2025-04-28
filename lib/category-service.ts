import { apiService } from './api-service';
import { Category } from './types';

// API endpoints for categories
export const categoryService = {
  // Get all categories
  async getCategories(options?: {
    skip?: number;
    limit?: number;
    withPostCount?: boolean;
  }): Promise<Category[]> {
    // Build query params
    const params = new URLSearchParams();
    if (options?.skip !== undefined) params.append('skip', options.skip.toString());
    if (options?.limit !== undefined) params.append('limit', options.limit.toString());
    if (options?.withPostCount !== undefined) params.append('with_post_count', options.withPostCount.toString());

    const queryString = params.toString() ? `?${params.toString()}` : '';
    return apiService.get<Category[]>(`/categories${queryString}`);
  },

  // Get a category by ID
  async getCategoryById(categoryId: string): Promise<Category> {
    return apiService.get<Category>(`/categories/${categoryId}`);
  },

  // Get a category by slug
  async getCategoryBySlug(slug: string): Promise<Category> {
    return apiService.get<Category>(`/categories/slug/${slug}`);
  },

  // Create a new category (superuser only)
  async createCategory(categoryData: {
    name: string;
    description?: string;
    slug: string;
  }): Promise<Category> {
    return apiService.post<Category>('/categories', categoryData);
  },

  // Update a category (superuser only)
  async updateCategory(categoryId: string, categoryData: {
    name?: string;
    description?: string;
    slug?: string;
  }): Promise<Category> {
    return apiService.put<Category>(`/categories/${categoryId}`, categoryData);
  },

  // Delete a category (superuser only)
  async deleteCategory(categoryId: string): Promise<void> {
    return apiService.delete<void>(`/categories/${categoryId}`);
  },

  // Add a post to a category (superuser only)
  async addPostToCategory(categoryId: string, postId: string): Promise<any> {
    return apiService.post<any>(`/categories/${categoryId}/posts/${postId}`, {});
  },

  // Remove a post from a category (superuser only)
  async removePostFromCategory(categoryId: string, postId: string): Promise<any> {
    return apiService.delete<any>(`/categories/${categoryId}/posts/${postId}`);
  }
};