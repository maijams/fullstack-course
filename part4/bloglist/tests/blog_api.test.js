const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')


describe('when there is initially some blogs saved', () => {
  let authToken = null

  beforeAll(async () => {
    await User.deleteMany({})

    const newUser = {
      username: 'test',
      password: 'test',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    const response = await api
      .post('/api/login')
      .send(newUser)
      .expect(200)

    authToken = response.body.token
  })

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.blogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.blogs.length)
  })

  test('blog must have an id', async () => {
    await api.get('/api/blogs')
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].id).toBeDefined()
    expect(blogsAtEnd[0].__id).not.toBeDefined()
  })

  describe('additon of a new blog', () => {
    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${authToken}`)
        .send(newBlog)
        .expect(201)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1)

      const titles = blogsAtEnd.map(b => b.title)
      expect(titles).toContain(
        'First class tests'
      )
    })

    test('likes is initialized to 0 if not defined', async () => {
      const newBlog = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      }

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${authToken}`)
        .send(newBlog)
        .expect(201)

      expect(response.body.likes).toBe(0)
    })

    test('blog addition fails without authorization', async () => {
      const newBlog = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.blogs.length)
    })

    test('blog without title is not added', async () => {
      const newBlog = {
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${authToken}`)
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.blogs.length)
    })

    test('blog without url is not added', async () => {
      const newBlog = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        likes: 10,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${authToken}`)
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.blogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const newBlog = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
      }

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${authToken}`)
        .send(newBlog)
        .expect(201)

      const blogToDelete = response.body
      const blogsAtStart = await helper.blogsInDb()

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${authToken}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        blogsAtStart.length - 1
      )

      const titles = blogsAtEnd.map(b => b.title)

      expect(titles).not.toContain(blogToDelete.title)
    })

    test('fails with status code 404 if id is not valid', async () => {
      await api
        .delete(`/api/blogs/${helper.nonExistingId}`)
        .set('Authorization', `bearer ${authToken}`)
        .expect(404)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        helper.blogs.length
      )
    })
  })

  describe('modifying a blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToModify = blogsAtStart[0]

      const modifiedBlog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 20,
      }

      const response = await api
        .put(`/api/blogs/${blogToModify.id}`)
        .send(modifiedBlog)
        .expect(200)

      expect(response.body.likes).toBe(20)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        helper.blogs.length
      )
    })

    test('fails with status code 404 if id is not valid', async () => {
      const modifiedBlog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 20,
      }

      await api
        .put(`/api/blogs/${helper.nonExistingId}`)
        .send(modifiedBlog)
        .expect(404)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        helper.blogs.length
      )
    })
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})