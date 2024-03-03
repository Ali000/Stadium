const Search = ({ onSubmit, searchRef }) => {
  return (
    <form className="search" onSubmit={onSubmit}>
      <input
        className="searchTerm"
        type="text"
        ref={searchRef}
        placeholder="Search"
      />
      <button className="searchButton" type="submit">
        Search
      </button>
    </form>
  )
}

export default Search
