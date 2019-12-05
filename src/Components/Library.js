import React from 'react';
import Shelf from './Shelf';
import PropTypes from 'prop-types';


const Library = (props) => {

    const allShelfs = props.AllShelfs;
    const read = props.AllShelfs.read;
    const wantToRead = props.AllShelfs.wantToRead;
    const currentlyReading = props.AllShelfs.currentlyReading;
        console.log('these are all shielfs All Shelf: ',  allShelfs)
        console.log('these are all shielfs READ: ',  read)
        console.log('these are all shielfs Currently Reading: ',  currentlyReading)
        return <>
            <h1> Currently Reading: { props.AllShelfs.currentlyReading && props.AllShelfs.currentlyReading.length && `****/`} </h1>
            <h1> Read: { props.AllShelfs.read && props.AllShelfs.read.length && (`/****`)}</h1>
            {/* <ul>
            { Object.keys(allShelfs).map((s)=>{
                console.log(`${s} ==> `, allShelfs[s])
                return <li key={s}>
                    <Shelf 
                            dataObjByShelf = {allShelfs[s]}
                            title = {s}
                            updateBookShielf = {props.updateBookShielf}
                    />
                </li>
            })
            }
                </ul> */}
            
            <Shelf 
                dataObjByShelf = {props.AllShelfs.read}
                title = {' Read'}
                updateBookShielf = {
                    props.updateBookShielf
                }
                />
            <Shelf 
                dataObjByShelf = {props.AllShelfs.wantToRead}
                title = {'Want to Read'}
                updateBookShielf = {
                    props.updateBookShielf
                }
                />
            </>
}


Library.propTypes = {
    dataObjByShelf: PropTypes.array,
    updateBookShielf: PropTypes.func,
};
export default Library;