import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import appreset from 'app-reset';
import styles from './css/main.css';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-5407647-67');

const logPageView = () => {
  ReactGA.set({
    page: window.location.pathname,
  });
  ReactGA.pageview(window.location.pathname);
};

render((
  <Router history={ browserHistory } onUpdate={ logPageView }>
    { routes }
  </Router>
  ), document.getElementById('main'));