import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
// import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    // filter: filterReducer,
    notification: notificationReducer
  }
})

export default store