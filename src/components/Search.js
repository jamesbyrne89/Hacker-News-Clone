import React, { Component } from 'react';
import App from './App';


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

export default Search;