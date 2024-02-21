import React, { useState } from 'react';
import "./SearchBar.css";

export default function SearchBar({ onSearchSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      handleSearch();
    }
  }

  const handleSearch = () => {
    console.log(inputValue);
    // search through contentList for matching content
    onSearchSubmit(inputValue);
  };

  return (
    <div className="search-bar">
      <input type="text" placeholder="Tell me who you're looking for..." onChange={handleInputChange} onKeyPress={handleKeyPress}/>
      <button onClick={handleSearch}>Search 🚀</button>
    </div>
  );
}
