import React,{Component} from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book'


class Shelf extends Component{
    currentShelf = this.props.dataObjByShelf[0] // 'read'
    ShelfBooksArray = this.props.dataObjByShelf[1] // {title:... descriptio;....}
    title = this.props.title // Read

    render(){            
        return (
            <>
            <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                    <h2 className="bookshelf-title"> {this.title} </h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                        {this.ShelfBooksArray.map((book)=>{
                            return <Book 
                            book={book}
                            currentShelf={this.currentShelf}
                            updateBookShielf={this.props.updateBookShielf}
                            />
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