import { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '../../../db/dbConnect'
import Note from '../../../models/Note'
import { getNotes, createNote } from '../../../controllers/note'

dbConnect()

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req

	switch (method) {
		case 'GET':
			try {
				const notes = await getNotes()

				console.log('from api', notes)

				res.status(200).send({ success: true, data: notes })
			} catch (error) {
				res.status(500).send({ success: false })
			}
			break

		case 'POST':
			try {
				const note = await createNote(req.body)

				res.status(201).send({ success: true, data: note })
			} catch (error) {
				res.status(500).send({ success: false })
			}
			break

		default:
			res.status(405).send({ success: false })
	}
}
