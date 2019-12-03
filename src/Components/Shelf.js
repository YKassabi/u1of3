import React,{Component} from 'react'

class Shelf extends Component{
    ShelfBooksArray = this.props.dataObjByShelf
    title = this.props.title

    menuGenerator = (parami) => {
        let array = [{'read':'Read'}, {'currentlyReading':'Currently Reading'}, {'wantToRead':'Want to Read'}, {'none':'None'}]
        
        let htmlOutput = Object.keys(array).filter(i => i !== parami ).map((option)=>(
            <p>.option.</p>
        ))
        console.log(htmlOutput)
        return htmlOutput;
    }


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
                            return <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                            <div className="book-shelf-changer">
                                            <select value={book.shelf} onChange={console.log('eee')}>
                                            {this.menuGenerator('currentlyReading')}
                                                {/* <option defaultValue="read">Read</option>
                                                <option defaultValue="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="none"><span role='img' aria-label="Remove">❌</span> None </option> */}
                                            </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{book.authors}</div>
                                    </div>
                                </li>
                        })}
                        </ol>
                    </div>
                    </div>
                <p>XXXXXXXXX</p>
                </div>
                </div>
                <div className="open-search">
                <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
                </div>
            </>
        )
    }
}

export default Shelf;