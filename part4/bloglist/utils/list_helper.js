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


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}