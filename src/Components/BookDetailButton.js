import React from 'react';
// import * as BooksAPI from '../BooksAPI'

class BookDetailButton extends React.Component {

state = {
    currentShelf: null
}


// componentDidMount = () => {
// this.setState({currentShelf: this.props.book.shelf})
// }

handleChange = (event) => {
    console.log(this.props.updateBookShielf(this.props.book, event.target.value))
    this.setState({currentShelf: event.target.value})
    console.log('this the traget value:',event.target.value)
        this.props.updateBookShielf(this.props.book, this.props.shelf)
}


render() {
    // console.log('incoming from book detail button: ',this.props.book.shelf)
return (
    <div className="book-shelf-changer">
    <select value={this.state.value || this.props.shelf || ''} onChange={ this.handleChange}>
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

