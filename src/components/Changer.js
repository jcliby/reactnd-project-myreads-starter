import React from 'react';
import PropTypes from 'prop-types';

function Changer(props) {
  const { book, onUpdateBooks } = props;

  return (
    <div className="book-shelf-changer">
      <select
        defaultValue={book.shelf ? book.shelf : 'none'}
        onChange={event => onUpdateBooks(book, event.target.value)}
      >
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
}

Changer.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateBooks: PropTypes.func.isRequired
};

export default Changer;
