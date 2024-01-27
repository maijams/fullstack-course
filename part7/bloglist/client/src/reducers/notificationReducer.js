import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  color: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return {
        ...state,
        message: action.payload,
      }
    },
    setColor(state, action) {
      return {
        ...state,
        color: action.payload,
      }
    }
  }
})

export const setNotificationWithTimeOut = (notification, color, sec) => {
  return dispatch => {
    dispatch(setColor(color))
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, sec * 1000
    )
  }
}

export const { setNotification, setColor } = notificationSlice.actions
export default notificationSlice.reducer