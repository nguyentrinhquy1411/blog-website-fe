import type { User, Category, Tag, Post, Comment } from "./types"

// Mock Users
export const mockUsers: User[] = [
  {
    user_id: "1",
    username: "johndoe",
    email: "john@example.com",
    password_hash: "hashed_password",
    full_name: "John Doe",
    bio: "Tech enthusiast and software developer with a passion for writing about emerging technologies.",
    profile_picture: "/placeholder.svg?height=200&width=200",
    is_active: true,
    is_superuser: false,
    created_at: "2023-01-15T08:30:00Z",
    updated_at: "2023-01-15T08:30:00Z",
  },
  {
    user_id: "2",
    username: "janedoe",
    email: "jane@example.com",
    password_hash: "hashed_password",
    full_name: "Jane Doe",
    bio: "Science writer and researcher focusing on climate change and sustainability.",
    profile_picture: "/placeholder.svg?height=200&width=200",
    is_active: true,
    is_superuser: false,
    created_at: "2023-02-10T14:20:00Z",
    updated_at: "2023-02-10T14:20:00Z",
  },
  {
    user_id: "3",
    username: "alexsmith",
    email: "alex@example.com",
    password_hash: "hashed_password",
    full_name: "Alex Smith",
    bio: "UX designer and design systems advocate. Writing about design principles and user experience.",
    profile_picture: "/placeholder.svg?height=200&width=200",
    is_active: true,
    is_superuser: true,
    created_at: "2023-03-05T11:45:00Z",
    updated_at: "2023-03-05T11:45:00Z",
  },
]

