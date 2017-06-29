import React, { Component } from 'react';
import './App.css';


const DEFAULT_QUERY = '';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

//

let url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;


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
let seconds = "0" + date.getSeconds();

if (hours < 10) {
	hours = "0"+hours;
}
// Will display time in 10:30:23 format
let formattedTime = hours + ':' + minutes.substr(-2);
return formattedTime;
}

// Main App component
class App extends Component {
constructor(props) {
  super(props);
  this.state = {
  	result: null,
  	searchTerm: DEFAULT_QUERY,
  	page: 0,
  };

  this.setSearchTopStories = this.setSearchTopStories.bind(this);
  this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  this.fetchRecentStories = this.fetchRecentStories.bind(this);
  this.onSearchChange = this.onSearchChange.bind(this);
  this.onPageChange = this.onPageChange.bind(this);
  this.onDismiss = this.onDismiss.bind(this);
}

// Sets state on initial load with most recent stories from API call
setRecentStories(result) {
	this.setState({result})
}

setSearchTopStories(result) {
	this.setState({result});
}

// Gets most recent stories from API
fetchRecentStories(page = 0) {
	fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`)
	.then(response => response.json())
	.then((result) => {
		this.setRecentStories(result)
		console.log(result)
	});
}

fetchSearchTopStories(searchTerm) {
	console.log('fetchSearchTopStories')
	fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
	.then(response => response.json())
	.then((result) => {
		this.setSearchTopStories(result)
		console.log(result)
	});
}

componentDidMount() {
	this.fetchRecentStories();
}

onPageChange() {
this.setState({page: this.state.page + 1})
this.fetchRecentStories(this.state.page);
}

onSearchChange(e) {
	console.log('onSearchChange')
this.setState({searchTerm: e.target.value});
}

onDismiss(id) {
  const isNotId = (item) => {
    return item.objectID !== id;
  }

  const updatedList = this.state.list.filter(isNotId);
  this.setState({list: updatedList});
}


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
	      onDismiss={this.onDismiss}
	      />
	      <PageNavigation
	      onClick={this.onPageChange} />
 	</div>
	);
	}
}

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
}

// Page buttons

const PageNavigation = ({onClick}) => {
	return(
	<div className="btn-wrapper">
		<button className="page-nav-btn">Previous</button>
		<button className="page-nav-btn" onClick={onClick}>Next</button>
	</div>
	)
}


// Table and button component

const Table = ({list, pattern, onDismiss}) => {
	let filtered = list.filter(isSearched(pattern));
	function compare(a, b) {
		if (a.created_at_i < b.created_at_i)
			return -1;
		if (a.created_at_i > b.created_at_i)
			return 1;
		return 0;
	}

	return (
					<main className="table">
			{ 
				
				filtered.map(item =>
				<div key={item.objectID} className="table-row">
					<a href={item.url}>{item.title}</a>
				<div>
				<span>{item.author}</span>
				<span>{item.num_comments}</span>
				<span>{item.points}</span>
				<span>{item.created_at.substr(0,10)} {convertUnixTime(item.created_at_i)}</span>
				</div>
			</div>
			)}
			</main>
	)
}


export default App;
