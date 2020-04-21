import dbConnect from '../../../db/dbConnect'
import Note from '../../../models/Note'
import { NextApiRequest, NextApiResponse } from 'next'
import { getNoteById, updateNote, deleteNote } from '../../../controllers/note'

dbConnect()

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, query } = req

	const id = Array.isArray(query.id) ? query.id[0] : query.id

	switch (method) {
		case 'GET':
			try {
				const note = await getNoteById(id)
				if (!note) return res.status(404).send({ success: false })

				res.status(200).send({ success: true, data: note })
			} catch (error) {
				res.status(500).send({ success: false })
			}
			break

		case 'PUT':
			try {
				const note = await updateNote(id, req.body)
				if (!note) return res.status(404).send({ success: false })

				res.status(200).send({ success: true, data: note })
			} catch (error) {
				res.status(500).send({ success: false })
			}
			break

		case 'DELETE':
			try {
				const note = await deleteNote(id)
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
