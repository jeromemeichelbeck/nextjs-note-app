import { NoteInterface } from '../models/Note'

export interface Note extends NoteInterface {}

// Components
export interface NoteProps {
	note: Note
}

export interface NotesProps {
	notes: Note[]
}

export interface NoteError {
	title?: string
	description?: string
}

// CRUD
export interface NoteToCreate {
	title: string
	description: string
}

export interface NoteToUpdate {
	title?: string
	desciption?: string
}
