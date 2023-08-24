import React from 'react';
import { Link } from 'react-router-dom';

const ParkTopics = ({ topics }) => {
    const maxItems = 10;


    return (
        <div className="container">
            <h3>Related</h3>
            <ul className="list-group mt-1">
                {topics.slice(0, maxItems).map((topic, index) => (
                    <Link key={index}
                        className="list-group-item card-bg details-link bg-brown1"
                        to={`/search?query=${topic.name}`}
                    >
                        {topic.name}
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default ParkTopics;
