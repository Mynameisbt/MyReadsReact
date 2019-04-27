import React from 'react'
import Book from './Book.js'

class Shelf extends React.Component {

    render() {
        return (
            <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.shelfName}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                        this.props.shelfBooks.map((book) => {
                            return (<li key={book.id}>
                                <Book  book={book}  moveBookFunction={this.props.moveBookFunction}/>
                            </li>)
                        })
                    }
                    </ol>
                  </div>
                </div>
        )
    }
}

export default Shelf;