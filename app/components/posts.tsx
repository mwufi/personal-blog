import { getBlogPosts } from 'app/(classic layout)/blog/utils'
import { Post } from './Post'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Post key={post.slug} post={post} />
        ))}
    </div>
  )
}
