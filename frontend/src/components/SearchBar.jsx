import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchTerm, onSearchChange, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-btn">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;
