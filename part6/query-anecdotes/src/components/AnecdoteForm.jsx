import PropTypes from 'prop-types'

const AnecdoteForm = ({ newAnecdoteMutation }) => {
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
