import React, { Component } from 'react';
import './App.css';


const DEFAULT_QUERY = '';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

let url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

function isSearched (searchTerm) {
  return function(item) {
    return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
  };
};

// Main App component
class App extends Component {
constructor(props) {
  super(props);
  this.state = {
  	result: null,
  	searchTerm: DEFAULT_QUERY,
  };

  this.setSearchTopStories = this.setSearchTopStories.bind(this);
  this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  this.onSearchChange = this.onSearchChange.bind(this);
  this.onDismiss = this.onDismiss.bind(this);
}

setSearchTopStories(result) {
	this.setState({result});
}

fetchSearchTopStories(searchTerm) {
	fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
	.then(response => response.json())
	.then((result) => {
		this.setSearchTopStories(result)
		console.log(result)
	});
}

componentDidMount() {
	const { searchTerm } = this.state;
	this.fetchSearchTopStories(searchTerm);
}

onSearchChange(e) {
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

 	</div>
	);
	}
}

// Search component

const Search = ({ value, onChange, children }) => {
	return (
	<header className="site-header">
		<form>
			{children} <input
			type="text"
			value={value}
			className="search-bar"
			onChange={onChange}
			/>
		</form>
	</header>		
	);
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

	console.log(filtered.sort(compare))
	return (
					<main className="table">
			{ 
				
				filtered.map(item =>
				<div key={item.objectID} className="table-row">
				<span>
					<a href={item.url}>{item.title}</a>
				</span>
				<span>{item.author}</span>
				<span>{item.num_comments}</span>
				<span>{item.points}</span>
				<span>{item.created_at_i}</span>
				<span>
					<button
						onClick={() => onDismiss(item.objectID)}
						type="button"
						className="button-inline"
					>
						Dismiss
					</button>
				</span>
			</div>
			)}
			</main>
	)
}


export default App;
