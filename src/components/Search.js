import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';

class Search extends Component {
  static propTypes = {
    searchResults: PropTypes.array.isRequired,
    onUpdateBooks: PropTypes.func.isRequired,
    onSearchBooks: PropTypes.func.isRequired
  };

  render() {
    const { searchResults, onUpdateBooks, onSearchBooks } = this.props;

    // Return empty list item for render if search result array is empty
    const renderBook = () => {
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
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={event => onSearchBooks(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{renderBook()}</ol>
        </div>
      </div>
    );
  }
}

export default Search;
