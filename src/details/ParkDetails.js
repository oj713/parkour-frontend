import React from 'react'

const ParkDetails = ({ park }) => {
    return (
        <>
            <div className='mainPane'>
                <h2>{park.fullName}</h2>
                <img width='100%' height='300' src={park.images[0].url} alt={park.images[0].altText} />
                <div className='d-flex'>
                    <div className='me-2'>
                        <h3>Phone: </h3> {park.contacts.phoneNumbers[0].phoneNumber}
                    </div>
                    <div>
                        <h3>Email: </h3>
                        {park.contacts.emailAddresses[0].emailAddress}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ParkDetails