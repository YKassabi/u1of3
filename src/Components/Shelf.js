import React,{Component} from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book'


class Shelf extends Component{
    // currentShelf = this.props.dataObjByShelf // 'read'
    ShelfBooksArray = this.props.dataObjByShelf // {title:... descriptio;....}
    title = this.props.title // Read

    render(){   
        // console.log('from shelf: ', this.porps.ShelfBooksArray)         
        return (
            <>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title"> {this.title} </h2>
                            <div className="bookshelf-books" key={this.title}>
                                <ol className="books-grid">
                                    {this.ShelfBooksArray.map((book)=>{
                                        return <li key={book.id}>
                                                    <div>{book.shelf}</div>
                                                    <Book 
                                                        book={book}
                                                        currentShelf={book.shelf}
                                                        updateBookShielf={this.props.updateBookShielf}
                                                    />
                                                </li>
                                        
                                    })}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link 
                        to='/addNewBook'
                        className='open-search'
                        onClick={() => this.setState({ showSearchPage: true })}>
                    >
                        Add New Book
                    </Link>
                </div>
            </>
        )
    }
}

Shelf.propTypes = {
    title: PropTypes.string,
    dataObjByShelf: PropTypes.array,
    updateBookShielf: PropTypes.func,
};

export default Shelf;