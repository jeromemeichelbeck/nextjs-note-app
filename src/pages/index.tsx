import { Button, Card, CardContent } from 'semantic-ui-react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import { NextPage, NextPageContext } from 'next'

import { NotesProps } from '../types/Note'

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

Home.getInitialProps = async (ctx: NextPageContext) => {
	try {
		const res = await fetch('http://localhost:3000/api/notes')
		const { data } = await res.json()

		return { notes: data }
	} catch (error) {
		return { notes: [] }
	}
}

export default Home
