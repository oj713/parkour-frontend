import React from 'react';
import { Link } from 'react-router-dom';

const ParkTopics = ({ topics }) => {
    const maxItems = 10;


    return (
        <div className="container">
            <div className="row">
                <h3>Related</h3>
                <ul className="list-group pe-0">
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
        </div>
    );
};

export default ParkTopics;
