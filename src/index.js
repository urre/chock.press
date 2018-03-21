import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import routes from './routes'
import appreset from 'app-reset'
import styles from './css/main.css'
import ReactGA from 'react-ga'
import App from './components/App';

ReactGA.initialize('UA-5407647-67')

const logPageView = () => {
	ReactGA.set({
		page: window.location.pathname
	})
	ReactGA.pageview(window.location.pathname)
}

ReactDOM.render(
	<BrowserRouter>
		<App/>
	</BrowserRouter>,
	document.getElementById('main')
)

module.hot.accept();
