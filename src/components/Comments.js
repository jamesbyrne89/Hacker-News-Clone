import React, { Component } from 'react';


const parseHTML = function(html) {
    var el = document.createElement('div');
    el.innerHTML = html;
    return el.textContent;
}

// Comment thread
// 
class Comments extends Component {
constructor(props) {
super(props)

this.state = {
	result: null,
	}


this.fetchComments = this.fetchComments.bind(this);
this.setStories = this.setStories.bind(this);
}




// Updates result of fetch
setStories(result) {
	this.setState({result});
	console.log(this.state)
};

fetchComments(page = 0) {
	fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=points>=25&page=${page}`)
  	.then(response => response.json())
  	.then((result) => {
  		this.setState(result)
  		console.log(result)
  	});
};

componentWillMount() {
	console.log('comments will mount')
	this.fetchComments();
	console.log('comments will mount')
}

render() {
	console.log(this.state)
let list = this.state.list;

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

}

export default Comments;



