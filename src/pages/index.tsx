import { Button, Card, CardContent } from 'semantic-ui-react'
import Link from 'next/link'
import { NextPage, GetServerSideProps, NextPageContext } from 'next'
import fetch from 'isomorphic-unfetch'

import { NotesProps, Note } from '../types/Note'
import { getNotes } from '../controllers/note'

const Home: NextPage<NotesProps> = ({ notes }) => (
	<div className="notes-container">
		<h1>Notes</h1>
		<div className="grid wrapper">
			{notes.map((note) => (
				<div key={note._id}>
					<Card>
						<Card.Content>
							<Card.Header>
								<Link href={`/${note._id}`}>
									<a>{note.title}</a>
								</Link>
							</Card.Header>
						</Card.Content>
						<Card.Content extra>
							<Link href="/[id]" as={`/${note._id}`}>
								<Button primary>View</Button>
							</Link>
							<Link href="/[id]/edit" as={`/${note._id}/edit`}>
								<Button primary>Edit</Button>
							</Link>
						</Card.Content>
					</Card>
				</div>
			))}
		</div>
	</div>
)

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	try {
		const notes = await getNotes()

		return { props: { notes } }
	} catch (error) {
		return { props: { notes: [] } }
	}
}

// Home.getInitialProps = async (ctx: NextPageContext) => {
// 	try {
// 		// const res = await fetch('http://localhost:3000/api/notes')
// 		// const data: Note[] = (await res.json()).data

// 		const notes = await getNotes()

// 		return { notes }
// 	} catch (error) {
// 		return { notes: [] }
// 	}
// }

export default Home
