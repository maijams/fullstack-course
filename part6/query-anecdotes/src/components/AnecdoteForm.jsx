import PropTypes from 'prop-types'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = ({ newAnecdoteMutation }) => {
	const dispatch = useNotificationDispatch()
	const getId = () => (100000 * Math.random()).toFixed(0)

	const onCreate = async (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		console.log('new anecdote', content)
		const object = {
			content: content,
			id: getId(),
			votes: 0
		}
		newAnecdoteMutation.mutate(object)
		dispatch({ type: 'SET_NOTIFICATION', payload: `you created '${content}'` })
		setTimeout(() => {
			dispatch({ type: 'SET_NOTIFICATION', payload: '' })
		}, 5000)

	}

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name='anecdote' />
				<button type="submit">create</button>
			</form>
		</div>
	)
}

AnecdoteForm.propTypes = {
	newAnecdoteMutation: PropTypes.object.isRequired
}

export default AnecdoteForm
