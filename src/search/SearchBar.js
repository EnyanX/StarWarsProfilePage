import React, { useState } from 'react';
import "./SearchBar.css";

export default function SearchBar({ contentList, field }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleSearch = () => {
    console.log(inputValue);
    // search through contentList for matching content
    
  };

  return (
    <div className="search-bar">
      <input type="text" placeholder="Tell me who you're looking for..." onChange={handleInputChange}/>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
