import mongoose, { Document, Model } from 'mongoose'

export interface NoteInterface extends Document {
	title: string
	description: string
}

const NoteSchema = new mongoose.Schema<NoteInterface>({
	title: {
		type: String,
		required: [true, 'Please add a tilte'],
		unique: true,
		trim: true,
		maxlength: [40, 'Title can not be longer than 40 characters'],
	},
	description: {
		type: String,
		required: true,
		maxlength: [200, 'Description can not be longer than 200 characters'],
	},
})

const Note =
	(mongoose.models.Note as Model<NoteInterface>) ||
	mongoose.model<NoteInterface>('Note', NoteSchema)

export default Note
