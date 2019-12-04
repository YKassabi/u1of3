import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Shelf from './Components/Shelf';
import Header from './Components/Header';
import AddBook from './Components/AddBook';
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
    isLoading: true, // waiting for data to be fetched
    AllBooks: [], //[{book1},{book2}, {book3}]
    AllShelfs: [], //{read:[{book}, {Book2}, {Book3}], wantToRead:[{Book1}]...} to use AllShelf.read or AllShelf.wantToRead
  }
/***
 * use after you gell all the books
 * function to convert [{book1},{book2}, {book3}] to
 * {read:[{book}, {Book2}, {Book3}], wantToRead:[{Book1}]...}
 */
BooksArraySortedByShelfs = (arr=[]) => {
//takes an array off all books and sorted by book.shelf
  let dataObjByShelf = arr.reduce((obj, book) => {
    console.log(book.shelf)
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
  console.log("ShelfsAfterUpdate returned object: ", newObject)
  return newObject;
}

////////////////////////////<><><><><><>-<><><><><><>////////////////////////////

FetchingAllBooks = () => {
  BooksAPI.getAll()
    .then( AllBooks => {
      this.setState({
        isLoading: false,
        AllBooks: AllBooks,
        AllShelfs: {...this.BooksArraySortedByShelfs(AllBooks) }
      })
    })
}

updateBookShielf = (book, shelf) => {
  book.shelf = shelf

  BooksAPI.update(book, shelf)
    .then(data => {
        this.setState({
          //changing the state 
          AllShelfs: this.ShelfsAfterUpdate(data)
        }, () => console.log("shelfs updated: ", this.state.AllShelfs))
    })
}

  componentDidMount(){
    this.FetchingAllBooks();
  }


  render() {

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
            
            <Route exact path='/' render={ () => (
                <>
                    {/* ////////////////////TESTING /////////////// */}
                    {console.log("AllShelfs: ", this.state.AllShelfs)}
                    {console.log('allBooks:' , this.state.AllBooks)}
                    {/* ////////////////////////////////////////// */}
                <Shelf 
                    dataObjByShelf = {this.state.AllShelfs.wantToRead}
                    title = {'Want To Read'}
                    updateBookShielf = {this.updateBookShielf}
                    />
                <Shelf 
                    dataObjByShelf = {this.state.AllShelfs.read}
                    title = {'read'}
                    updateBookShielf = {this.updateBookShielf}
                    />
                <Shelf 
                    dataObjByShelf = {this.state.AllShelfs.currentlyReading}
                    title = {'Currently Reading'}
                    updateBookShielf = {this.updateBookShielf}
                    />
                {/* <Shelf 
                    dataObjByShelf = {this.state.PresentationShelfs.wantToRead}
                    title = {'wantToRead'}
                    updateBookShielf = {this.updateBookShielf}
                    /> */}
                {/* <Shelf 
                    dataObjByShelf = {Shelfs[0]}
                    title = {Shelfs[0][0]}
                    updateBookShielf = {this.updateBookShielf}
                    />
                <Shelf 
                    dataObjByShelf = {Shelfs[2]}
                    title = {Shelfs[2][0]}
                    updateBookShielf = {this.updateBookShielf}
                    /> */}
                </>
              )} />
          </div>
      )
      }
  }

export default BooksApp