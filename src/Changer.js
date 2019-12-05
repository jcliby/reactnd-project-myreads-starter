import React, { Component } from 'react';

class Changer extends Component {
  render() {
    const { book } = this.props;
    return (
      <div className="book-shelf-changer">
        <select defaultValue={book.shelf ? book.shelf : 'none'}>
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
}

export default Changer;
