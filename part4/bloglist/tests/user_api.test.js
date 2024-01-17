const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')
const helper = require('./test_helper')


describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.users)
  })

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  describe('creating new user', () => {
    test('succeeds when parameter conditions are met', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'testuser',
        name: 'Test User',
        password: 'testpassword'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('fails when username is not unique', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'test',
        name: 'Test User',
        password: 'testpassword'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      expect(result.body.error).toContain('`username` to be unique')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('fails when username is not defined', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        name: 'Test1234',
        password: 'testpassword'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      expect(result.body.error).toContain('`username` is required')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('fails when username is shorter than 3 characters', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'te',
        name: 'Test1234',
        password: 'testpassword'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      expect(result.body.error).toContain('is shorter than the minimum allowed length')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('fails when password is not defined', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'testuser',
        name: 'Test User',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      expect(result.body.error).toContain('password must be at least 3 characters long')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('fails when password is shorter than 3 characters', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'testuser',
        name: 'Test User',
        password: 'te'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      expect(result.body.error).toContain('password must be at least 3 characters long')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

  })
})


afterAll(async () => {
  await mongoose.connection.close()
})