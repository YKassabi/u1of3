import React,{Component} from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Shelf from './Components/Shelf'
import Header from './Components/Header'

class BooksApp extends Component {
  state = {
    showSearchPage: false,
    ListOfBooks:{},
    isLoading: true,
    ShelfName:'',
    BookIDCollection:{},//{[sfdsfsd:{title:.., img:.....},]}
  }

  /***
   * Function: Transforming the Raw Array to Obj with shelf as keys 
   */
ObjByShelf = (Array) => {
      let dataObjByShelf =  Array.reduce((obj, book)=>{
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
ObjByID = (Array) => {
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
    return this.state.BookIDCollection[id]
  })
  return a
}

/**
 * Function to fetch all books. 
 * return then in array type
 */
  gettingAllBooks = () => {
    BooksAPI.getAll()
      .then(dataArrayRaw=>{
        let dataObjByShelf = this.ObjByShelf(dataArrayRaw)
        let dataObjByID = this.ObjByID(dataArrayRaw)
        // console.log(dataObjByID)
        this.setState({
          ListOfBooks: dataObjByShelf,
          BookIDCollection: dataObjByID,
          isLoading: false
      })
    })
  }


updateBookShielf = (book, shelf) => {
  BooksAPI.update(book, shelf)
    .then(data => {
      return Object.keys(data).reduce((obj, k) => {
        let array = data[k].map((id) => this.DictionaryWithIdAsKeys(id))
        obj[k] = array
        return obj
      }, {})
    })
    .then((updatedBooksObject) => {
      this.setState(() => ({
        updatedBooksObject
      }))
    })
}

  componentDidMount(){
    this.gettingAllBooks();
  }

transfromeriIdsToBooksObject = () => {
        let arrayOfBookObj = this.state.ListOfBooks.currentlyReading.map(id => {
          return this.state.BookIDCollection[id]
        })
        console.log(arrayOfBookObj)
        return arrayOfBookObj;
}

  render() {
    this.state.isLoading? console.log('wait a bit') : (this.transfromeriIdsToBooksObject())
    return (
      this.state.isLoading ? (<h2>Loading...</h2>) : (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <>
            <Header />
            <Shelf 
            dataObjByShelf = {this.transfromeriIdsToBooksObject()}
            title = {'Currently Reading...'}
            />
          </>
        )
        }
      </div>
      )
    )
  }
}
export default BooksApp