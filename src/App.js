import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Shelf from './Components/Shelf';
import Header from './Components/Header';
import AddBook from './Components/AddBook';


class BooksApp extends Component {
  state = {
    isLoading: true, // waiting for data to be fetched
    BookIdsByShelfs:{},
    ShelfName:'',
    BookByBookId:{},//{[sfdsfsd:{title:.., img:.....},]}
    BooksShelfsUI:[]
  }


Transformer = () => {}




  /***
   * Function: Transforming the Raw Array to Obj with shelf as keys 
   */
MakingObjOfBookIdsByShelf = (ArrayAsParam) => {
      let dataObjByShelf =  ArrayAsParam.reduce((obj, book)=>{
        obj[book.shelf] = obj[book.shelf] ? obj[book.shelf].concat(book.id) : []
        return obj
      },{})
      return {
        read: [],
        wantToRead: [],
        currentlyReading: [],
        none: [],
        ...dataObjByShelf
      }
    }
/***
 * function Transforming Array to Obj with "ID" as Keys and {books} as values
 */
MakingObjOfBooksByBookId = (Array) => {
        let dataObjByID = Array.reduce((obj, book) => {
          obj[book.id] = book
          return obj
        }, {})
        return dataObjByID;
}


/**
 * Function to Generate a [] of {books} based on id.
 */
BookIDToObj = (arrayOfIDs) => {
  console.log(arrayOfIDs)
  let a = arrayOfIDs.map(id=>{
    return this.state.BookByBookId[id]
  })
  return a
}

/**
 * Function to fetch all books. 
 * return then in array type
 */
FetchingAllBooks = () => {
  BooksAPI.getAll()
    .then( dataArrayRaw =>{
      let dataObjByShelf = this.MakingObjOfBookIdsByShelf(dataArrayRaw)
      let dataObjByID = this.MakingObjOfBooksByBookId(dataArrayRaw)
      this.setState({
        BookIdsByShelfs: dataObjByShelf,
        BookByBookId: dataObjByID,
        isLoading: false
      })
      return dataObjByShelf;
    })
    .then(i => {
      let uiShelfs = this.MakingBookShelfsFromBookId(i)
      this.setState({
          BooksShelfsUI: uiShelfs
      })
    })

}


updateBookShielf = (book, shelf) => {
  BooksAPI.update(book, shelf)
    .then(d => {
        console.log('Raw Data after the update:',d)
      return d
    })
    .then((incomingUpdatedObj) => {
      this.setState(() => ({
        BookIdsByShelfs: incomingUpdatedObj
      }))
    })
}

  componentDidMount(){
    this.FetchingAllBooks();
  }

  MakingBookShelfsFromBookId = (L) => {
        let list = L
        return Object.keys(list).reduce((Obj, shelf) => {
          let arrayOfBookObj = list[shelf].map(id =>this.state.BookByBookId[id])
          Obj[shelf] =  arrayOfBookObj;
          return Obj
        },{}) // [["read",[…]]] ==> to get the books in read this.MakingBookShelfsFromBookId()[0][1]
          
}


  render() {
      console.log(this.state.BookIdsByShelfs)
      const Shelfs = this.MakingBookShelfsFromBookId(this.state.BookIdsByShelfs)
      console.log(Shelfs)

      return (
        this.state.isLoading 
        ? <h1>Loading...</h1> 
        : <div className="app">
            <Header />
          <Route exact path='/addnewbook' render={ () => (
                <AddBook />
          )} />

          <Route exact path='/' render={ () => (
            <>
            <Shelf 
                dataObjByShelf = {Shelfs.read}
                title = {'read'}
                updateBookShielf = {this.updateBookShielf}
                />
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