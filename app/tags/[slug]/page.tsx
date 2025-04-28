import { mockTags, mockPosts } from "@/lib/mock-data"
import { PostCard } from "@/components/post-card"
import { notFound } from "next/navigation"
import Link from "next/link"

export default function TagPage({ params }: { params: { slug: string } }) {
  const tag = mockTags.find((t) => t.slug === params.slug)

  if (!tag) {
    notFound()
  }

  // Get posts for this tag
  const tagPosts = mockPosts.filter((post) => post.tags?.some((t) => t.tag_id === tag.tag_id))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            ← Back to home
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">#{tag.name}</h1>
          <p className="text-gray-600">{tagPosts.length} posts</p>
        </div>

        {tagPosts.length > 0 ? (
          <div className="space-y-6">
            {tagPosts.map((post) => (
              <PostCard key={post.post_id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium mb-2">No posts with this tag</h3>
            <p className="text-gray-500">There are currently no posts with the #{tag.name} tag.</p>
          </div>
        )}
      </div>
    </div>
  )
}
