import React, { useState } from 'react';
import './Contact.css';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import ConfirmationModal from '../Shared/ConfirmationModal';

interface Contact {
    _id: string;
    firstName: string;
    lastName: string;
    status: string;
  }

const Contact = () => {
    // const [showContactForm, setShowContactForm] = useState(false);
    // const toggleForm = () => {
    //     setShowContactForm(!showContactForm)
    // }

// get all contacts 
const { data: contacts = [], refetch } = useQuery<Contact[]>({
    queryKey: ["contacts"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/contact`, {
        headers: {
        },
      });
      const data = await res.json();
      return data;
    },
});
    
    // delete conatct
    const [deletingSeller, setDeletingSeller] = useState(null)

    
    const closeModal = () => {
        setDeletingSeller(null);
    }

    const handleDetetingcontact = (contact) => {
        console.log(contact);
        fetch(`https://hair-saloon-server.vercel.app/users/${contact._id}`, {
          method: "DELETE",
          headers: {
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                icon: "success",
                title: "Contact Removed",
                showConfirmButton: false,
                timer: 2000,
              });
            }
          });
      };
    return (
        <div className='text-center'>
            <Link to='/create-contact'>
                <button className="btn btn-neutral rounded-none">Create Contact</button>
            </Link>
            {/* conatct table */}
            <div className="container mx-auto mt-4">
        <h1
        //   style={{ color: "#D4A977", fontWeight: "300", letterSpacing: "2px" }}
          className="text-3xl text-start text-sky-900 font-bold my-5 ml-3"
        >
          All Contacts
        </h1>
        <div className="table-responsive">
          <table className="table table-striped border rounded">
          {/* <caption>List of contacts</caption> */}
            <thead>
              <tr>
                <th className="text-dark" scope="col">
                  #
                </th>
                <th className="text-dark" scope="col">
                  First Name
                </th>
                <th className="text-dark" scope="col">
                  Last Name
                </th>
                <th className="text-dark" scope="col">
                  Status
                </th>
                <th className="text-dark" scope="col">
                  Edit
                </th>
                <th className="text-dark" scope="col">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, i) => (
                <tr key={contact._id}>
                  <th scope="row">{i + 1}</th>
                  <td>{contact.firstName}</td>
                  <td>{contact.lastName}</td>
                  <td>
                    <button
                      className={`py-3 badge capitalize ${contact?.status === "active" ? "badge-success" : "badge-error bg-red-600 text-white"}`}
                      >
                      {contact.status}
                    </button>
                  </td>
                  <td>
                    
                      <button
                        // onClick={() => handleEditContact(contact._id)}
                        className="btn btn-sm btn-accent  text-white py-0"
                      >
                        Edit
                      </button>
                  </td>
                      <td>
                      <label onClick={() => setDeletingSeller(contact)} htmlFor="confirmation-modal" className="btn btn-xs bg-red-600 text-white">Delete</label>

                    <button
                      onClick={() => handleDetetingcontact(contact._id)}
                      type="button"
                      className="btn btn-sm bg-red-600 text-white py-0"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
           
          </table>
                </div>
                {
                deletingSeller && <ConfirmationModal
                    title={'Are you sure you want to delete'}
                    message={`If you delete ${deletingSeller.firstName}. It can not be done`}
                    successAction={handleDetetingcontact}
                    modalData={deletingSeller}
                    successButtonName={'Delete'}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }
      </div>

        </div>
    );
};

export default Contact;