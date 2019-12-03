import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import NoResults from './NoResults'


class AddBook extends Component{
    state = {
                ResponseList:[]
    }
    handleinput = (e) => {
        console.log(e.target.value)
        this.searchForBooks(e.target.value)
    }

    searchForBooks=(q)=>{
        BooksAPI.search(q).then((fetchedData)=>
            this.setState({
                ResponseList: fetchedData || []
            })
        )
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
            { this.state.ResponseList.length > 0
            ?
                <>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {this.state.ResponseList.map(book=>{
                                return<li key = {book.id}>{book.title}</li>
                            })}
                        </ol>
                    </div>
                </>
            :
            <NoResults />

            }
        </div>
        )
    }
}

export default AddBook