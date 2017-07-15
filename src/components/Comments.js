import React, { Component } from 'react';
import { Link } from 'react-router-dom';


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

this.fetchComments = this.fetchComments.bind(this);
this.setStories = this.setStories.bind(this);
}

setStories(result) {
this.setState({result})
}	

	fetchComments(story) {
	fetch(`http://hn.algolia.com/api/v1/search?tags=comment,story_${story}&hitsPerPage=50`)
	.then(response => response.json())
	.then((result) => {
		this.setState({result});
	});
};

onSearchChange(e) {
this.setState({searchTerm: e.target.value});
};

componentDidMount() {
	this.fetchComments(this.props.location.state.id);
}


	render() {

		let result = this.state.result;

		 if (!result) { return null; }
	return (
		<div className="page">
			<header className="site-header">
				<Link className="router-link" to='/'><div id="logo">hn.</div></Link>
			</header>	
			<CommentsTable list={result.hits}/>
		</div>
		)
	}
}


const CommentsTable = ({list}) => {

return (
		<main className="table">
					
			<Link className="router-link" to='/'><button className="back-btn">Back</button></Link>
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