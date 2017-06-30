import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {Router, Route} from 'react-router';

const Main = () => {
		<Router>
			<Route path='/hackernews'>{App}</Route>
		</Router>
}

export default Main;