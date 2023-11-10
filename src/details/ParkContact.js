import React from 'react';
import './index.css';

function ParkContactInfo({ email, address, phoneNumber, hours }) {

    return (
        <div className="card card-bg">
            <div className="card-body">
                <h3 className="card-title green2">Contact Information</h3>
                <br/>
                <p className="card-text">
                    <strong>Email:</strong> {email}
                    <br />
                    <strong>Address:</strong> {address}
                    <br />
                    <strong>Phone Number:</strong> {phoneNumber}
                </p>
                <h3 className="card-title green2">Hours of Operation</h3>
                <ul className="list-unstyled">
                    {Object.entries(hours).map(([day, hours]) => (
                        <li key={day}>
                            <strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong> {hours}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ParkContactInfo;
