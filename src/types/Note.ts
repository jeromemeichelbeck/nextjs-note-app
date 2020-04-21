import { NoteInterface } from '../models/Note'

export interface Note extends NoteInterface {}

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
