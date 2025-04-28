import { mockPosts } from "@/lib/mock-data"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function RecentPosts() {
  // Get recent posts
  const recentPosts = mockPosts
    .filter((post) => post.is_published)
    .sort((a, b) => {
      const dateA = new Date(a.published_at || a.created_at)
      const dateB = new Date(b.published_at || b.created_at)
      return dateB.getTime() - dateA.getTime()
    })
    .slice(0, 5)

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Recent Posts</h2>
        <Button variant="outline" size="sm" asChild>
          <Link href="/search">View all</Link>
        </Button>
      </div>
      <div className="space-y-6">
        {recentPosts.map((post) => (
          <PostCard key={post.post_id} post={post} />
        ))}
      </div>
    </section>
  )
}
