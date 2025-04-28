"use client"

import { useState, useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { formatDate } from "@/lib/utils"
import { commentService } from "@/lib/comment-service"
import type { Comment, User } from "@/lib/types"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

interface CommentSectionProps {
  postId: string
}

export function CommentSection({ postId }: CommentSectionProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null)
  const commentInputRef = useRef<HTMLTextAreaElement>(null)

  // Group comments by their parent
  const groupCommentsByParent = (comments: Comment[]) => {
    const rootComments: Comment[] = []
    const replyComments: { [key: string]: Comment[] } = {}

    // First, separate root comments and replies
    comments.forEach(comment => {
      if (!comment.replied_to_comment_id) {
        rootComments.push(comment)
      } else {
        if (!replyComments[comment.replied_to_comment_id]) {
          replyComments[comment.replied_to_comment_id] = []
        }
        replyComments[comment.replied_to_comment_id].push(comment)
      }
    })

    // Sort root comments by creation date (newest first)
    rootComments.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )

    // Sort replies for each parent (newest first)
    Object.keys(replyComments).forEach(parentId => {
      replyComments[parentId].sort((a, b) => 
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
    })

    return { rootComments, replyComments }
  }

  useEffect(() => {
    async function fetchComments() {
      setIsLoading(true)
      try {
        const fetchedComments = await commentService.getCommentsByPost(postId)
        setComments(fetchedComments)
      } catch (error) {
        console.error("Error fetching comments:", error)
        toast({
          title: "Error",
          description: "Failed to load comments. Please try again later.",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchComments()
  }, [postId, toast])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to comment.",
        variant: "destructive"
      })
      return
    }

    if (!newComment.trim()) return

    setIsSubmitting(true)

    try {
      const commentData = {
        content: newComment,
        post_id: postId,
        replied_to_comment_id: replyingTo ? replyingTo.comment_id : undefined
      }
      
      const createdComment = await commentService.createComment(commentData)
      
      // Add new comment to the list
      setComments([createdComment, ...comments])
      setNewComment("")
      setReplyingTo(null)
      
      toast({
        title: "Comment posted",
        description: "Your comment has been posted successfully."
      })
    } catch (error) {
      console.error("Error posting comment:", error)
      toast({
        title: "Error",
        description: "Failed to post your comment. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReply = (comment: Comment) => {
    setReplyingTo(comment)
    setNewComment(`@${comment.user?.username || 'user'} `)
    // Focus on the comment input
    if (commentInputRef.current) {
      commentInputRef.current.focus()
    }
    // Scroll to the comment form
    window.scrollTo({
      top: commentInputRef.current?.getBoundingClientRect().top! + window.scrollY - 200,
      behavior: 'smooth'
    })
  }

  const cancelReply = () => {
    setReplyingTo(null)
    setNewComment("")
  }

  // Group the comments for display
  const { rootComments, replyComments } = groupCommentsByParent(comments)

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-6">Comments ({comments.length})</h3>

      {user ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          {replyingTo && (
            <div className="bg-muted p-3 rounded-lg mb-2 flex justify-between items-center">
              <p className="text-sm">
                Replying to{" "}
                <span className="font-medium">
                  @{replyingTo.user?.username || "user"}
                </span>
              </p>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={cancelReply}
              >
                Cancel
              </Button>
            </div>
          )}
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage 
                src={user.profile_picture || "/placeholder-user.jpg"} 
                alt={user.full_name || user.username} 
              />
              <AvatarFallback>
                {user.full_name 
                  ? user.full_name.substring(0, 2).toUpperCase() 
                  : user.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                ref={commentInputRef}
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-2"
              />
              <Button type="submit" disabled={isSubmitting || !newComment.trim()}>
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-muted p-4 rounded-lg mb-8 text-center">
          <p className="mb-2">Sign in to leave a comment</p>
          <Link href="/auth/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="h-10 w-10 rounded-full bg-gray-200"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {rootComments.length > 0 ? (
            rootComments.map((comment) => (
              <div key={comment.comment_id} className="space-y-4">
                {/* Root comment */}
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    {comment.user && (
                      <>
                        <AvatarImage 
                          src={comment.user.profile_picture || "/placeholder-user.jpg"} 
                          alt={comment.user.full_name || comment.user.username} 
                        />
                        <AvatarFallback>
                          {comment.user.full_name 
                            ? comment.user.full_name.substring(0, 2).toUpperCase() 
                            : comment.user.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">
                        {comment.user?.full_name || comment.user?.username || "Unknown User"}
                      </span>
                      <span className="text-sm text-muted-foreground">{formatDate(comment.created_at)}</span>
                    </div>
                    <p className="mb-2">{comment.content}</p>
                    <div className="flex gap-4 mt-2">
                      <button 
                        className="text-sm font-medium text-muted-foreground hover:text-foreground"
                        onClick={() => handleReply(comment)}
                      >
                        Reply
                      </button>
                    </div>
                    
                    {/* Replies container */}
                    {replyComments[comment.comment_id] && replyComments[comment.comment_id].length > 0 && (
                      <div className="pl-8 mt-4 border-l-2 border-muted space-y-4">
                        {replyComments[comment.comment_id].map((reply) => (
                          <div key={reply.comment_id} className="flex gap-4">
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              {reply.user && (
                                <>
                                  <AvatarImage 
                                    src={reply.user.profile_picture || "/placeholder-user.jpg"} 
                                    alt={reply.user.full_name || reply.user.username} 
                                  />
                                  <AvatarFallback>
                                    {reply.user.full_name 
                                      ? reply.user.full_name.substring(0, 2).toUpperCase() 
                                      : reply.user.username.substring(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </>
                              )}
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">
                                  {reply.user?.full_name || reply.user?.username || "Unknown User"}
                                </span>
                                <span className="text-sm text-muted-foreground">{formatDate(reply.created_at)}</span>
                              </div>
                              <p className="mb-2">{reply.content}</p>
                              <div className="flex gap-4 mt-2">
                                <button 
                                  className="text-sm font-medium text-muted-foreground hover:text-foreground"
                                  onClick={() => handleReply(reply)}
                                >
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-muted rounded-lg">
              <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
