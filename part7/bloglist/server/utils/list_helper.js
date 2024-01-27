const lodash = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (max, blog) => {
    return max.likes > blog.likes ? max : blog
  }
  const result = blogs.reduce(reducer, 0)
  return result === 0
    ? {}
    : {
        title: result.title,
        author: result.author,
        likes: result.likes,
      }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const blogCounts = lodash.countBy(blogs, 'author')
  const mostBlogsAuthor = lodash.maxBy(Object.keys(blogCounts), (author) => blogCounts[author])

  return {
    author: mostBlogsAuthor,
    blogs: blogCounts[mostBlogsAuthor],
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const likesByAuthor = lodash(blogs)
    .groupBy('author')
    .map((objs, key) => ({
      author: key,
      likes: lodash.sumBy(objs, 'likes'),
    }))
    .value()

  const mostLikesAuthor = lodash.maxBy(likesByAuthor, 'likes')

  return {
    author: mostLikesAuthor.author,
    likes: mostLikesAuthor.likes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
