import dbConnect from '../../../utils/dbConnect'
import Note from '../../../models/Note'

dbConnect()

export default async (req, res) => {
	const {
		method,
		query: { id },
	} = req

	switch (method) {
		case 'GET':
			try {
				const note = await Note.findById(id)
				if (!note) return res.status(404).send({ success: false })

				res.status(200).send({ success: true, data: note })
			} catch (error) {
				res.status(500).send({ success: false })
			}
			break

		case 'PUT':
			try {
				const note = await Note.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true,
				})
				if (!note) return res.status(404).send({ success: false })

				res.status(200).send({ success: true, data: note })
			} catch (error) {
				res.status(500).send({ success: false })
			}
			break

		case 'DELETE':
			try {
				const note = await Note.findByIdAndDelete(id)
				if (!note) return res.status(404).send({ success: false })

				res.status(200).send({ success: true, data: {} })
			} catch (error) {
				res.status(500).send({ success: false })
			}
			break

		default:
			res.status(405).send({ success: false })
	}
}
