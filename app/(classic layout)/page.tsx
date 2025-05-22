import { BlogPostPreview } from '@/components/BlogPostPreview'
import { SubscribeForm } from '@/components/SubscribeForm'
import { WorkExperience } from '@/components/WorkExperience'
import { PhotoGallery } from '@/components/PhotoGallery'

// Sample data - replace with your actual data
const blogPosts = [
  {
    title: 'Building the future of AI: My journey into machine learning',
    date: '2024-01-15',
    description: 'An exploration of how AI is transforming our world and my personal experience diving deep into machine learning algorithms and their practical applications.',
    slug: 'building-future-ai'
  },
  {
    title: 'The art of mindful coding: Zen principles in software development',
    date: '2024-01-08',
    description: 'How applying Buddhist mindfulness principles to programming can lead to better code, clearer thinking, and a more balanced approach to problem-solving.',
    slug: 'mindful-coding-zen'
  },
  {
    title: 'From philosophy to code: Bridging abstract thinking and practical development',
    date: '2024-01-01',
    description: 'Exploring the unexpected connections between philosophical inquiry and software engineering, and how both disciplines inform each other.',
    slug: 'philosophy-to-code'
  }
]

const workExperience = [
  {
    company: 'Tech Innovators',
    role: 'Senior Software Engineer',
    startDate: '2022',
    endDate: 'Present',
    logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop&crop=center'
  },
  {
    company: 'Digital Solutions',
    role: 'Full Stack Developer',
    startDate: '2020',
    endDate: '2022',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=64&h=64&fit=crop&crop=center'
  },
  {
    company: 'StartupCo',
    role: 'Frontend Developer',
    startDate: '2019',
    endDate: '2020',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center'
  }
]

const galleryImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop'
]

export default function Page() {
  return (
    <>
      {/* Hero Section */}
      <div className="sm:px-8 mt-9">
        <div className="mx-auto w-full max-w-7xl lg:px-8">
          <div className="relative px-4 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-2xl lg:max-w-5xl">
              <div className="max-w-2xl">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                  Software engineer, philosopher, and mindful creator.
                </h1>
                <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                  I'm Zen, a software engineer passionate about AI, mindfulness, and the intersection of technology and philosophy.
                  Based in the digital realm, I build things that matter and explore the deeper questions of existence.
                </p>

                {/* Social Links */}
                <div className="mt-6 flex gap-6">
                  <a
                    href="#"
                    className="group -m-1 p-1"
                    aria-label="Follow on X"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
                    >
                      <path d="M13.3174 10.7749L19.1457 4H17.7646L12.7039 9.88256L8.66193 4H4L10.1122 12.8955L4 20H5.38119L10.7254 13.7878L14.994 20H19.656L13.3171 10.7749H13.3174ZM11.4257 12.9738L10.8064 12.0881L5.87886 5.03974H8.00029L11.9769 10.728L12.5962 11.6137L17.7652 19.0075H15.6438L11.4257 12.9742V12.9738Z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="group -m-1 p-1"
                    aria-label="Follow on GitHub"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
                    >
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="group -m-1 p-1"
                    aria-label="Follow on LinkedIn"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300"
                    >
                      <path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      <PhotoGallery images={galleryImages} />

      {/* Blog Posts and Sidebar */}
      <div className="sm:px-8 mt-24 md:mt-28">
        <div className="mx-auto w-full max-w-7xl lg:px-8">
          <div className="relative px-4 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-2xl lg:max-w-5xl">
              <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">

                {/* Blog Posts */}
                <div className="flex flex-col gap-16">
                  {blogPosts.map((post) => (
                    <BlogPostPreview
                      key={post.slug}
                      title={post.title}
                      date={post.date}
                      description={post.description}
                      slug={post.slug}
                    />
                  ))}
                </div>

                {/* Sidebar */}
                <div className="space-y-10 lg:pl-16 xl:pl-24">
                  <SubscribeForm />
                  <WorkExperience items={workExperience} />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
