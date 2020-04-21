import fetch from 'isomorphic-unfetch'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Confirm, Button, Loader } from 'semantic-ui-react'

const Note = ({ note }) => {
	const [confirm, setConfirm] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const router = useRouter()

	useEffect(() => {
		if (isDeleting) {
			deleteNote()
		}
	}, [isDeleting])

	const deleteNote = async () => {
		try {
			await fetch(`http://localhost:3000/api/notes/${note._id}`, {
				method: 'DELETE',
			})
			router.push('/')
		} catch (error) {}
	}

	const open = () => setConfirm(true)

	const close = () => setConfirm(false)

	const handleDelete = async () => {
		setIsDeleting(true)
		close()
	}

	return (
		<div className="note-container">
			{isDeleting ? (
				<Loader active inline="centered" />
			) : (
				<>
					<h1>{note.title}</h1>
					<p>{note.description}</p>
					<Button color="red" onClick={open}>
						Delete
					</Button>
				</>
			)}
			<Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
		</div>
	)
}

Note.getInitialProps = async ({ query }) => {
	const { id } = query
	try {
		const res = await fetch(`http://localhost:3000/api/notes/${id}`)
		const { data } = await res.json()

		return { note: data }
	} catch (error) {
		return { note: { error: true } }
	}
}

export default Note
