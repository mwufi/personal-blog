import { BlogPosts } from 'app/components/posts'
import Quotes from './Quotes'

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
        {`I'm a software engineer and a student of Zen Buddhism. Or so AI tells me. I'm a fan of design, computers, philosophy, cool spaces, summer days, life, and the pursuit of happiness.`}
      </p>
      <Quotes />
      <p className="my-4">
        {`My dream in life is to be an artist -- short of that, I'll settle for making AGI pets, curing aging, wandering the world, and finding a few people to do things with.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
