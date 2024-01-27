import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    await blogService.create(content)
    dispatch(initializeBlogs())
  }
}

export const likeBlog = (id, blog) => {
  console.log(blog)
  return async dispatch => {
    await blogService.update(id, blog)
    dispatch(initializeBlogs())
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(initializeBlogs())
  }
}


export const { like, appendBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer