import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book'


const Shelf = ({shelfName, books,updateBookShielf}) => {
    console.log(books)

    // generating the appropriete title
    shelfName = shelfName === 'read' ? 'Read' : (shelfName === 'wantToRead' ? 'Want To Read' : 'Currently Reading');

    return(
        <div>
            <div className="bookshelf">
                <h2 className="bookshelf-title"> {shelfName} </h2>
                <div className="bookshelf-books" >
                    <ol className="books-grid">
                        { books.map((book)=>{
                            return <li key={book.id}>
                                        <div>{book.shelf}</div>
                                        <Book 
                                            book={book}
                                            currentShelf={book.shelf}
                                            updateBookShielf={updateBookShielf}
                                        />
                                    </li>
                            
                        })}
                    </ol>
                </div>
            </div>
        </div>
    )
}

Shelf.propTypes = {
    shelfName: PropTypes.string,
    books: PropTypes.array,
    updateBookShielf: PropTypes.func,
};

export default Shelf;