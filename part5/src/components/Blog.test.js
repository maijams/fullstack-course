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
    likes: 7
  }

  test('renders content', () => {
    render(<Blog blog={blog} />)

    screen.findByText('React patterns')
    screen.findByText('Michael Chan')

    expect(screen.queryByText('https://reactpatterns.com/', { exact: false })).toBeNull()
    expect(screen.queryByText('7', { exact: false })).toBeNull()
  })
})

