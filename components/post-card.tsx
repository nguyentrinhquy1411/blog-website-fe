import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import type { Post } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { mockUsers } from "@/lib/mock-data"
import Image from "next/image"
import Link from "next/link"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const author = mockUsers.find((user) => user.user_id === post.author_id)

  return (
    <Card className="overflow-hidden">
      <div className="md:flex">
        {post.cover_image && (
          <div className="relative h-48 md:h-auto md:w-1/3 md:flex-none">
            <Image src={post.cover_image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>
        )}
        <CardContent className={`p-4 md:p-6 ${post.cover_image ? "md:w-2/3" : "w-full"}`}>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {post.categories && post.categories[0] && (
                <Link
                  href={`/categories/${post.categories[0].slug}`}
                  className="text-xs bg-muted px-2 py-1 rounded-full hover:bg-muted/80 transition-colors"
                >
                  {post.categories[0].name}
                </Link>
              )}
              <span className="text-xs text-muted-foreground">{formatDate(post.published_at || post.created_at)}</span>
            </div>
            <Link href={`/posts/${post.slug}`}>
              <h3 className="text-xl font-bold hover:text-primary">{post.title}</h3>
            </Link>
            <p className="text-muted-foreground line-clamp-2">{post.summary}</p>
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={author?.profile_picture || "/placeholder.svg"} alt={author?.full_name} />
                  <AvatarFallback>{author?.full_name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <Link href={`/profile/${author?.username}`} className="font-medium hover:text-primary">
                    {author?.full_name}
                  </Link>
                </div>
              </div>
              <div className="flex items-center text-muted-foreground text-sm">
                <span className="flex items-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  {post.views || Math.floor(Math.random() * 1000)}
                </span>
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
                  </svg>
                  {post.comments?.length || Math.floor(Math.random() * 20)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
