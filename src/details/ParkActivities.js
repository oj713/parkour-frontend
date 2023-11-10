import React from 'react';
import { Link } from 'react-router-dom';

const ParkActivities = ({ activities }) => {
    const maxItems = 10;

    return (
        <div>
            <h3 className = "green2">Activities</h3>
            <ul className="list-group mt-1">
                {activities.slice(0, maxItems).map((activity, index) => (
                    <Link key={index}
                        className="list-group-item details-link bg-brown1"
                        to = {`/search?query=${activity.name}`}>
                        {activity.name}
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default ParkActivities;
