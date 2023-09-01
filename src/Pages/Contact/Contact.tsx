import React from 'react';
import './Contact.css';

import { Link } from 'react-router-dom';

const Contact = () => {
    // const [showContactForm, setShowContactForm] = useState(false);
    // const toggleForm = () => {
    //     setShowContactForm(!showContactForm)
    // }

    return (
        <div className='text-center'>
            <Link to='/create-contact'>
                <button className="btn btn-neutral rounded-none">Create Contact</button>
            </Link>
            {/* conatct form */}
        </div>
    );
};

export default Contact;