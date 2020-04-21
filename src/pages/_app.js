import Layout from '../components/Layout'

import 'semantic-ui-css/semantic.min.css'
import '../css/style.css'

const App = ({ Component, pageProps }) => (
	<Layout>
		<Component {...pageProps} />
	</Layout>
)

export default App
