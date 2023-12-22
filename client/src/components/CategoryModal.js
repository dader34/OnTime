import React from "react";
import "../styles/SearchBar.css";

const CategoryModal = ({ showModal, toggleModal, selectedCategories, addCategory, removeCategory, newCategory, setNewCategory }) => {
    return (
        <div
            className={`modal ${showModal ? "show" : ""}`}
            id="categoryModal"
            tabIndex="-1"
            aria-labelledby="categoryModalLabel"
            aria-hidden={!showModal}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="categoryModalLabel">
                            Filter By Category
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={toggleModal}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {/* Modal content here */}
                        <div>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Category name"
                                    aria-label="Category name"
                                    aria-describedby="add-category-button"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <button
                                        style={{ height: '100%' }}
                                        className="btn btn-primary"
                                        type="button"
                                        id="add-category-button"
                                        onClick={() => {
                                            if (newCategory) {
                                                addCategory(newCategory);
                                                setNewCategory("");
                                            }
                                        }}
                                    >
                                        +
                                    </button>
                                </div>

                            </div>
                            {selectedCategories.map((category) => (
                                <span key={category} className="badge badge-primary m-1">
                                    {category}
                                    <button
                                        type="button"
                                        className="close btn"
                                        onClick={() => removeCategory(category)}
                                    >
                                        &times;
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;
