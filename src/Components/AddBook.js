import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import NoResults from './NoResults'
import PropTypes from 'prop-types';
import Book from './Book'


class AddBook extends Component{

    state = {
                query: '',
                responseList:[]
    }
    handleinput = (e) => {
        this.searchForBooks(e.target.value)
        this.setState({query:e.target.value})
    }

componentDidMount() {
    this.setState({
        query : '',
        responseList: []
    })
}


    searchForBooks= async (q) => {
        await BooksAPI.search(q)
        .then(incomingBooks=>{

            console.log(this.props.currentBookInTheLibrary)
            console.log(incomingBooks)
            this.conpairSearchedBookWithExisting(incomingBooks, this.props.currentBookInTheLibrary)
            return incomingBooks
        })
        .then((fetchedData)=>
            this.setState({
                responseList: fetchedData || []
            })
        ).then(

        )
    }
    
    conpairSearchedBookWithExisting = (arrSearch = [], arrLib = []) => {
        if(arrSearch.length > 0 ){
            arrSearch &&  arrSearch.forEach(book1 => {
                arrLib.forEach( book2 => {
                    if(book1.id === book2.id) {
                        return book1.shelf = book2.shelf
                    }
                })
            })
        }
    }

    render(){
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link 
                        to='/'
                        className='close-search'
                    > Close </Link>
                    <div className="search-books-input-wrapper">
                    <input onKeyUp={this.handleinput} type="text" placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    { this.state.responseList.length > 0
                    ?
                        <>
                            <h1>Looking for {this.state.query ? this.state.query : ' ... ' } books :</h1>
                            <ol className="books-grid">
                                {this.state.responseList.map(book=>{
                                    return<li key={book.id} >
                                        <div>
                                            { book.shelf && 
                                                    <div className='exist'>
                                                            <Book
                                                                book={book}
                                                                currentShelf={book.shelf}
                                                                updateBookShielf = {this.props.updateBookShielf }
                                                            />
                                                    </div>
                                            }
                                            { !book.shelf && <Book
                                                                book={book}
                                                                currentShelf={book.shelf}
                                                                updateBookShielf = {this.props.updateBookShielf }
                                                            />}
                                            
                                        </div>
                                    </li>
                                })}
                            </ol>
                        </>
                    :
                    <NoResults />
                    }
                </div>
            </div>
        )
    }
}

AddBook.propTypes = {
    updateBookShielf: PropTypes.func,
    currentBookInTheLibrary: PropTypes.array
};

export default AddBook