import React from 'react';
import * as BooksAPI from '../BooksAPI'

class BookDetailButton extends React.Component {

state = {
    currentShelf: null
}


// componentDidMount = () => {
// this.setState({currentShelf: this.props.book.shelf})
// }

handleChange = (event) => {
    this.setState({currentShelf: event.target.value}, () => {
        this.moveToBookShelf()
        console.log(this.state.currentShelf)
})
}

moveToBookShelf = () => {
    const book = this.props.book
    const title = this.state.currentShelf
    BooksAPI.update(book, title).then(() => {
        this.props.updateShelf(title)
    })
}

render() {
    console.log('incoming from book detail button: ',this.props.book.shelf)
return (
    <div className="book-shelf-changer">
    <select value={this.state.value || this.props.shelf || ''} onChange={this.handleChange}>
        <option value="none" >Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
    </select>
    </div>
)
}
}

export default BookDetailButton

