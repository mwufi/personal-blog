import { BlogPostPreview } from '@/components/BlogPostPreview'
import { getBlogPosts } from './utils'

export const metadata = {
  title: 'Articles - Zen Tomorrow',
  description: 'Thoughts on software engineering, philosophy, and the mindful application of technology.',
}

export default function Page() {
  const posts = getBlogPosts()

  return (
    <div className="sm:px-8 mt-16 lg:mt-32">
      <div className="mx-auto w-full max-w-7xl lg:px-8">
        <div className="relative px-4 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl lg:max-w-5xl">
            <header className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                Writing on software design, philosophy, and mindful technology.
              </h1>
              <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                All of my long-form thoughts on programming, technology, philosophy, and more,
                collected in chronological order.
              </p>
            </header>

            <div className="mt-16 sm:mt-20">
              <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
                <div className="flex max-w-3xl flex-col space-y-16">
                  {posts.length === 0 ? (
                    <p className="text-zinc-600 dark:text-zinc-400">
                      No articles published yet. Check back soon!
                    </p>
                  ) : (
                    posts.map((post) => (
                      <BlogPostPreview
                        key={post.slug}
                        title={post.metadata.title}
                        date={post.metadata.publishedAt}
                        description={post.metadata.summary}
                        slug={post.slug}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
