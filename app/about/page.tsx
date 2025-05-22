import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Zentomorrow',
  description: 'Zentomorrow is a site dedicated to the study of Zen Buddhism.',
}

export default function Page() {
  return (
    <section className="flex-1">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">About</h1>
      <p>
        Zentomorrow is a site dedicated to the study of Zen Buddhism.
      </p>
    </section>
  )
}
