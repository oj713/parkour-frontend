import React from 'react';
import { Link } from 'react-router-dom';

const ParkTopics = ({ topics }) => {
    const maxItems = 10;


    return (
        <div>
            <h3 className = "green2">Related</h3>
            <ul className="list-group mt-1">
                {topics.slice(0, maxItems).map((topic, index) => (
                    <Link key={index}
                        className="list-group-item details-link bg-brown1"
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
