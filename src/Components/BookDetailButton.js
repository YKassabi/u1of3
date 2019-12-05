import React from 'react';
// import * as BooksAPI from '../BooksAPI'

const BookDetailButton = ({shelf, updateBookShielf, book}) => {
    return (
        <div className="book-shelf-changer">
            <select value={ shelf || ''} onChange={(e)=>updateBookShielf(book, e.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    )

}

export default BookDetailButton

