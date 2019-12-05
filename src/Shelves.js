import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shelf from './Shelf';

class Shelves extends Component {
  render() {
    const { books } = this.props;

    const shelves = [
      {
        shelfName: 'currentlyReading',
        title: 'Currently Reading'
      },
      {
        shelfName: 'wantToRead',
        title: 'Want To Read'
      },
      {
        shelfName: 'read',
        title: 'Read'
      }
    ];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map(shelf => (
              <Shelf key={shelf.shelfName} shelf={shelf} books={books} />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Shelves;
