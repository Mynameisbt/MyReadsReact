import React from 'react'
 import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf';

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
    readBooks: []
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
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
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
