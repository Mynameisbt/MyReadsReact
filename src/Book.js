import React from 'react'
import './App.css'
import logo from './icons/icons8-help.svg'; 


class Book extends React.Component {
    updateShelf = (book, newValue) => {
        this.props.moveBookFunction(book, newValue);
    }

    render() {
        let bookCover = null;
        if (this.props.book.imageLinks) {
            bookCover = <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.book.imageLinks.thumbnail}`}}></div>
        } else {
            bookCover =  <div className="book-cover"><img src={logo} style={{ width: 128, height: 163}} alt="No thumbnail available"/><a href="https://icons8.com/icons">by Icons8</a></div>
        }
        return (
        <div className="book">
            <div className="book-top">
                {
                    bookCover
                }
                <div className="book-shelf-changer">
                <select defaultValue={this.props.book.shelf? this.props.book.shelf: 'none'} onChange={(event) => (this.updateShelf(this.props.book, event.target.value)) }>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading" >Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
                </div>
            </div>
            <div className="book-title">{this.props.book.title}</div>
            <div className="book-authors">{this.props.book.authors? this.props.book.authors.join(', '): ''}</div>
        </div>
        )
    }
}

export default Book;