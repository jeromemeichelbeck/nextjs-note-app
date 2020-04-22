import { useRouter } from 'next/router'
import { useState, useEffect, FormEvent } from 'react'
import { Button, Form, Loader } from 'semantic-ui-react'
import { NextPage } from 'next'

import { NoteError } from '../types/Note'
import { createNote } from '../api/notes'

const NewNote: NextPage = () => {
	const [form, setForm] = useState({ title: '', description: '' })
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errors, setErrors] = useState<NoteError>({})

	const router = useRouter()

	useEffect(() => {
		if (isSubmitting) {
			if (Object.keys(errors).length === 0) {
				try {
					createNote(form)
					router.push('/')
				} catch (error) {}
			} else {
				setIsSubmitting(false)
			}
		}
	}, [isSubmitting])

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
		setIsSubmitting(true)
	}

	return (
		<div className="form-container">
			<h1>Create Note</h1>
			<div>
				{isSubmitting ? (
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
						/>
						<Button type="submit">Create</Button>
					</Form>
				)}
			</div>
		</div>
	)
}

export default NewNote
