import dbConnect from '../db/dbConnect'
import Note from '../models/Note'
import { NoteToCreate, NoteToUpdate } from '../types/Note'

dbConnect()

export const getNotes = async () => {
	const notes = await Note.find({})

	return notes
}

export const createNote = async (noteToCreate: NoteToCreate) => {
	const createdNote = await Note.create(noteToCreate)

	return createdNote
}

export const getNoteById = async (id: string) => {
	const note = await Note.findById(id)

	return note
}

export const updateNote = async (id: string, noteToUpdate: NoteToUpdate) => {
	const updatedNote = await Note.findByIdAndUpdate(id, noteToUpdate, {
		new: true,
		runValidators: true,
	})

	return updatedNote
}

export const deleteNote = async (id: string) => {
	const deletedNote = await Note.findByIdAndDelete(id)

	return deletedNote
}
