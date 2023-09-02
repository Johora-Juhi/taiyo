import React, { useState } from 'react';
import './Contact.css';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import ConfirmationModal from '../Shared/ConfirmationModal';
import EditingContactModal from '../EditingContactModal/EditingContactModal';
import { TiDelete } from "react-icons/ti";


interface ContactData {
  _id: string;
  firstName: string;
  lastName: string;
  status: string;
}

const Contact = () => {

  // get all contacts 
  const { data: contacts = [], refetch } = useQuery<ContactData[]>({
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

  // edit contact 
  const [editContact, setEditContact] = useState<ContactData | null>(null);


  // delete conatct
  const [deletingSeller, setDeletingSeller] = useState<ContactData | null>(null)

  const closeModal = () => {
    setDeletingSeller(null);
  }

  const handleDetetingcontact = (id: string) => {
    fetch(`http://localhost:5000/contact/${id}`, {
      method: "DELETE",
      headers: {
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "center",
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
      {
        contacts.length ?
          <div className="container mx-auto mt-4">
            <h1
              className="text-3xl text-start text-sky-900 font-bold my-5 ml-3"
            >
              All Contacts
            </h1>
            <div className="table-responsive">
              <table className="table table-striped border rounded">
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
                        <label onClick={() => { setEditContact(contact) }}
                          htmlFor="contactEditModal" className="btn btn-xs bg-accent text-white">Edit
                        </label>
                      </td>

                      <td>
                        <label onClick={() => setDeletingSeller(contact)} htmlFor="confirmation-modal" className="btn btn-xs bg-red-600 text-white">Delete</label>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
            {
              editContact &&
              (
                <EditingContactModal
                  contact={editContact}
                  setEditContact={setEditContact}
                  refetch={refetch}
                ></EditingContactModal>
              )
            }
            {
              deletingSeller && <ConfirmationModal
                title={'Are you sure you want to delete'}
                message={`If you delete ${deletingSeller.firstName}. It can not be done`}
                successAction={() => handleDetetingcontact(deletingSeller._id)}
                modalData={deletingSeller}
                successButtonName={'Delete'}
                closeModal={closeModal}
              ></ConfirmationModal>
            }
          </div>
          :
          <div className='w-2/4 mx-auto bg-gray-50 text-center my-20 py-10 flex justify-around items-center rounded-md border-2 border-dashed'>
            <TiDelete className='text-5xl text-red-600'></TiDelete>
            <p className='text-xl noContact'>No contact found. Please add from create account</p>

          </div>
      }


    </div>
  );
};

export default Contact;