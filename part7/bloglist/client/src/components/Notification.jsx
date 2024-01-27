import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification.message)
  const color = useSelector(state => state.notification.color)

  if (message === '') {
    return null
  }

  const messageStyle = {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return <div style={messageStyle}>{message}</div>
}

export default Notification
