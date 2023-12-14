import React, { useState } from "react";
import CategoryModal from "./CategoryModal";
import toast from 'react-hot-toast'
import "../styles/SearchBar.css";

const SearchBar = ({ setEvents }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const [showModal, setShowModal] = useState(false);

  const addCategory = (category) => {
    if (!selectedCategories.includes(category)) {
        if(category.match(/^[0-9a-z]+$/)){
            if (selectedCategories.length < 5) {
                setSelectedCategories([...selectedCategories, category]);
              } else {
                alert("You can only choose 5 filters at a time");
              }
        }else{
            toast.error("Only alphanumeric characters")
        }
      
    }
  };

  const removeCategory = (category) => {
    setSelectedCategories(selectedCategories.filter((c) => c !== category));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryString = selectedCategories.join(",");
    const queryParams = `search=${searchText}&categories=${categoryString}`;

    fetch(`/events?${queryParams}`)
      .then((resp) => resp.json())
      .then((data) => {
        setEvents(data);
      });
  };

  const toggleModal = () => {
    if (!showModal) {
      // eslint-disable-next-line no-undef
      const modal = new bootstrap.Modal(document.getElementById("categoryModal"));
      modal.show();
    }
    setShowModal(!showModal);
  };

  return (
    <form className="input-group mb-3 d-flex" onSubmit={handleSubmit}>
      <input
        type="search"
        className="form-control"
        placeholder="Search in title, description, and location"
        aria-label="Search"
        aria-describedby="search-button"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        style={{
          border: "1px solid black",
          borderRadius: "0px",
          boxShadow: "none",
          textAlign: "center",
        }}
      />
      <div className="input-group-append d-flex">
        <button
          className="btn"
          type="submit" 
          id="search-button"
          style={{ borderRadius: "0px", border: "1px solid black" }}
        >
          Search
        </button>
        <button
          onClick={() => toggleModal()}
          className="btn ml-2" 
        >
          Filter
        </button>
      </div>

      <CategoryModal
        showModal={showModal}
        toggleModal={toggleModal}
        selectedCategories={selectedCategories}
        addCategory={addCategory}
        removeCategory={removeCategory}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
      />
    </form>
  );
};

export default SearchBar;
