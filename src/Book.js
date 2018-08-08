
import { PropTypes } from 'prop-types'
import React, { Component } from 'react'

class Book extends Component {

  booktoShelf = (event) => {
    this.props.onUpdate(event.target.value)
  }

  render() {
    let book = this.props.book
    return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              width: 128, height: 193,
              backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : null})` }
            }></div>
            <div className="book-shelf-changer">
              <select onChange={ this.booktoShelf } value={ book.shelf }>
                <option value="move" disabled>Move to...</option>
                <option value="none">None</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="read">Read</option>
                <option value="wantToRead">Want to Read</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
        </div>
    )
  }


}

export default Book;
