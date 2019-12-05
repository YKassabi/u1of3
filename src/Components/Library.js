import React from 'react';
import Shelf from './Shelf';
import Book from './Book';
import PropTypes from 'prop-types';
import {
    Link
} from 'react-router-dom';



const Library = (props) => {
    const allShelfs = props.AllShelfs;
    const {read, currentlyReading, wantToRead} = props.AllShelfs;
    const read1 = props.AllShelfs.read;
    const wantToRead1 = props.AllShelfs.wantToRead;
    const currentlyReading1 = props.AllShelfs.currentlyReading;
        console.log('these are all shielfs All Shelf: ',  allShelfs)
        console.log('these are all shielfs READ: ',  read)
        console.log('these are all shielfs Currently Reading: ',  currentlyReading)

        return <>
            {Object.entries(allShelfs).map(([k, v])=>{
                console.log( k, v )
                return<div className="list-books-content">
                            <div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">... {k}...</h2>
                                    <div className="bookshelf-books" >
                                        <ol className="books-grid">
                                            { v.map((book)=>{
                                                return <li key={book.id}>
                                                            <div>{book.shelf}</div>
                                                            <Book 
                                                                book={book}
                                                                currentShelf={book.shelf}
                                                                updateBookShielf={props.updateBookShielf}
                                                            />
                                                        </li>
                                                
                                            })}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
            })}
                            <div className="open-search">
                    <Link 
                        to='/addNewBook'
                        className='open-search'
                    >
                        Add New Book
                    </Link>
                </div>

            </>
}


Library.propTypes = {
    dataObjByShelf: PropTypes.array,
    updateBookShielf: PropTypes.func,
};
export default Library;