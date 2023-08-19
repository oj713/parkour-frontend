import React from 'react'
import ParkContactInfo from './ParkContact'

const ParkDetails = ({ park }) => {
    const emailAddress = park.contacts.emailAddresses[0].emailAddress;
    const address = `${park.addresses[0].line1}, ${park.addresses[0].city}, ${park.addresses[0].stateCode} ${park.addresses[0].postalCode}`;
    const phoneNumber = park.contacts.phoneNumbers[0].phoneNumber;
    const hours = park.operatingHours[0].standardHours;
    return (
        <div className='container mainPane'>
            <div className='row'>
                <h2>{park.fullName}</h2>
                <img width='100%' height='300' src={park.images[0].url} alt={park.images[0].altText} />
            </div>
            <div className='row p-3'>
                <ParkContactInfo email={emailAddress} 
                                address={address}
                                phoneNumber={phoneNumber}
                                hours={hours} />
            </div>
        </div>
    )
}

export default ParkDetails



