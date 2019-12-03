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
    BookIDCollection:{},
  }

  /***
   * Function: Transforming the Raw Array to Obj with shelf as keys 
   */
ObjByShelf = (Array) => {
      // let Blank = {read:['Read..'], wantToRead:[], currentlyReading:['Currently Reading'] ,none:[]}
      let dataObjByShelf =  Array.reduce((obj, book)=>{
        obj[book.shelf] = obj[book.shelf] ? obj[book.shelf].concat(book) : []
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
 * function Transforming Array to Obj with id as Keys
 */
ObjByID = (Array) => {
        let dataObjByID = Array.reduce((obj, book) => {
          obj[book.id] = book
          return obj
        }, {})
        return dataObjByID;
}

/**
 * Function to fetch all books.
 */
  gettingAllBooks = () => {
    BooksAPI.getAll()
    .then(dataArrayRaw=>{
      let dataObjByShelf = this.ObjByShelf(dataArrayRaw)
      let dataObjByID = this.ObjByID(dataArrayRaw)
      this.setState({
        ListOfBooks: dataObjByShelf,
        BookIDCollection: dataObjByID,
        isLoading: false
      })
    })
  }


  componentDidMount(){
    this.gettingAllBooks();
  }



  render() {
    console.log(this.state.ListOfBooks)
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
          <Shelf dataObjByShelf={this.state.ListOfBooks.currentlyReading} title={'Currently Reading...'}/>
          </>
        )
        }
      </div>
      )
    )
  }
}
export default BooksApp