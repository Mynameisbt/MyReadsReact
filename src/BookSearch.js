import React from 'react'
import './App.css'
import Book from './Book.js'
import { Link } from 'react-router-dom';

class BookSearch extends React.Component {
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" placeholder="Search by title or author" onChange={ (event) => ( this.props.searchFunction(event.target.value)) }/>

                </div>
                </div>
                <div className="search-books-results">
                <ol className="books-grid">
                {
                    this.props.searchResults.map((book) => {
                        return (<li>
                            <Book book={book}  moveBookFunction={this.props.moveBookFunction}/>
                        </li>)
                    })
                }
                </ol>
                </div>
            </div>
        )
    }
}

export default BookSearch;