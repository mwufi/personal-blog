import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-4xl font-semibold tracking-tighter font-caveat">
        Zen Tomorrow
      </h1>
      <p className="mb-4">
        {`Hi, I'm Zen.`}
      </p>
      <p className="mb-4">
        {`Hi, I'm Zen.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
