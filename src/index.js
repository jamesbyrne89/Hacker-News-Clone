import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Comments from './components/Comments';
import Error from './components/Error';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import './styles/styles.css';


ReactDOM.render((
  <Router>
  <Switch>
    <Route exact path='/' component={App} />
	<Route path="/comments" component={Comments} />
	<Route component={Error} />
	</Switch>
  </Router>
), document.getElementById('root'));
registerServiceWorker();
