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

function commentChild(props, item) {
	return <span className='comment-text'>{parseHTML(item.comment_text)}</span>
}

function checkForChild(props, item) {
	const isChild = props.isChild;
	if (isChild) {
		return <ChildComment />;
	}
	else {
		return <Comment />
	}
}

	return (
		<main className="table">
		<button className="back-btn">Back</button>
			{ list.map(item =>

				<div key={item.objectID} className="table-row">
				<div>
				<span className="comment-author">{item.author}</span>
				<checkForChild isChild={false} />
				
				
				</div>
			</div>
			)}
		</main>
		)
}

const Comment = ({ list }) {
	return (
		<span className='comment-text'>
			{parseHTML(item.comment_text)}
		</span>

		)
}

const ChildComment = ({ list }) {
	return (
		<span className='comment-text'>
			{parseHTML(item.comment_text)}
		</span>

		)
}

export default Comments;



