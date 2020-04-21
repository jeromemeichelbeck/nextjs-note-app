import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import { Button, Form, Loader } from 'semantic-ui-react'

const NewNote = () => {
	const [form, setForm] = useState({ title: '', description: '' })
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errors, setErrors] = useState({})
	const router = useRouter()

	useEffect(() => {
		if (isSubmitting) {
			if (Object.keys(errors).length === 0) {
				createNote()
			} else {
				setIsSubmitting(false)
			}
		}
	}, [isSubmitting])

	const createNote = async () => {
		try {
			await fetch('http://localhost:3000/api/notes', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			})

			router.push('/')
		} catch (error) {}
	}

	const validate = () => {
		let err = {}

		if (!form.title) {
			err.title = 'Title is required'
		}
		if (!form.description) {
			err.description = 'Description is required'
		}

		return err
	}

	const handleChange = (e) => {
		e.preventDefault()
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = (e) => {
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
