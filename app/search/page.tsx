import { SearchBar } from "@/components/search-bar"
import { PostCard } from "@/components/post-card"
import { mockPosts } from "@/lib/mock-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string; filter?: string }
}) {
  const query = searchParams.q || ""
  const filter = searchParams.filter || "all"

  // Filter posts based on search query
  const filteredPosts = query
    ? mockPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase()) ||
          post.summary?.toLowerCase().includes(query.toLowerCase()),
      )
    : mockPosts

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Search Results</h1>

        <div className="mb-8">
          <SearchBar defaultValue={query} />
        </div>

        <Tabs defaultValue={filter} className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Results ({filteredPosts.length})</TabsTrigger>
            <TabsTrigger value="posts">Posts ({filteredPosts.length})</TabsTrigger>
            <TabsTrigger value="authors">Authors (0)</TabsTrigger>
            <TabsTrigger value="tags">Tags (0)</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            {filteredPosts.length > 0 ? (
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <PostCard key={post.post_id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No results found</h3>
                <p className="text-gray-500">We couldn't find any posts matching "{query}". Try different keywords.</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="posts" className="mt-6">
            {filteredPosts.length > 0 ? (
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <PostCard key={post.post_id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No posts found</h3>
                <p className="text-gray-500">We couldn't find any posts matching "{query}". Try different keywords.</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="authors" className="mt-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No authors found</h3>
              <p className="text-gray-500">We couldn't find any authors matching "{query}". Try different keywords.</p>
            </div>
          </TabsContent>
          <TabsContent value="tags" className="mt-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No tags found</h3>
              <p className="text-gray-500">We couldn't find any tags matching "{query}". Try different keywords.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
