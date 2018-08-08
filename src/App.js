import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookDisplay from './BookDisplay'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
          book.shelf = shelf
          this.setState(state => ({
            books: state.books.filter(b => b.id !== book.id).concat(book)
          }))
    })
}
    componentDidMount() {
      BooksAPI.getAll().then((books) => {
        this.setState({ books: books })
      })
    }


  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() =>
          <BookDisplay books={this.state.books} onChange={this.updateBook}/>}/>

        <Route exact path="/search" render={({history}) =>
        (<BookSearch onChange={this.updateBook} history={history}/>)}/>
      </div>
    )
  }
}

export default BooksApp
