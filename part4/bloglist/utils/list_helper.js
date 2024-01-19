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
      likes: result.likes
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}