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
    BooksAPI.update(book, shelf);

    const index = this.state.books.findIndex(
      currBook => currBook.id === book.id
    );

    if (index === -1) {
      this.setState(prevState => ({
        books: [...prevState.books, { ...book, shelf: shelf }]
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

  handleSearchBooks = query => {
    if (query !== '') {
      BooksAPI.search(query).then(results => {
        if (results.length > 0) {
          this.state.books.forEach(b => {
            const index = results.findIndex(result => result.id === b.id);

            if (index !== -1) {
              results[index].shelf = b.shelf;
            }
          });
        }
        this.setState({ searchResults: results });
      });
    } else {
      this.setState({ searchResults: [] });
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
              onSearchBooks={this.handleSearchBooks}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
