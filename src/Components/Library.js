import React from 'react';
import Shelf from './Shelf';
import PropTypes from 'prop-types';
import {
    Link
} from 'react-router-dom';



const Library = ({allShelfs, updateBookShielf}) => {


        return <>
                {Object.entries(allShelfs).map(([k, v])=>{
                    return<div className="list-books-content" key={k}>
                                <div>
                                    <Shelf 
                                        shelfName={k}
                                        books={v}
                                        updateBookShielf={updateBookShielf}
                                    />
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
    allShelfs: PropTypes.object,
    updateBookShielf: PropTypes.func,
};
export default Library;