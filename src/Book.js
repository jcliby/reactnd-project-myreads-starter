import React, { Component } from 'react';
import Changer from './Changer';

class Book extends Component {
  render() {
    const { book, onUpdateBooks } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail})`
            }}
          ></div>
          <Changer book={book} onUpdateBooks={onUpdateBooks} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors.join(' & ')}</div>
      </div>
    );
  }
}

export default Book;
