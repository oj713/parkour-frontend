import React from 'react'

const ParkRangers = ({ rangers }) => {
    return (
        <div className='container'>
            <h2>Park Rangers</h2>
            {rangers.map(ranger =>
                <h3>{ranger.displayName}</h3>
            )}
        </div>
    )
}

export default ParkRangers