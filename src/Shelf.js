import React, { Component } from 'react';
import Book from './Book';

class Shelf extends Component {
  render() {
    const { shelf, books } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books
              .filter(book => book.shelf === shelf.shelfName)
              .map(book => (
                <li key={book.id}>
                  <Book key={book.id} book={book} />
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;
