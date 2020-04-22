import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Confirm, Button, Loader } from 'semantic-ui-react'
import { NextPage, GetServerSideProps } from 'next'

import { NoteProps } from '../../types/Note'
import { getNoteById } from '../../controllers/note'
import { deleteNote } from '../../api/notes'

const ViewNote: NextPage<NoteProps | undefined> = ({ note }) => {
	const [confirm, setConfirm] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const router = useRouter()

	useEffect(() => {
		if (isDeleting) {
			try {
				deleteNote(note._id)
				router.push('/')
			} catch (error) {}
		}
	}, [isDeleting])

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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const id = Array.isArray(query.id) ? query.id[0] : query.id
	if (!id) {
		return {
			props: { note: {} },
		}
	}
	try {
		const note = await getNoteById(id)

		return {
			props: { note },
		}
	} catch (error) {
		return {
			props: { note: {} },
		}
	}
}

export default ViewNote
