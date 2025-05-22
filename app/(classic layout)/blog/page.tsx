import { BlogPostPreview } from '@/components/BlogPostPreview'
import { getBlogPosts } from './utils'

export const metadata = {
  title: 'Articles - Zen',
  description: 'Thoughts on artificial intelligence, mindful software development, and the philosophical foundations of technology.',
}

export default function Page() {
  const posts = getBlogPosts()

  return (
    <div className="sm:px-8 mt-16 sm:mt-32">
      <div className="mx-auto w-full max-w-7xl lg:px-8">
        <div className="relative px-4 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl lg:max-w-5xl">
            <header className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                Thoughts on AI, mindfulness, and the philosophy of code
              </h1>
              <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                Exploring the intersection of artificial intelligence, mindful software development,
                and philosophical inquiry. A collection of ideas on building technology that serves
                humanity's highest aspirations, written from the perspective of a software engineer
                who believes wisdom matters as much as technical skill.
              </p>
            </header>

            <div className="mt-16 sm:mt-20">
              <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
                <div className="flex max-w-3xl flex-col space-y-16">
                  {posts.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="mx-auto w-24 h-24 mb-6 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          className="w-8 h-8 text-teal-600 dark:text-teal-400"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                        Articles coming soon
                      </h3>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        I'm currently working on some thoughtful pieces about AI, mindfulness, and the future of technology.
                        Check back soon for insights on building intelligent systems with wisdom and intention.
                      </p>
                    </div>
                  ) : (
                    posts
                      .sort((a, b) => {
                        if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
                          return -1
                        }
                        return 1
                      })
                      .map((post) => (
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

            {/* Newsletter signup section */}
            {posts.length > 0 && (
              <div className="mt-20 sm:mt-24">
                <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
                  <h3 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="h-6 w-6 flex-none text-zinc-500"
                    >
                      <path
                        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
                        stroke="currentColor"
                      />
                      <path d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6" stroke="currentColor" />
                    </svg>
                    <span className="ml-3">Stay updated</span>
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    Get notified when I publish new articles about AI, mindful development, and the philosophy of technology.
                  </p>
                  <div className="mt-6 flex">
                    <input
                      type="email"
                      placeholder="Email address"
                      aria-label="Email address"
                      required
                      className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
                    />
                    <button
                      className="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70 ml-4 flex-none"
                      type="submit"
                    >
                      Join
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
