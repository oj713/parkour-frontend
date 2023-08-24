import React from 'react';
import { Link } from 'react-router-dom';

const ParkActivities = ({ activities }) => {
    const maxItems = 10;

    return (
        <div className="container">
                <h3>Activities</h3>
                <ul className="list-group mt-1">
                    {activities.slice(0, maxItems).map((activity, index) => (
                        <Link key={index}
                            className="list-group-item card-bg details-link bg-brown1"
                            to = {`/search?query=${activity.name}`}
                        >
                            {activity.name}
                        </Link>
                    ))}
                </ul>
        </div>
    );
};

export default ParkActivities;
