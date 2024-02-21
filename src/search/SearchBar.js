import "./SearchBar.css";

export default function SearchBar({ contentList, field }) {
  const handleSearch = () => {};

  return (
    <div className="search-bar">
      <input type="text" placeholder="Tell me who you're looking for..." />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
