import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Header from './Components/Header';
import AddBook from './Components/AddBook';
import Library from './Components/Library';
/** 
 * [{book1},{book2}, {book3}] ----------------------GETALL------------==================>{read:[{book}, {Book2}]
 * {read:[{book.id}, {Book2.id}]} ------------------UPDATE----------/
 */
// data comming from GETALL API = [{book1},{book2}, {book3}] = fn: => Convert to  {read:[{book}, {Book2}, {Book3}], wantToRead:[{Book1}]...}
// after an UPDATEAPI data we get data as :{read:[{book.id}, {Book2.id}, {Book3.id}], wantToRead:[{Book1.id}]...} =fn => 
////we will need convert to {read:[{book}, {Book2}, {Book3}], wantToRead:[{Book1}]...} //need dictionary of id:Book
// DAta Of the Search API comes in this format: [{book1},{book2}, {Book3}] no transformation needed because it will be just displayed as one iterated  array
////////
//=> Display books on shelfs , will recieve an array of this format  [{book1},{book2}, {Book3}]  also it need to recieve title 
// we will need to store data in this format /1/ {read:[{book}, {Book2}, {Book3}], wantToRead:[{Book1}]...}
////////
class BooksApp extends Component {

    state = {
        testingValue1: "Initial State",
        isLoading: true, // waiting for data to be fetched
        AllBooks: [], //[{book1},{book2}, {book3}]
        AllShelfs: {}, //{read:[{book}, {Book2}, {Book3}], wantToRead:[{Book1}]...} to use AllShelf.read or AllShelf.wantToRead
        // readShelf:[],
        // wantToReadShelf:[],
        // currentlyReadingShelf:[]
    }
/***
 * use after you gell all the books
 * function to convert [{book1},{book2}, {book3}] to
 * {read:[{book}, {Book2}, {Book3}], wantToRead:[{Book1}]...}
 */
BooksArraySortedByShelfs = (arr=[]) => {
    //takes an array off all books and sorted by book.shelf
    let dataObjByShelf = arr.reduce((obj, book) => {
        // console.log(book.shelf)
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
ShelfsAfterUpdate = (UpdatedObjId) => {
    // step one make a dictionary 
    // step two iterate through obj, then trhough array and find the book that corespond to the book ID
    // # 1  
    let DictionaryBookID = this.state.AllBooks.reduce((obj, book) => {          
                                obj[book.id] = book
                                return obj
                            }, {})      
    // # 2
    let newObject =  Object.keys(UpdatedObjId).reduce((obj, shelf)=>{
        obj[shelf] = UpdatedObjId[shelf].map(id => DictionaryBookID[id]);
        return obj;
    },{})
    // console.log("ShelfsAfterUpdate returned object: ", newObject)
    return newObject;
}

////////////////////////////<><><><><><>-<><><><><><>////////////////////////////

FetchingAllBooks = () => {
BooksAPI.getAll()
    .then( AllBooks => {
    this.setState({
        isLoading: false,
        AllBooks: AllBooks,
        AllShelfs: {...this.BooksArraySortedByShelfs(AllBooks) },
    })

    })
}


shelfUIUpdater = (book, shelf) => {

    let shelfs_copy = Object.assign({}, this.state.AllShelfs);
    let oldShelf = book.shelf;
    book.shelf = shelf //changing the chelf attribute on the book
    // FROM: oldShelf
    shelfs_copy[oldShelf] = shelfs_copy[oldShelf].filter(_book => _book.id !== book.id) // remove that book from here
    //  TO: shelf 
    shelfs_copy[shelf] = shelfs_copy[shelf].concat(book) // put new book here

    this.setState(prev => ({
            testingValue1: prev.testingValue1 + "*",
            AllShelfs: shelfs_copy
        }), () => {
            // console.log("--> Updated shelfs: ", this.state.AllShelfs)
        })
}

updateBookShielf = (book, shelf) => {    
    this.shelfUIUpdater(book,shelf)
    

    BooksAPI.update(book, shelf)
    // .then((data)=>{
    //     this.setState({
    //         AllShelfs : this.ShelfsAfterUpdate(data)
    //     }) 
    }


componentDidMount(){
    this.FetchingAllBooks();
}

////////////////////////////<><><><><><>-<><><><><><>////////////////////////////

render() {
    // let shelfs;
    // let UpdateFunction;

    if (!this.state.isLoading){
        // shelfs = this.BooksArraySortedByShelfs(this.state.AllBooks)
    // console.log('all books', this.state.AllBooks)  
    // console.log('these are all shelfs', this.state.AllShelfs)
    }
    
    return (
        this.state.isLoading 
        ? <h1>Loading...</h1> 
        : <div className="app">
            <Header />
            
            <Route exact path='/addnewbook' render={ () => (
                <AddBook 
                updateBookShielf = {this.updateBookShielf}
                />
            )} />
            
            <Route exact path = '/'
                render = {
                    () => (
                            <>
                                {/* <h1>Initial testing Value: {this.state.testingValue1}</h1>
                                <h1>wantToRead: {this.state.AllShelfs.wantToRead && this.state.AllShelfs.wantToRead.length &&  this.state.AllShelfs.wantToRead[0].title}</h1>
                                <h1>Read:  {this.state.AllShelfs.read && this.state.AllShelfs.read.length &&  this.state.AllShelfs.read[0].shelf}</h1>  */}
                                
                                <Library 
                                    updateBookShielf={this.updateBookShielf}
                                    AllShelfs={this.state.AllShelfs}
                                />
                            </>
                        ) 
                }
            />
        </div>
    )
    }
}

export default BooksApp