import React from 'react';
import PropTypes from 'prop-types';
import Changer from './Changer';

function Book(props) {
  const { book, onUpdateBooks } = props;

  // Return blank string for render if image property is not available
  const renderImage = () => {
    if (!book.imageLinks) {
      return '';
    }

    if (book.imageLinks.thumbnail) {
      return `url(${book.imageLinks.thumbnail})`;
    }
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: renderImage()
          }}
        ></div>
        <Changer book={book} onUpdateBooks={onUpdateBooks} />
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
        {Array.isArray(book.authors) && book.authors.join(' & ')}
      </div>
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateBooks: PropTypes.func.isRequired
};

export default Book;
