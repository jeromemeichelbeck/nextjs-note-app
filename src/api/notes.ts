import fetch from 'isomorphic-unfetch'
import { NoteToCreate, NoteToUpdate } from '../types/Note'

export const createNote = async (note: NoteToCreate) => {
	await fetch('http://localhost:3000/api/notes', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(note),
	})
}

export const updateNote = async (id: string, data: NoteToUpdate) => {
	await fetch(`http://localhost:3000/api/note/${id}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

export const deleteNote = async (id: string) => {
	await fetch(`http://localhost:3000/api/notes/${id}`, {
		method: 'DELETE',
	})
}
