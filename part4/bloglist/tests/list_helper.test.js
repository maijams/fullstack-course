const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(helper.blogs)
    expect(result).toBe(46)
  })
})


describe('favorite blog', () => {
  const oneBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 5
  }

  const fav_blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 15
  }

  test('of empty list is empty object', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })

  test('when list has only one blog', () => {
    const result = listHelper.favoriteBlog(helper.listWithOneBlog)
    expect(result).toEqual(oneBlog)
  })

  test('of a bigger list is that with most likes', () => {
    const result = listHelper.favoriteBlog(helper.blogs)
    expect(result).toEqual(fav_blog)
  })
})


describe('most blogs', () => {
  const oneBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 5
  }

  test('of empty list is empty object', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })

  test('when list has only one blog', () => {
    const result = listHelper.mostBlogs(helper.listWithOneBlog)
    expect(result).toEqual({ author: oneBlog.author, blogs: 1 })
  })

  test('of a bigger list is that with most blogs', () => {
    const result = listHelper.mostBlogs(helper.blogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})