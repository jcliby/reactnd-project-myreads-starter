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

  handleUpdateBooks = (book, shelf) => {
    // BooksAPI.update(book, shelf);

    const index = this.state.books.findIndex(
      currBook => currBook.id === book.id
    );

    console.log(index);

    if (index === -1) {
      this.setState(prevState => ({
        books: [...prevState, { ...book, shelf: shelf }]
      }));
    }

    if (index !== -1) {
      this.setState(prevState => ({
        books: prevState.books.map(b =>
          b.id === book.id ? Object.assign(b, { shelf: shelf }) : b
        )
      }));
    }
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <Shelves
              books={this.state.books}
              onUpdateBooks={this.handleUpdateBooks}
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
              onUpdateBooks={this.handleUpdateBooks}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
