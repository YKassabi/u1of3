import React from 'react';
import Shelf from './Shelf';

const Library = ({AllShelfs, updateBookShielf }) =>{
    console.log(AllShelfs)
    return <>
            <Shelf 
                dataObjByShelf = {AllShelfs.wantToRead}
                title = {'Want To Read'}
                updateBookShielf = {updateBookShielf}
                />
            <Shelf 
                dataObjByShelf = {AllShelfs.read}
                title = {'read'}
                updateBookShielf = {updateBookShielf}
                />
            <Shelf 
                dataObjByShelf = {AllShelfs.currentlyReading}
                title = {'Currently Reading'}
                updateBookShielf = {updateBookShielf}
                />
            </>

}
export default Library;