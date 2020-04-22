import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { Form, Button, Loader } from 'semantic-ui-react'
import { NextPage, GetServerSideProps } from 'next'

import { NoteProps, NoteError } from '../../types/Note'
import { getNoteById } from '../../controllers/note'
import { updateNote } from '../../api/notes'

const EditNote: NextPage<NoteProps | undefined> = ({ note }) => {
	const { title, description } = note
	const [form, setForm] = useState({ title, description })
	const [isUpdating, setIsUpdating] = useState(false)
	const [errors, setErrors] = useState<NoteError>({})
	const router = useRouter()

	useEffect(() => {
		if (isUpdating) {
			if (Object.keys(errors).length === 0) {
				try {
					updateNote(note._id, form)
					router.push(`/${note._id}`)
				} catch (error) {
					console.error('error')
				}
			} else {
				setIsUpdating(false)
			}
		}
	}, [isUpdating])

	const validate = () => {
		let err = {} as NoteError

		if (!form.title) {
			err.title = 'Title is required'
		}
		if (!form.description) {
			err.description = 'Description is required'
		}

		return err
	}

	const handleChange = (e: FormEvent) => {
		e.preventDefault()
		const target = e.target as HTMLInputElement | HTMLTextAreaElement
		setForm({
			...form,
			[target.name]: target.value,
		})
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		let errs = validate()
		setErrors(errs)
		setIsUpdating(true)
	}

	return (
		<div className="form-container">
			<h1>Edit Note</h1>
			<div>
				{isUpdating ? (
					<Loader active inline="centered" />
				) : (
					<Form onSubmit={handleSubmit}>
						<Form.Input
							error={
								errors.title
									? {
											content: errors.title,
											pointing: 'below',
									  }
									: null
							}
							label="Title"
							placeholder="Title"
							name="title"
							onChange={handleChange}
							value={form.title}
						/>
						<Form.TextArea
							error={
								errors.description
									? {
											content: errors.description,
											pointing: 'below',
									  }
									: null
							}
							label="Description"
							placeholder="Description"
							name="description"
							onChange={handleChange}
							value={form.description}
						/>
						<Button type="submit">Save Modifications</Button>
					</Form>
				)}
			</div>
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

export default EditNote
