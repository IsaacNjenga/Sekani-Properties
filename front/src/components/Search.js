import React from "react";

function Search({ onSearchChange, dataSource }) {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowercase();
    setSearch(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };
  return <div>Search</div>;
}

export default Search;
