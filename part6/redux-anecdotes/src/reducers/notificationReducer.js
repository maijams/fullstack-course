import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
	name: 'notification',
	initialState: '',
	reducers: {
		setNotification(state, action) {
			return action.payload
		},
	}
})

export const setNotificationWithTimeOut = (notification, sec) => {
	return dispatch => {
		dispatch(setNotification(notification))
		setTimeout(() => {
			dispatch(setNotification(''))
		}, sec * 1000
		)
	}
}

export const { setNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer