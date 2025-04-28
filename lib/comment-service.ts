import { apiService } from './api-service';
import { Comment } from './types';

export const commentService = {
  // Get comments for a specific post
  async getCommentsByPost(postId: string): Promise<Comment[]> {
    return apiService.get<Comment[]>(`/comments/post/${postId}`);
  },

  // Create a new comment
  async createComment(data: {
    content: string;
    post_id: string;
    replied_to_comment_id?: string;
  }): Promise<Comment> {
    return apiService.post<Comment>('/comments', data);
  },

  // Update a comment (can only update your own comments)
  async updateComment(commentId: string, content: string): Promise<Comment> {
    return apiService.put<Comment>(`/comments/${commentId}`, { content });
  },

  // Delete a comment (can only delete your own comments)
  async deleteComment(commentId: string): Promise<void> {
    return apiService.delete<void>(`/comments/${commentId}`);
  },

  // Like a comment
  async likeComment(commentId: string): Promise<void> {
    return apiService.post<void>(`/comments/${commentId}/like`, {});
  },

  // Unlike a comment
  async unlikeComment(commentId: string): Promise<void> {
    return apiService.delete<void>(`/comments/${commentId}/like`);
  }
};