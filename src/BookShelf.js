import React, { Component } from 'react'
import Book from './Book'
import {PropTypes} from 'prop-types'

class BookShelf extends Component {

  updateShelf = (book, shelf) => {
    this.props.onChangeShelf(book, shelf)
  }

  render() {
    let books = this.props.books
    return (
      <div className="bookshelf">
        <h3 className="bookshelf-title">{ this.props.title }</h3>
        <div className="bookshelf-books">
          <li className="books-grid">
          {books.map((book, i) => (<Book book={ book } key={ i } onUpdate={(shelf) => {
            this.updateShelf(book, shelf)
          }}/>))}
          </li>
        </div>
      </div>
    )
  }


}

export default BookShelf;
