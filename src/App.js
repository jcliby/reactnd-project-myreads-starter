import React from 'react';
import Search from './components/Search';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';
import Shelves from './components/Shelves';

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
    // Update state with update book— remove updated book from array and re-add if already exists
    this.setState(prevState => ({
      books: prevState.books
        .filter(b => b.id !== book.id)
        .concat(Object.assign(book, { shelf: shelf }))
    }));
  };

  handleSearchBooks = query => {
    if (query !== '') {
      BooksAPI.search(query.trim()).then(results => {
        // Determine if any results are returned from API
        if (Array.isArray(results) && results.length > 0) {
          // For each book returned from search— compare against current state.books to ensure search results shelf prop is up to date
          this.state.books.forEach(b => {
            const index = results.findIndex(result => result.id === b.id);
            if (index !== -1) {
              results[index].shelf = b.shelf;
            }
          });
          this.setState({ searchResults: results });
        } else {
          this.setState({ searchResults: [] });
        }
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