// Mock Categories
export const mockCategories: Category[] = [
  {
    category_id: "1",
    name: "Technology",
    description: "Articles about the latest in technology, programming, and digital innovation.",
    slug: "technology",
    post_count: 12,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
  {
    category_id: "2",
    name: "Science",
    description: "Exploring scientific discoveries, research, and advancements.",
    slug: "science",
    post_count: 8,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
  {
    category_id: "3",
    name: "Design",
    description: "Articles about UI/UX design, graphic design, and creative processes.",
    slug: "design",
    post_count: 6,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
  {
    category_id: "4",
    name: "Business",
    description: "Insights on entrepreneurship, management, and business strategies.",
    slug: "business",
    post_count: 5,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
  {
    category_id: "5",
    name: "Culture",
    description: "Exploring cultural trends, arts, and societal developments.",
    slug: "culture",
    post_count: 4,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
]

// Mock Tags
export const mockTags: Tag[] = [
  {
    tag_id: "1",
    name: "JavaScript",
    slug: "javascript",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
  {
    tag_id: "2",
    name: "React",
    slug: "react",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
  {
    tag_id: "3",
    name: "AI",
    slug: "ai",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
  {
    tag_id: "4",
    name: "Climate",
    slug: "climate",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
  {
    tag_id: "5",
    name: "UX",
    slug: "ux",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
  {
    tag_id: "6",
    name: "Productivity",
    slug: "productivity",
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
  },
]

// Mock Posts
export const mockPosts: Post[] = [
  {
    post_id: "1",
    title: "The Future of JavaScript: What's Coming in 2024",
    slug: "future-of-javascript-2024",
    content: `JavaScript continues to evolve at a rapid pace, with new features and improvements being added regularly. In this article, we'll explore what's on the horizon for JavaScript in 2024.

The TC39 committee, responsible for evolving the ECMAScript programming language, has been working on several exciting proposals that could make it into the language specification soon.

## Top Features to Look Forward To

### Pattern Matching

Pattern matching is a powerful feature that allows for more expressive code when working with complex data structures. It's similar to switch statements but much more powerful.

\`\`\`javascript
const result = match(response) {
  when { status: 200, data: { users: [first, ...rest] } } -> first,
  when { status: 404 } -> "Not found",
  when { status: 500 } -> throw new ServerError(),
  default -> "Unknown response"
};
\`\`\`

### Decorators

Decorators provide a way to annotate and modify classes and properties at design time. While they've been available in TypeScript for a while, they're finally making their way into the JavaScript specification.

\`\`\`javascript
class Example {
  @logged
  method() {
    // This method will be logged when called
  }
}
\`\`\`

### Pipeline Operator

The pipeline operator (\`|\`) allows for more readable function composition, similar to the pipe operator in languages like F# or Elixir.

\`\`\`javascript
const result = data
  |> filter(criteria)
  |> map(transform)
  |> reduce(accumulator);
\`\`\`

## Browser Compatibility

As these features are still in the proposal stage, browser compatibility will vary. However, you can already use many of these features through transpilers like Babel.

## Conclusion

JavaScript continues to improve and adapt to the needs of modern web development. By staying informed about upcoming features, you can prepare your codebase for the future and take advantage of new capabilities as they become available.`,
    summary:
      "Explore the upcoming features and improvements coming to JavaScript in 2024, including pattern matching, decorators, and the pipeline operator.",
    cover_image: "/placeholder.svg?height=400&width=800",
    is_published: true,
    published_at: "2023-06-15T09:30:00Z",
    author_id: "1",
    categories: [
      {
        category_id: "1",
        name: "Technology",
        slug: "technology",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z",
      },
    ],
    tags: [
      {
        tag_id: "1",
        name: "JavaScript",
        slug: "javascript",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z",
      },
      {
        tag_id: "2",
        name: "React",
        slug: "react",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z",
      },
    ],
    views: 1245,
    likes: 89,
    reading_time: "8 min read",
    created_at: "2023-06-10T14:20:00Z",
    updated_at: "2023-06-15T09:30:00Z",
  },
  {
    post_id: "2",
    title: "Climate Change: The Latest Research and What It Means",
    slug: "climate-change-latest-research",
    content: `Climate change continues to be one of the most pressing issues of our time. In this article, we'll look at the latest research and what it means for our future.

## Recent Findings

The Intergovernmental Panel on Climate Change (IPCC) released its latest report earlier this year, and the findings are concerning. Global temperatures continue to rise, with the last decade being the warmest on record.

### Rising Sea Levels

One of the most visible effects of climate change is rising sea levels. The latest data shows that sea levels are rising at a rate of about 3.7 mm per year, which is faster than previously predicted.

### Extreme Weather Events

Another consequence of climate change is the increase in extreme weather events. Hurricanes, wildfires, and droughts are becoming more frequent and more severe.

## What Can We Do?

While the situation is serious, there are steps we can take to mitigate the effects of climate change.

### Individual Actions

- Reduce your carbon footprint by using public transportation, biking, or walking when possible
- Eat less meat, especially beef, which has a high carbon footprint
- Reduce, reuse, and recycle to minimize waste

### Policy Changes

At a larger scale, we need policy changes to address climate change effectively:

- Transition to renewable energy sources
- Implement carbon pricing to incentivize emissions reductions
- Protect and restore forests and other natural carbon sinks

## Conclusion

The latest research on climate change is alarming, but it also provides a roadmap for action. By understanding the science and taking appropriate steps, we can work towards a more sustainable future.`,
    summary:
      "A comprehensive look at the latest climate change research and its implications for our planet's future, along with actionable steps we can take.",
    cover_image: "/placeholder.svg?height=400&width=800",
    is_published: true,
    published_at: "2023-07-20T11:15:00Z",
    author_id: "2",
    categories: [
      {
        category_id: "2",
        name: "Science",
        slug: "science",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z",
      },
    ],
    tags: [
      {
        tag_id: "4",
        name: "Climate",
        slug: "climate",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z",
      },
    ],
    views: 982,
    likes: 76,
    reading_time: "10 min read",
    created_at: "2023-07-15T16:45:00Z",
    updated_at: "2023-07-20T11:15:00Z",
  },
  {
    post_id: "3",
    title: "Designing for Accessibility: A Comprehensive Guide",
    slug: "designing-for-accessibility",
    content: `Accessibility in design is not just a nice-to-have feature; it's a necessity. In this guide, we'll explore how to create designs that are accessible to everyone, including people with disabilities.

## Why Accessibility Matters

Designing for accessibility ensures that your products and services can be used by as many people as possible, regardless of their abilities or disabilities. It's not only the right thing to do ethically, but it also makes good business sense.

### Legal Requirements

In many countries, there are legal requirements for accessibility. For example, in the United States, the Americans with Disabilities Act (ADA) requires that public accommodations, which can include websites, be accessible to people with disabilities.

### Broader Audience

By designing for accessibility, you're also designing for a broader audience. Features that help people with disabilities often help everyone. For example, captions on videos help people who are deaf or hard of hearing, but they also help people who are in noisy environments or who speak a different language.

## Principles of Accessible Design

### Perceivable

Information and user interface components must be presentable to users in ways they can perceive. This means providing text alternatives for non-text content, creating content that can be presented in different ways, and making it easier for users to see and hear content.

### Operable

User interface components and navigation must be operable. This means making all functionality available from a keyboard, giving users enough time to read and use content, and not designing content in a way that is known to cause seizures.

### Understandable

Information and the operation of the user interface must be understandable. This means making text readable and understandable, making web pages appear and operate in predictable ways, and helping users avoid and correct mistakes.

### Robust

Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies. This means maximizing compatibility with current and future user tools.

## Practical Tips for Accessible Design

- Use sufficient color contrast
- Provide text alternatives for images
- Design forms with clear labels and error messages
- Ensure keyboard navigability
- Use semantic HTML
- Test with assistive technologies

## Conclusion

Designing for accessibility is an ongoing process that should be integrated into your design workflow. By following the principles and tips outlined in this guide, you can create designs that are accessible to a wider audience, including people with disabilities.`,
    summary:
      "Learn how to create designs that are accessible to everyone, including people with disabilities, with this comprehensive guide to accessible design principles and practices.",
    cover_image: "/placeholder.svg?height=400&width=800",
    is_published: true,
    published_at: "2023-08-05T13:45:00Z",
    author_id: "3",
    categories: [
      {
        category_id: "3",
        name: "Design",
        slug: "design",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z",
      },
    ],
    tags: [
      {
        tag_id: "5",
        name: "UX",
        slug: "ux",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z",
      },
    ],
    views: 756,
    likes: 62,
    reading_time: "12 min read",
    created_at: "2023-08-01T09:20:00Z",
    updated_at: "2023-08-05T13:45:00Z",
  },
  {
    post_id: "4",
    title: "The Rise of AI in Content Creation",
    slug: "rise-of-ai-in-content-creation",
    content: `Artificial Intelligence (AI) is revolutionizing many industries, and content creation is no exception. In this article, we'll explore how AI is changing the way content is created and consumed.

## Current State of AI in Content Creation

AI tools are increasingly being used to assist with various aspects of content creation, from generating ideas to writing drafts and editing content.

### Text Generation

AI models like GPT-4 can generate human-like text based on prompts. These models are being used to write articles, social media posts, product descriptions, and more.

### Image and Video Creation

AI tools can also generate images and videos based on text descriptions. This is particularly useful for creating visual content quickly and at scale.

### Content Optimization

AI can analyze existing content and suggest improvements for SEO, readability, and engagement.

## Benefits and Challenges

### Benefits

- **Efficiency**: AI can generate content quickly, saving time for human creators.
- **Scale**: AI can produce large volumes of content, which is useful for businesses that need to maintain a consistent online presence.
- **Assistance**: AI can help overcome writer's block by suggesting ideas or drafting initial content.

### Challenges

- **Quality**: While AI-generated content is improving, it still often lacks the depth, nuance, and creativity of human-created content.
- **Ethical Concerns**: There are concerns about plagiarism, misinformation, and the potential for AI to replace human jobs.
- **Authenticity**: Content created by AI may lack the authentic voice and perspective that comes from human experience.

## The Future of AI in Content Creation

As AI technology continues to advance, we can expect to see more sophisticated tools that can generate higher-quality content. However, the most effective approach will likely be a collaboration between humans and AI, with AI handling routine tasks and humans providing creativity, strategy, and oversight.

## Conclusion

AI is transforming content creation, offering new tools and possibilities for creators. While there are challenges to navigate, the potential benefits in terms of efficiency and scale are significant. As with any technology, the key is to use AI thoughtfully and ethically, as a tool to enhance human creativity rather than replace it.`,
    summary:
      "Explore how artificial intelligence is transforming content creation, from text generation to image creation, and the benefits and challenges this presents for creators and businesses.",
    cover_image: "/placeholder.svg?height=400&width=800",
    is_published: true,
    published_at: "2023-09-10T10:30:00Z",
    author_id: "1",
    categories: [
      {
        category_id: "1",
        name: "Technology",
        slug: "technology",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z",
      },
    ],
    tags: [
      {
        tag_id: "3",
        name: "AI",
        slug: "ai",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z",
      },
    ],
    views: 1102,
    likes: 94,
    reading_time: "9 min read",
    created_at: "2023-09-05T15:10:00Z",
    updated_at: "2023-09-10T10:30:00Z",
  },
  {
    post_id: "5",
    title: "Productivity Hacks for Remote Workers",
    slug: "productivity-hacks-remote-workers",
    content: `Remote work has become increasingly common, but it comes with its own set of challenges. In this article, we'll share some productivity hacks to help remote workers stay focused and efficient.

## Setting Up Your Workspace

Having a dedicated workspace is crucial for productivity when working remotely.

### Ergonomic Setup

Invest in a comfortable chair, a desk at the right height, and proper lighting to prevent physical discomfort that can distract from work.

### Minimize Distractions

Choose a quiet location for your workspace, if possible. Use noise-cancelling headphones if you're in a noisy environment.

## Time Management Techniques

Effective time management is essential for remote work productivity.

### Pomodoro Technique

The Pomodoro Technique involves working for 25 minutes, then taking a 5-minute break. After four cycles, take a longer break of 15-30 minutes. This helps maintain focus and prevents burnout.

### Time Blocking

Allocate specific blocks of time for different tasks or types of work. For example, you might block out 9-11 AM for focused work, 11-12 for meetings, and so on.

## Digital Tools for Remote Work

There are many digital tools that can help remote workers stay organized and productive.

### Project Management Tools

Tools like Asana, Trello, or Monday.com can help you keep track of tasks and deadlines.

### Communication Tools

Slack, Microsoft Teams, or Discord can help you stay connected with your team and reduce the feeling of isolation that can come with remote work.

## Maintaining Work-Life Balance

One of the challenges of remote work is maintaining a healthy work-life balance.

### Set Boundaries

Establish clear working hours and communicate them to your team. When you're done for the day, disconnect from work emails and messages.

### Take Breaks

Regular breaks are important for maintaining productivity. Step away from your desk, stretch, or go for a short walk to refresh your mind.

## Conclusion

Remote work offers flexibility and freedom, but it also requires discipline and effective strategies to maintain productivity. By setting up a proper workspace, managing your time effectively, using digital tools, and maintaining a healthy work-life balance, you can maximize your productivity while working remotely.`,
    summary:
      "Discover practical productivity hacks for remote workers, including workspace setup tips, time management techniques, useful digital tools, and strategies for maintaining work-life balance.",
    cover_image: "/placeholder.svg?height=400&width=800",
    is_published: true,
    published_at: "2023-10-15T08:45:00Z",
    author_id: "2",
    categories: [
      {
        category_id: "4",
        name: "Business",
        slug: "business",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z",
      },
    ],
    tags: [
      {
        tag_id: "6",
        name: "Productivity",
        slug: "productivity",
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z",
      },
    ],
    views: 875,
    likes: 71,
    reading_time: "7 min read",
    created_at: "2023-10-10T12:30:00Z",
    updated_at: "2023-10-15T08:45:00Z",
  },
]

// Mock Comments
export const mockComments: Comment[] = [
  {
    comment_id: "1",
    content:
      "Great article! I've been following the developments in JavaScript and I'm really excited about the pattern matching feature.",
    post_id: "1",
    user_id: "2",
    likes: 5,
    created_at: "2023-06-16T10:15:00Z",
    updated_at: "2023-06-16T10:15:00Z",
  },
  {
    comment_id: "2",
    content:
      "I've been using decorators in TypeScript for a while now, and they're really powerful. Can't wait for them to be officially part of JavaScript!",
    post_id: "1",
    user_id: "3",
    likes: 3,
    created_at: "2023-06-17T14:30:00Z",
    updated_at: "2023-06-17T14:30:00Z",
  },
  {
    comment_id: "3",
    content:
      "This is a really comprehensive overview of the climate change situation. It's scary to think about, but it's important to stay informed.",
    post_id: "2",
    user_id: "1",
    likes: 7,
    created_at: "2023-07-21T09:45:00Z",
    updated_at: "2023-07-21T09:45:00Z",
  },
  {
    comment_id: "4",
    content:
      "I appreciate the section on individual actions. Sometimes it feels like there's nothing we can do as individuals, but every little bit helps.",
    post_id: "2",
    user_id: "3",
    likes: 4,
    created_at: "2023-07-22T16:20:00Z",
    updated_at: "2023-07-22T16:20:00Z",
  },
  {
    comment_id: "5",
    content:
      "As a designer, I found this guide really helpful. Accessibility is something I'm trying to incorporate more into my work.",
    post_id: "3",
    user_id: "1",
    likes: 6,
    created_at: "2023-08-06T11:10:00Z",
    updated_at: "2023-08-06T11:10:00Z",
  },
  {
    comment_id: "6",
    content:
      "I love the point about how features that help people with disabilities often help everyone. It's a great perspective to have when designing.",
    post_id: "3",
    user_id: "2",
    likes: 5,
    created_at: "2023-08-07T13:25:00Z",
    updated_at: "2023-08-07T13:25:00Z",
  },
  {
    comment_id: "7",
    content:
      "I've been experimenting with AI for content creation, and while it's impressive, I agree that the best approach is a collaboration between humans and AI.",
    post_id: "4",
    user_id: "2",
    likes: 8,
    created_at: "2023-09-11T15:40:00Z",
    updated_at: "2023-09-11T15:40:00Z",
  },
  {
    comment_id: "8",
    content:
      "The ethical concerns around AI-generated content are really important to consider. I hope we can develop good practices and guidelines as this technology evolves.",
    post_id: "4",
    user_id: "3",
    likes: 6,
    created_at: "2023-09-12T10:55:00Z",
    updated_at: "2023-09-12T10:55:00Z",
  },
  {
    comment_id: "9",
    content:
      "The Pomodoro Technique has been a game-changer for my remote work productivity. Highly recommend giving it a try!",
    post_id: "5",
    user_id: "1",
    likes: 9,
    created_at: "2023-10-16T14:15:00Z",
    updated_at: "2023-10-16T14:15:00Z",
  },
  {
    comment_id: "10",
    content:
      "Setting boundaries is so important for remote work. It took me a while to figure that out, but it's made a huge difference in my work-life balance.",
    post_id: "5",
    user_id: "3",
    likes: 7,
    created_at: "2023-10-17T11:30:00Z",
    updated_at: "2023-10-17T11:30:00Z",
  },
]
