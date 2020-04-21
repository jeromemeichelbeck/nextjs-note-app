import dbConnect from '../../../utils/dbConnect'
import Note from '../../../models/Note'

dbConnect()

export default async (req, res) => {
	const { method } = req

	switch (method) {
		case 'GET':
			try {
				const notes = await Note.find({})

				res.status(200).send({ success: true, data: notes })
			} catch (error) {
				res.status(500).send({ success: false })
			}
			break

		case 'POST':
			try {
				const note = await Note.create(req.body)

				res.status(201).send({ success: true, data: note })
			} catch (error) {
				res.status(500).send({ success: false })
			}
			break

		default:
			res.status(405).send({ success: false })
	}
}
