import fetch from 'isomorphic-unfetch'
import { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { Form, Button, Loader } from 'semantic-ui-react'
import { NextPage, NextPageContext } from 'next'

import { NoteProps, NoteError, Note } from '../../types/Note'

const EditNote: NextPage<NoteProps | undefined> = ({ note }) => {
	const { title, description } = note
	const [form, setForm] = useState({ title, description })
	const [isUpdating, setIsUpdating] = useState(false)
	const [errors, setErrors] = useState<NoteError>({})
	const router = useRouter()

	useEffect(() => {
		if (isUpdating) {
			if (Object.keys(errors).length === 0) {
				updateNote()
			} else {
				setIsUpdating(false)
			}
		}
	}, [isUpdating])

	const updateNote = async () => {
		try {
			await fetch(`http://localhost:3000/api/notes/${note._id}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			})

			router.push(`/${note._id}`)
		} catch (error) {}
	}

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

EditNote.getInitialProps = async ({ query, res }: NextPageContext) => {
	const { id } = query
	try {
		const res = await fetch(`http://localhost:3000/api/notes/${id}`)
		const data: Note = (await res.json()).data

		if (!data) throw new Error()

		return { note: data }
	} catch (error) {
		res?.writeHead(300, { Location: '/' }).end()
	}
}

export default EditNote
