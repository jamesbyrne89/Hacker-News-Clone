import React, { Component } from 'react';
import App from './App';




// Comment thread
// 
class Comments extends Component {
constructor(props) {
super(props);

}


render() {
	return (
		<AllComments />
		)
}
}

const AllComments = ({ list }) => {
	console.log('list: ', list)
	return (
			<main className="table">

				<div className="table-row">
					<div className="article-title-wrapper">{list}Comments will be displayed here
						<span className="article-url"></span>
					</div>
				<div>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				</div>
			</div>
			</main>
		)
}

export default Comments;