import React from 'react';
import { useLocation } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';

const ContactDetails = () => {
    useTitle('Contact Details');

    const location = useLocation();
    const contact = location.state;
    console.log(contact);
    return (
        <div className='w-3/4 mx-auto my-10 text-start'>
            <p className='text-5xl fontFamily pb-5'>Welcome {contact.firstName} {contact.lastName} !</p>
            <p className='text-xl tracking-wider pb-3'><span className='font-bold'>Email:</span> {contact.email }</p>
            <p className='text-xl tracking-wider pb-3'><span className='font-bold'>Phone:</span> {contact.phone }</p>
            <p className='text-xl tracking-wider pb-3'><span className='font-bold'>Address:</span> {contact.address }</p>
            <p className='text-xl tracking-wider pb-3'><span className='font-bold'>Status:</span> {contact.status }</p>
        </div>
    );
};

export default ContactDetails;