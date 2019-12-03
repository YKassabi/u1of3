import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';



class AddBook extends Component{
    state = {
        query:''
    }
    handleinput = (e) => {
        console.log(e.target.value)
    }



    render(){
        return(
        <div className="search-books">
        <div className="search-books-bar">
            <Link 
                to='/'
                className='close-search'
            > Close </Link>

            <div className="search-books-input-wrapper">
            <input onKeyUp={this.handleinput} type="text" placeholder="Search by title or author"/>
            </div>
        </div>
        <div className="search-books-results">
            <ol className="books-grid"></ol>
        </div>
        </div>
        )
    }
}

export default AddBook