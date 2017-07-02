import React, { Component } from 'react';
import Search from './App';

const parseHTML = function(html) {
    var el = document.createElement('div');
    el.innerHTML = html;
    return el.textContent;
}

// Comment thread
// 
class Comments extends Component {
constructor(props) {
  super(props);
  this.state = {
  	result: null,
  };

  this.setStories = this.setStories.bind(this);
  this.fetchComments = this.fetchComments.bind(this);
};

// Updates result of fetch
setStories(result) {
	this.setState({result});
};

fetchComments(story) {
	console.log('fetching comments')
	fetch(`http://hn.algolia.com/api/v1/search?tags=comment,story_${story}&hitsPerPage=50`)
	.then(response => response.json())
	.then((result) => {
		this.setComments(result)
	});
};


componentWillMount() {
	console.log('comments will mount')
	this.fetchComments();
};

render() {
	console.log('rendering')
	this.fetchComments();
	return (
		<div className="page">
		<Search
	      value={this.props.searchTerm}
	      onChange={this.onSearchChange}/>

		<AllComments list={this.props.list}/>
		</div>
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