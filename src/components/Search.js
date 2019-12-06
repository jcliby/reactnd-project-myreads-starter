import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';

function Search(props) {
  const { searchResults, onUpdateBooks, onSearchBooks } = props;

  // Return empty list item for render if search result array is empty
  const renderBooks = () => {
    if (searchResults.length > 0) {
      return searchResults.map(book => (
        <li key={book.id}>
          <Book key={book.id} book={book} onUpdateBooks={onUpdateBooks} />
        </li>
      ));
    } else {
      return <li></li>;
    }
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/">
          <button className="close-search" onClick={() => onSearchBooks('')}>
            Close
          </button>
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={event => onSearchBooks(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">{renderBooks()}</ol>
      </div>
    </div>
  );
}

Search.propTypes = {
  searchResults: PropTypes.array.isRequired,
  onUpdateBooks: PropTypes.func.isRequired,
  onSearchBooks: PropTypes.func.isRequired
};

export default Search;
