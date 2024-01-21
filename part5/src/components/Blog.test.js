import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('<Blog />', () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      username: 'test3',
      name: 'test',
      id: '65a8f6843fc6bb265cf516d8'
    },
    id: '65abee845578955439861ffa'
  }

  const testuser = {
    username: 'test3',
    name: 'test',
    id: '65a8f6843fc6bb265cf516d8'
  }

  test('renders content', () => {
    render(<Blog blog={blog} />)

    screen.findByText('React patterns')
    screen.findByText('Michael Chan')

    expect(screen.queryByText('https://reactpatterns.com/', { exact: false })).toBeNull()
    expect(screen.queryByText('7', { exact: false })).toBeNull()
  })

  test('clicking the "view"-button reveals more information', async () => {
    render(<Blog blog={blog} user={testuser} />)

    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    screen.findByText('https://reactpatterns.com/')
    screen.findByText('7')
    screen.findByText('test')
  })

  test('clicking the "like"-button twice calls event handler twice', async () => {
    const mockHandler = jest.fn()

    render(<Blog blog={blog} user={testuser} updateLikes={mockHandler} />)

    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

