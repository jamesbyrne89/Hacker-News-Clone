import React from 'react';
import {
  Link
} from 'react-router-dom';



const Error = () => {
	return (
		<div className="page">
			<header className="site-header">
				<Link className="router-link" to='/'><div id="logo">hn.</div></Link>
			</header>	
			<Error />
		</div>
		)
}




export default Error;