import React from 'react';
import { useNavigate } from 'react-router';

const ParkTopics = ({ topics }) => {
    const maxItems = 10;
    const navigate = useNavigate();

    const handleClick = topicName => {
        // navigate('/')

    }

    return (
        <div className="container">
            <div className="row">
                <h3>Related</h3>
                <ul className="list-group">
                    {topics.slice(0, maxItems).map((topic, index) => (
                        <li key={index} 
                            className="list-group-item card-bg"
                            onClick={() => handleClick(topic.name)}
                            >
                                {topic.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ParkTopics;
