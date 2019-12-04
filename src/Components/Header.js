import React, {
    Component
} from 'react'

class Header extends Component {

    render() {
        return ( 
        <div className="list-books">
            <div className="list-books-title">
                <h1> MyReads<span role="img" aria-label="Books">📚</span></h1>
            </div>
        </div>
        )
    }
}

export default Header;