import React from 'react';
import ParkContactInfo from './ParkContact';
import { Link } from 'react-router-dom';

const ParkDetails = ({ park, username }) => {
    const emailAddress = park.contacts.emailAddresses[0].emailAddress;
    const address = `${park.addresses[0].line1}, ${park.addresses[0].city}, ${park.addresses[0].stateCode} ${park.addresses[0].postalCode}`;
    const phoneNumber = park.contacts.phoneNumbers[0].phoneNumber;
    const hours = park.operatingHours[0].standardHours;

    return (
    <div className='mainPane'>
        <div className='d-flex justify-content-between'>
            <h2 className = "green2">{park.fullName}</h2>
            {username != null &&
            <Link to={`/profile/${username}`} className='btn parkour-btn green-btn my-2 max-height-2p3'>Profile</Link>
            }
        </div>
        <div className='col-12'>
            <img className="img-fluid round" src={park.images[0].url} alt={park.images[0].altText} />
        </div>
        <div className='row p-3'>
            <ParkContactInfo email={emailAddress}
                address={address}
                phoneNumber={phoneNumber}
                hours={hours} />
        </div>
    </div>
    );
}

export default ParkDetails;
