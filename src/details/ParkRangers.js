import React from 'react'
import { Link } from 'react-router-dom'

const ParkRangers = ({ rangers }) => {
    return (
        <div className='container'>
            <h2>Park Rangers</h2>
            <ul className='list-group'>
                {rangers.map((ranger, index) =>
                    <Link key={index}
                        className="list-group-item card-bg details-link bg-brown1"
                        to={`/profile/${ranger.username}`}
                    >
                        {ranger.displayName}
                    </Link>
                )}
            </ul>
        </div>
    )
}

export default ParkRangers