import fetch from 'isomorphic-unfetch'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Form, Button, Loader } from 'semantic-ui-react'

const EditNote = ({ note }) => {
	const { title, description } = note
	const [form, setForm] = useState({ title, description })
	const [isUpdating, setIsUpdating] = useState(false)
	const [errors, setErrors] = useState({})
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

EditNote.getInitialProps = async ({ query }) => {
	const { id } = query
	try {
		const res = await fetch(`http://localhost:3000/api/notes/${id}`)
		const { data } = await res.json()

		return { note: data }
	} catch (error) {
		return { note: { error: true } }
	}
}

export default EditNote
