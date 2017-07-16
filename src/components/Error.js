import React from 'react';
import {
  Link
} from 'react-router-dom';



const Error = () => {
	console.log('showing error page')
	return (
		<div className="page">
			<header className="site-header">
				<Link className="router-link" to='/'><div id="logo">hn.</div></Link>
			</header>	
			<main className="not-found-wrapper">
			<img className="not-found-image" alt="Scrolling computer code GIF" src="https://media.giphy.com/media/65n8RPEa3r65q/200.gif" />
			<h1 className="not-found-text">Page not found.</h1>
			<Link className="router-link" to='/'><button className="btn back-btn">Home</button></Link>
			</main>
		</div>
		)
}




export default Error;