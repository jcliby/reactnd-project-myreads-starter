import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

function Shelf(props) {
  const { shelf, books, onUpdateBooks } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books
            .filter(book => book.shelf === shelf.shelfName)
            .map(book => (
              <li key={book.id}>
                <Book key={book.id} book={book} onUpdateBooks={onUpdateBooks} />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
}

Shelf.propTypes = {
  shelf: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  onUpdateBooks: PropTypes.func.isRequired
};

export default Shelf;
