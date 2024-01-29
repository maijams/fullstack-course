import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import userService from '../services/users'

const initialState = {
  loggedUser: null,
  allUsers: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return {
        ...state,
        loggedUser: action.payload
      }
    },
    setAllUsers(state, action) {
      return {
        ...state,
        allUsers: action.payload
      }
    }
  }
})

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const getAllUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch(setAllUsers(users))
  }
}


export const { setUser, setAllUsers } = userSlice.actions
export default userSlice.reducer