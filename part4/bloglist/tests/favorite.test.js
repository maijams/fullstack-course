const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')


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