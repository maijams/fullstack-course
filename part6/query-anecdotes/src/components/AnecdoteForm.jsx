import { useNotificationDispatch } from '../NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'


const AnecdoteForm = () => {
	const queryClient = useQueryClient()
	const dispatch = useNotificationDispatch()
	const getId = () => (100000 * Math.random()).toFixed(0)

	const newAnecdoteMutation = useMutation({
		mutationFn: createAnecdote,
		onSuccess: (newAnecdote) => {
			queryClient.invalidateQueries(['anecdotes'])
			dispatch({ type: 'SET_NOTIFICATION', payload: `you created '${newAnecdote.content}'` })
			setTimeout(() => {
				dispatch({ type: 'SET_NOTIFICATION', payload: '' })
			}, 5000)
		},
		onError: (error) => {
			const errorMessage = error.response.data.error
			dispatch({ type: 'SET_NOTIFICATION', payload: errorMessage })
			setTimeout(() => {
				dispatch({ type: 'SET_NOTIFICATION', payload: '' })
			}, 5000)
		},
	})

	const onCreate = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		const object = {
			content: content,
			id: getId(),
			votes: 0
		}
		newAnecdoteMutation.mutate(object)
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


export default AnecdoteForm
