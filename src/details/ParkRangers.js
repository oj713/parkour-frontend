import React from 'react'
import { Link } from 'react-router-dom'
import SearchResult from '../searchResults/userSearchResult';

const ParkRangers = ({ rangers }) => {
    return (
        <div>
            <h2 className = "green2">Rangers</h2>
            <ul className='list-group'>
                {rangers.map((ranger, index) =>
                    <SearchResult key = {index} post={ranger}/>
                )}
            </ul>
        </div>
    )
}

export default ParkRangers