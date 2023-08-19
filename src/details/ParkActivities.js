import React from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const ParkActivities = ({ activities }) => {
    const maxItems = 10;
    const navigate = useNavigate();

    const handleClick = activityName => {
        navigate(`/seach?query=${activityName}`)
    }

    return (
        <div className="container">
            <div className="row">
                <h3>Activities</h3>
                <ul className="list-group">
                    {activities.slice(0, maxItems).map((activity, index) => (
                        <Link key={index}
                            className="list-group-item card-bg details-link"
                            to = {`/search?query=${activity.name}`}
                        >
                            {activity.name}
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ParkActivities;
