import React, { useState } from 'react';
import './Contact.css';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import ConfirmationModal from '../Shared/ConfirmationModal';
import EditingContactModal from '../EditingContactModal/EditingContactModal';
import { TiDelete } from "react-icons/ti";
import useTitle from '../../hooks/useTitle';


interface ContactData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  address: string;
  status: string;
}

const Contact = () => {
  useTitle('Contacts');

  // get all contacts 
  const { data: contacts = [], refetch } = useQuery<ContactData[]>({
    queryKey: ["contacts"],
    queryFn: async () => {
      const res = await fetch(`https://taiyo-server-nine.vercel.app/contact`, {
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
    fetch(`https://taiyo-server-nine.vercel.app/contact/${id}`, {
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
    <div className='text-center w-full lg:w-3/4 mx-auto my-10'>
      <Link to='/create-contact'>
        <button className="btn btn-accent text-white rounded-none">Create Contact</button>
      </Link>

      {/* contact table or no contact  */}
      {
        contacts.length ?

          //  conatct table 
          <div className="mx-auto mt-10 p-10">

            <h1
              className="text-3xl text-start text-sky-900 font-bold mb-5 ml-3 noContact"
            >
              All Contacts
            </h1>
            <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
              {
                contacts.map(contact =>
                  <div className="card bg-base-100 shadow-xl border border-green-100">
                    <div className="card-body pb-0 px-0">
                      <h2 className="text-center font-semibold text-2xl">{contact.firstName} {contact.lastName}</h2>
                      <div className='flex justify-between items-center my-5 px-5 :px-10'>
                        <label onClick={() => { setEditContact(contact) }}
                          htmlFor="contactEditModal" className="btn bg-accent text-white px-10 md:px-14">Edit
                        </label>
                        <label onClick={() => setDeletingSeller(contact)} htmlFor="confirmation-modal" className="btn bg-red-600 text-white px-10 md:px-14">Delete</label>
                      </div>
                      <Link state={contact} to='/contact-details'> <p className=' bg-neutral py-3 text-white rounded-b-lg'>
                        View Details
                      </p></Link>

                    </div>
                  </div>)
              }
            </div>

            {/* edit contact modal  */}
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

            {/* before deleting contact confirmation modal  */}
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
          <div className='w-full md:w-3/4 lg:w-2/4 mx-auto bg-gray-50 text-center my-20 py-10 px-10 flex justify-around items-center rounded-md border-2 border-dashed'>
            <TiDelete className='text-5xl text-red-600'></TiDelete>
            <p className='text-base md:text-xl noContact'>No contact found. Please add from create account</p>
          </div>
      }


    </div >
  );
};

export default Contact;