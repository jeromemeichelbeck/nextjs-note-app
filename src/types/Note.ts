export interface Note {
	_id: string
	title: string
	description: string
}

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
