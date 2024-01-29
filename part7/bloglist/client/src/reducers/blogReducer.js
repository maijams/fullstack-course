import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    updateComments(state, action) {
      const { id, comment } = action.payload
      const blog = state.find((blog) => blog.id === id)
      const updatedBlog = { ...blog, comments: blog.comments.concat(comment) }
      return state.map((blog) => blog.id !== id ? blog : updatedBlog)
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

export const commentBlog = (id, comment) => {
  return async dispatch => {
    await blogService.comment(id, comment)
    dispatch(updateComments({ id, comment }))
  }
}


export const { like, appendBlog, setBlogs, updateComments } = blogSlice.actions
export default blogSlice.reducer