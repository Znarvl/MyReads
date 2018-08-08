import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { PropTypes } from 'prop-types'
import Book from './Book'
import App from './App'
import React, {Component} from 'react'
import _ from 'lodash'


class BookSearch extends Component {
  state = {
    books: [],
    changes: ''
  }
  addBook = (book, shelf) => {
    this.props.onChange(book, shelf)
    this.props.history.push('/')
  }

  fixChange = (event) => {
    let eValue = event.target.value
    this.setState(() => {
      return {changes: eValue}

    })
    this.searchBooks(eValue)
  }

  clearBooks = () => {
    this.setState({books: [], changes: ''})

  }

  noBooks = _.debounce((changes) => {
      BooksAPI.search(changes).then(booksResponse => {
        if (booksResponse.error) {
          return this.setState({books: []});
        }
      })
    })



  findBooks = (i) => {
    BooksAPI.search(i,30).then((books) => {
     if(!!books){
       if(books.length>0){
         const results = books.map((book) => {
           const existingBook = this.state.books.find((b) => b.id === book.id)
           book.shelf = !!existingBook ? existingBook.shelf : 'none'
           return book
         });
         this.setState({  books:books.filter((book) => (books)) })
       }
     }
   })
 }





  searchBooks = (value) => {
    if (value.length !== 0) {
      this.findBooks(value);
      this.noBooks(value);

    }
    else {
      this.clearBooks()

    }
  }


  bookGrid = () => {
    return (
         <div className="books-grid">
      {this.state.changes.length > 0 && this.state.books.map((book, index) =>
        (<Book book={ book } key={ index } onUpdate={(shelf) => {
        this.addBook(book, shelf)
      }}/>))}
        </div>

    )
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Libary" value={ this.state.changes } onChange={ this.fixChange }/>
          </div>
        </div>
        <div className="search-books-results">
          {this.bookGrid()}
        </div>
      </div>
    )
  }

}


export default BookSearch;
