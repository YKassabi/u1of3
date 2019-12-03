import React,{Component} from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Shelf from './Components/Shelf'
import Header from './Components/Header'

class BooksApp extends Component {
  state = {
    showSearchPage: false,
    BookIdsByShelfs:{},
    isLoading: true,
    ShelfName:'',
    BookByBookId:{},//{[sfdsfsd:{title:.., img:.....},]}
    BooksShelfsUI:[]
  }

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
        console.log('...d',d)
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
        return Object.keys(list).map(shelf =>{
          let arrayOfBookObj = list[shelf].map(id =>this.state.BookByBookId[id])
          return [shelf,arrayOfBookObj];
        }) // [0: Array["read", (6)[…]]] ==> to get the books in read this.MakingBookShelfsFromBookId()[0][1]
        // return FinalList
        
}


componentWillReceiveProps(){
  let FinalList = this.MakingBookShelfsFromBookId(this.state.BookIdsByShelfs)
  this.setState({
    BooksShelfsUI: FinalList
  })
}


  render() {
    this.state.isLoading ? console.log('wait a bit') : (console.log(':>', this.MakingBookShelfsFromBookId(this.state.BookIdsByShelfs)))
    let Shelfs = this.MakingBookShelfsFromBookId(this.state.BookIdsByShelfs)
    console.log(Shelfs)
    console.log('BookIdsByShelfs : ',this.state.BookIdsByShelfs);
    console.log('BookByBookId :', this.state.BookByBookId);
    console.log('BooksShelfsUI : ', this.state.BooksShelfsUI);
    console.log('+_________________________________________+');

    
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
            dataObjByShelf = {Shelfs[0]}
            title = {Shelfs[0][0]}
            updateBookShielf = {this.updateBookShielf}
            />
            {/* <Shelf 
            dataObjByShelf = {this.state.BooksShelfsUI[1]}
            title = {this.state.BooksShelfsUI[1][0]}
            updateBookShielf = {this.updateBookShielf}
            />
            <Shelf 
            dataObjByShelf = {this.state.BooksShelfsUI[2]}
            title = {this.state.BooksShelfsUI[2][0]}
            updateBookShielf = {this.updateBookShielf} */}
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