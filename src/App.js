import React from 'react';
import Search from './Search';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';
import Shelves from './Shelves';

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  }

  updateBooks(book, shelf) {
    BooksAPI.update(book, shelf);

    const index = this.state.books.findIndex(
      currBook => currBook.id === book.id
    );

    if (index === -1) {
      this.setState(prevState => ({
        books: [...prevState, { ...book, shelf: shelf }]
      }));
    }

    if (index !== -1) {
      this.setState(prevState => ({
        books: [
          ...prevState.slice(0, index),
          { ...book, shelf: shelf },
          ...prevState.slice(index + 1)
        ]
      }));
    }
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <Shelves
              books={this.state.books}
              onUpdateBooks={this.updateBooks}
            />
          )}
        />
        <Route
          exact
          path="/search"
          render={() => (
            <Search
              books={this.state.books}
              searchResults={this.state.searchResults}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
