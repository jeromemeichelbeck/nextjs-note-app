const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
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

module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema)
