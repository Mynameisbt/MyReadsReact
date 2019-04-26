import React from 'react'
 import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf';
import BookSearch from './BookSearch';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: [],
    searchResults: []
  }

  getAllBooks =() => {
    BooksAPI.getAll().then( (result) => {
      console.log(result);
      this.setState((prevState) => (
        {
          currentlyReadingBooks: result.filter((book) => book.shelf === "currentlyReading"),
          wantToReadBooks: result.filter((book) => book.shelf === "wantToRead"),
          readBooks: result.filter((book) => book.shelf === "read")
        }
      ));
    })
  }

  search = (searchTerm) => {
    console.log("Searching " + searchTerm);
    BooksAPI.search(searchTerm).then((result) => {
      console.log(result);
      if (result instanceof Array) {
        result.map((currentBook) => {
          if (this.state.currentlyReadingBooks.filter((book) => (book.id === currentBook.id)).length > 0) {
            currentBook.shelf = "currentlyReading";
          } else if (this.state.wantToReadBooks.filter((book) => (book.id === currentBook.id)).length > 0) {
            currentBook.shelf = "wantToRead";
          } else if (this.state.readBooks.filter((book) => (book.id === currentBook.id)).length > 0) {
            currentBook.shelf = "read";
          }
          return null;
        });
        this.setState((prevState) => (
          {
            searchResults: result
          }
        ));
      } else {
        this.setState((prevState) => (
          {
            searchResults: []
          }
        ));
      }
        
    });
  }



  updateBookShelf = (book, newShelf) => {
    this.setState((prevState) => {
      let newState = {};
      let oldBookShelf = book.shelf+"Books";
      let newBookShelf = newShelf+"Books";
      newState[oldBookShelf] = prevState[oldBookShelf].filter((b) => (b.id !== book.id));
      book.shelf = newShelf;
      newState[newBookShelf] = prevState[newBookShelf];
      newState[newBookShelf].push(book);
      return newState;
    });

    BooksAPI.update(book, newShelf);
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <BookSearch searchFunction={this.search} searchResults={this.state.searchResults} moveBookFunction={this.updateBookShelf}/>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <button onClick={() => this.getAllBooks()}>Get ALL</button>
            <div className="list-books-content">
              <div>
                <Shelf shelfName="Currently Reading" shelfBooks={this.state.currentlyReadingBooks} moveBookFunction={this.updateBookShelf}/>
                <Shelf shelfName="Want To Read" shelfBooks={this.state.wantToReadBooks}  moveBookFunction={this.updateBookShelf}/>
                <Shelf shelfName="Read" shelfBooks={this.state.readBooks}  moveBookFunction={this.updateBookShelf}/>                  
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
