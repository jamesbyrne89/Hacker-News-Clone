import React, { Component } from 'react';
//import Comments from './Comments';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


const DEFAULT_QUERY = '';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const DEFAULT_PAGE = 0;

// let url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;


function isSearched (searchTerm) {
  return function(item) {
    return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
  };
};

function convertUnixTime(unix) {
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
let date = new Date(unix*1000);
// Hours part from the timestamp
let hours = date.getHours();
// Minutes part from the timestamp
let minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
// let seconds = "0" + date.getSeconds();

if (hours < 10) {
	hours = "0"+hours;
}
// Will display time in 10:30:23 format
let formattedTime = hours + ':' + minutes.substr(-2);
return formattedTime;
}

// Extracts hostname from URL
const getHostname = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l.hostname;
};

const parseHTML = function(html) {
    var el = document.createElement('div');
    el.innerHTML = html;
    return el.textContent;
}



// Main App component
class App extends Component {
constructor(props) {
  super(props);
  this.state = {
  	view: 'stories',
  	comments: null,
  	result: null,
  	searchTerm: DEFAULT_QUERY,
  	page: 0,
  };

  this.setStories = this.setStories.bind(this);
  this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  this.fetchRecentStories = this.fetchRecentStories.bind(this);
  this.onSearchChange = this.onSearchChange.bind(this);
  this.onPageChange = this.onPageChange.bind(this);
};


// Updates result of fetch
setStories(result) {
	this.setState({result});
};


showComments(e) {
	const id = e.target.getAttribute('data-id');
	this.setState({view: 'comments'});
	this.fetchComments(id);
};

// Gets most recent stories from API
fetchRecentStories(page = 0) {
	fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=points>=25&page=${page}`)
	.then(response => response.json())
	.then((result) => {
		this.setStories(result)
		console.log(result)
	});
};

fetchSearchTopStories(searchTerm) {

	fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
	.then(response => response.json())
	.then((result) => {
		this.setStories(result);
	});
};


componentDidMount() {
	this.fetchRecentStories();
};

onPageChange(e) {
const prevBtn = document.getElementById('prev-page-btn');
const nextBtn = document.getElementById('next-page-btn');
console.log(this.state.page)
if (e.target === nextBtn && this.state.page >= 0 ) {
	this.setState({page: this.state.page + 1})
	this.fetchRecentStories(this.state.page + 1)	
}
else if (e.target === prevBtn && this.state.page > 0) {
	this.setState({page: this.state.page - 1})
	this.fetchRecentStories(this.state.page - 1)		
}
};

onSearchChange(e) {
this.setState({searchTerm: e.target.value});
};

  render() {
     const { searchTerm, result } = this.state;

     if (!result) { return null; }
    return (
      <div className="page">

	      <Search
	      value={searchTerm}
	      onChange={this.onSearchChange}/>
	      
	      <Table 
	      list={result.hits}
	      pattern={searchTerm}
	      />

	      <PageNavigation
	      onClick={this.onPageChange} />
 	</div>
	);
	}
};


// Search component
const Search = ({ value, onChange, children }) => {
	return (
	<header className="site-header">
	<div id="logo">hn.</div>
		<form>
			{children} <input
			type="text"
			value={value}
			placeholder="Search"
			className="search-bar"
			onChange={onChange}
			/>
		</form>
	</header>		
	);
};

// Page buttons

const PageNavigation = ({onClick}) => {
	return(
	<div className="btn-wrapper">
		<button id="prev-page-btn" className="page-nav-btn" onClick={onClick}>Previous</button>
		<button id="next-page-btn" className="page-nav-btn" onClick={onClick}>Next</button>
	</div>
	)
};





// Table and button component

const Table = ({list, pattern, showComments}) => {

	let filtered = list.filter(isSearched(pattern));
	return (
					<main className="table">
					<div className="table__header">
					<div className="post-info-wrapper">
						<span className="author-header">Posted by</span>
						<span className="comments-header">Comments</span>
						<span className="points-header">Points</span>
						<span className="timestamp-header">Posted at</span>
						</div>
					</div>
			{ 
				
				filtered.map(item =>
				<div key={item.objectID} className="table-row">
					<div className="article-title-wrapper">
						<a href={item.url}>{item.title}</a>
						<span className="article-url">{getHostname(item.url)}</span>
					</div>
				<div className="post-info-wrapper">
				<span className="author">{item.author}</span>
				<Router>
				<span className="comments" data-id={item.objectID} onClick={showComments}>
					<Link to={'/comments:id=' + item.objectID}>Comments: {item.num_comments}</Link>
					<Route path={'/comments:id=' + item.objectID} component={Comments}/>
				</span>
				</Router>
				<span className ="points">+{item.points}</span>
				<span>{item.created_at.substr(0,10)} {convertUnixTime(item.created_at_i)}</span>
				</div>
			</div>
			)}
			</main>
	)
};


class Comments extends Component {
constructor(props) {
  super(props);
	
  this.state = {
  	result: null,
  };

}	

	fetchComments(story) {
	console.log('fetching comments')
	fetch(`http://hn.algolia.com/api/v1/search?tags=comment,story_${story}&hitsPerPage=50`)
	.then(response => response.json())
	.then((result) => {
		this.setState({result});
		console.log(this.state)
	});
};

componentDidMount() {
	this.fetchComments()
}


	render() {




	return (

	      <div className="page">
 
		<main className="table">
		<button className="back-btn">Back</button>
		
		</main>
		</div>	
		)
	}
}






export default App;
