import React from 'react';
import ParkContactInfo from './ParkContact';
import { Link } from 'react-router-dom';

const ParkDetails = ({ park, username }) => {
    const emailAddress = park.contacts.emailAddresses[0].emailAddress;
    const address = `${park.addresses[0].line1}, ${park.addresses[0].city}, ${park.addresses[0].stateCode} ${park.addresses[0].postalCode}`;
    const phoneNumber = park.contacts.phoneNumbers[0].phoneNumber;
    const hours = park.operatingHours[0].standardHours;

    return (
        <div className='container'>
            <div className='d-flex justify-content-center'>
                <div className='mainPane'>
                    <div className='row'>
                        <div className='col-lg-9 col-md-7 col-sm-6 mb-2'>
                            <h2>{park.fullName}</h2>
                        </div>
                        <div className='col-lg-3 col-md-5 col-sm-6 mb-2'>
                            <Link to={`/profile/${username}`} className='btn btn-block green-btn d-md-block d-lg-inline-block'>Profile</Link>
                        </div>
                        <div className='col-12'>
                            <img className="img-fluid" src={park.images[0].url} alt={park.images[0].altText} />
                        </div>
                    </div>
                    <div className='row p-3'>
                        <ParkContactInfo email={emailAddress}
                            address={address}
                            phoneNumber={phoneNumber}
                            hours={hours} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ParkDetails;
