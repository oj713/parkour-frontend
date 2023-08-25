import React from 'react'
import { Link } from 'react-router-dom'

const ParkRangers = ({ rangers }) => {
    return (
        <div className='container'>
            <h2>Park Rangers</h2>
            <ul className='list-group'>
                {rangers.map((ranger, index) =>
                    <li key={index} className="list-group-item subPane">
                        <div className="flex-wrap whitespace-nowrap">
                            <div className="pe-2">

                                <img className="rounded-circle" height={48} width={48} src={ranger.profileImage} />
                            </div>
                            <div className="flex-1 up-2">
                                <div>

                                    <Link style={{ textDecoration: 'none', color: 'inherit' }}
                                        to={`/profile/${ranger.username}`}
                                    >
                                        <h3>{ranger.displayName}</h3>
                                    </Link>

                                </div>
                                <div className="up-2">

                                    @{ranger.username}</div>
                            </div>
                            <div>

                            </div>
                        </div>

                    </li>
                )}
            </ul>
        </div>
    )
}

export default ParkRangers