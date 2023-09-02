import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Swal from 'sweetalert2';

interface EditingContactModalProps {
    contact: Contact; // Replace 'Contact' with your actual contact type
    setEditContact: (contact: Contact | null) => void;
    refetch: () => void;
}

interface Contact {
    _id: string;
    firstName: string;
    lastName: string;
    status: string;
}

interface FormData {
    firstName: string;
    lastName: string;
    status: string
}

const EditingContactModal = ({ contact, setEditContact, refetch }: EditingContactModalProps) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<FormData>();

    const [contactStatus, setContactStatus] = useState(contact.status);

    const toggleStatus = (formStatus: string) => {
        setContactStatus(formStatus);
    };

    const handleEditContact: SubmitHandler<FormData> = (data) => {
        const updatedContact: Contact = { ...contact, ...data, status: contactStatus };

        fetch(`http://localhost:5000/contact/${contact._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedContact),
        })
            .then((res) => res.json())
            .then((data) => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Successful',
                    showConfirmButton: false,
                    timer: 2000,
                });
                reset();
                refetch();
                setEditContact(null); // Close the editing modal
            });
    };

    return (

        <div>
            <input type="checkbox" id="contactEditModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setEditContact(null)}>✕</button>
                    <div className="modal-action">
                        <form onSubmit={handleSubmit(handleEditContact)} className="">
                            <h1 className="text-3xl text-start text-sky-900 font-bold">
                                Edit Contact
                            </h1>

                            <div className="form-control grid grid-cols-12 my-5">
                                <label className="label col-span-3">
                                    <span className="label-text font-semibold">First Name:</span>
                                </label>
                                <input
                                    {...register('firstName', {
                                        required: 'First Name is required',
                                    })}
                                    type="text"
                                    placeholder="First Name"
                                    className="input input-bordered col-span-9"
                                    defaultValue={contact.firstName}
                                />
                                {errors.firstName && (
                                    <p className="text-red-500">{errors.firstName?.message}</p>
                                )}

                            </div>

                            <div className="form-control grid grid-cols-12 my-5">
                                <label className="label col-span-3">
                                    <span className="label-text font-semibold">Last Name:</span>
                                </label>
                                <input
                                    {...register('lastName', {
                                        required: 'Last Name is required',
                                    })}
                                    type="text"
                                    placeholder="Last Name"
                                    className="input input-bordered col-span-9"
                                    defaultValue={contact.lastName}
                                />
                                {errors.lastName && (
                                    <p className="text-red-500">{errors.lastName?.message}</p>
                                )}
                            </div>

                            <div className="form-control grid grid-cols-12 my-5">
                                <label className="label col-span-3">
                                    <span className="label-text font-semibold">Status:</span>
                                </label>
                                <div className='col-span-1 flex flex-col gap-4'>
                                    <label className='flex gap-4' onClick={() => toggleStatus('active')}>
                                        <input type="radio" name="status" className="checkbox" checked={contactStatus === 'active'} /> <span>Active</span>
                                    </label>
                                    <label className='flex gap-4' onClick={() => toggleStatus('inactive')}>
                                        <input type="radio" name="status" className="checkbox" checked={contactStatus === 'inactive'} /> <span>Inactive</span>
                                    </label>
                                </div>
                                {errors.status && (
                                    <p className="text-red-500">{errors.status?.message}</p>
                                )}
                            </div>
                            <div className="text-start mt-2">
                                <button className="btn btn-accent rounded-none text-white">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditingContactModal;
