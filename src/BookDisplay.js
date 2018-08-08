import React, {Component} from 'react'
import BookShelf from './BookShelf'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'

class BookDisplay extends Component {

  render() {
    let books = this.props.books

    return (
      <div className="list-books-title">
        <div className="list-books-content">
          <div>
            <BookShelf books={books.filter((book) => (book.shelf === "currentlyReading"))} title="Currently Reading" onChangeShelf={this.props.onChange}/>
            <BookShelf books={books.filter((book) => (book.shelf === "read"))} title="Read" onChangeShelf={this.props.onChange}/>
            <BookShelf books={books.filter((book) => (book.shelf === "wantToRead"))} title="Want to Read" onChangeShelf={this.props.onChange}/>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'></Link>
        </div>
      </div>
    )
  }
}
export default BookDisplay;
