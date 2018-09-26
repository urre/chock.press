import React, { Component } from 'react'
import Footer from './Footer'
import Aftonbladet from './Aftonbladet'
import Expressen from './Expressen'

class App extends Component {
	render() {
		return (
			<div className="container">
				<main className="context">
					<Expressen />
				</main>
				<Footer />
			</div>
		)
	}
}
export default App
