import React from 'react'
// import {Link} from 'react-router-dom';
import BookDetailButton from './BookDetailButton';
import PropTypes from 'prop-types';

const Book = ({ book , currentShelf, updateBookShielf }) => {
        return (
            <>
                <li key={book.id}>
                    <div>{book.id}
                    </div>
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <BookDetailButton 
                            book={book}
                            shelf={currentShelf}
                            updateBookShielf = {updateBookShielf}
                            />
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-title">{book.shelf}</div>
                        <div className="book-authors">{book.authors}</div>
                    </div>
                </li>
            </>
        )
        }

Book.propTypes = {
    Book: PropTypes.object,
    currentShelf: PropTypes.string,
    updateBookShielf: PropTypes.func
};
export default Book;


//   optionalArray: PropTypes.array,
//       optionalBool: PropTypes.bool,
//       optionalFunc: PropTypes.func,
//       optionalNumber: PropTypes.number,
//       optionalObject: PropTypes.object,
//       optionalString: PropTypes.string,
//       optionalSymbol: PropTypes.symbol,
