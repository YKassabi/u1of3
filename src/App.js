import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Header from './Components/Header';
import AddBook from './Components/AddBook';
import Library from './Components/Library';
class BooksApp extends Component {

    state = {
        isLoading: true, // waiting for data to be fetched
        allBooks: [], //[{book1},{book2}, {book3}]
        allShelfs: {}, //{read:[{book}, {Book2}, {Book3}], wantToRead:[{Book1}]...} to use AllShelf.read or AllShelf.wantToRead
    }
/***
 * use after you gell all the books
 * function to convert [{book1},{book2}, {book3}] to
 * {read:[{book}, {Book2}, {Book3}], wantToRead:[{Book1}]...}
 */
BooksArraySortedByShelfs = (arr=[]) => {//takes an array off all books and sorted by book.shelf
    let dataObjByShelf = arr.reduce((obj, book) => {
        obj[book.shelf] = obj[book.shelf] ? obj[book.shelf].concat(book) : [].concat(book)
        return obj
    }, {})
    return {read:[],wantToRead:[], currentlyReading:[],
        ...dataObjByShelf
    } //{read:[{book}, {Book2}, {Book3}], wantToRead:[{Book1}]...}

}
/****
 * use after the update
 * Function to convert {read:[{book.id}, {Book2.id}, {Book3.id}]}
 * to {read:[{book}, {Book2}, {Book3}], wantToRead:[{Book1}]...}
 * take an object shelfs, need to find books from the id  
 */
ShelfsAfterUpdate = (updatedObjectID) => {
    let dictionaryBookID = this.state.allBooks.reduce((obj, book) => { // step one make a dictionary 
                                obj[book.id] = book
                                return obj
                            }, {})      
    let newObject = Object.keys(updatedObjectID).reduce((obj, shelf) => { // step two iterate through obj, then trhough array and find the book that corespond to the book ID
        obj[shelf] = updatedObjectID[shelf].map(id => dictionaryBookID[id]);
        return obj;
    },{})
    return newObject;
}

////////////////////////////<><><><><><>-<><><><><><>////////////////////////////

FetchingAllBooks = () => {
BooksAPI.getAll()
    .then( allBooks => {
        this.setState({
            isLoading: false,
            allBooks,
            allShelfs: {...this.BooksArraySortedByShelfs(allBooks) },
        })
    })
}


shelfUIUpdater = (book, shelf) => {// moving book from oldshelf to the new shelf
    let shelfs_copy = Object.assign({}, this.state.allShelfs);
    let oldShelf = book.shelf;
    let newShelf = shelf
    book.shelf = newShelf; //changing the chelf attribute on the book

    if(oldShelf){//just when the old shelf was in the library already
        shelfs_copy[oldShelf] = shelfs_copy[oldShelf].filter(_book => _book.id !== book.id) // remove that book from here
    }
    if(newShelf !=='none'){ // no need to add book when we try to delete it , by moving it to none catagory
        shelfs_copy[newShelf] = shelfs_copy[newShelf].concat(book) // put new book here
    }
    this.setState(() => ({
        allShelfs: shelfs_copy
    }))
}

updateBookShielf = (book, shelf) => {    
    this.shelfUIUpdater(book,shelf) // take care of the UI 
    BooksAPI.update(book, shelf)    // Put to API to make the changes.
    }


componentDidMount(){
    this.FetchingAllBooks();
}

////////////////////////////<><><><><><>-<><><><><><>////////////////////////////

render() {
    
    return (
        this.state.isLoading 
        ? <h1 className='loading'>Loading...</h1> 
        : <div className="app">
            <Header />
            <Route exact path='/addnewbook' 
                render={ () => (
                    <AddBook 
                        updateBookShielf = {this.updateBookShielf}
                        currentBookInTheLibrary = {this.state.allBooks}
                    />
                )} 
            />
            
            <Route exact path = '/'
                render = { () => (
                    <Library 
                        updateBookShielf={this.updateBookShielf}
                        allShelfs={this.state.allShelfs}
                    />
                )} 
            />
        </div>
    )
    }
}

export default BooksApp