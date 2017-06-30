import React, { Component } from 'react';


const parseHTML = function(html) {
    var el = document.createElement('div');
    el.innerHTML = html;
    return el.textContent;
}

// Comment thread
// 
class Comments extends Component {


render() {
	console.log(this.props.list)
	return (
		<AllComments list={this.props.list}/>
		)
	}
}

const AllComments = ({ list }) => {
	return (
		<main className="table">
		<button className="back-btn">Back</button>
			{ list.map(item =>

				<div key={item.objectID} className="table-row">
				<div>
				<span className="comment-author">{item.author}</span>
				<span className='comment-text'>{parseHTML(item.comment_text)}</span>
				
				</div>
			</div>
			)}
		</main>
		)
}

export default Comments;



