import React, { useState } from "react";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="input-group mb-3">
      <input
        type="search"
        className="form-control"
        placeholder="Search in title, description, and location"
        aria-label="Search"
        aria-describedby="search-button"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        style={{border: '1px solid black', borderRadius: '0px',boxShadow: "none", textAlign:'center'}}
      />
      <div className="input-group-append">
        <button
          className="btn"
          type="button"
          id="search-button"
          style={{borderRadius:'0px', border: '1px solid black'}}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
