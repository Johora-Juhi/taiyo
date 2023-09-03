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
    email: string;
    phone: number;
    address: string;
    status: string;
}

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    address: string;
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

        fetch(`https://taiyo-server-nine.vercel.app/contact/${contact._id}`, {
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
                <div className="modal-box w-11/12 max-w-3xl">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setEditContact(null)}>✕</button>
                    <div className="modal-action">
                        <form onSubmit={handleSubmit(handleEditContact)} className="px-5">
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
                                    <p className="text-red-500 col-span-12 pl-[10.50rem] pt-4 text-left">{errors.firstName?.message}</p>
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
                                    <p className="text-red-500 col-span-12 pl-[10.50rem] pt-4 text-left">{errors.lastName?.message}</p>
                                )}
                            </div>

                            <div className="form-control grid grid-cols-12 my-5">
                                <label className="label col-span-3">
                                    <span className="label-text font-semibold">Email:</span>
                                </label>
                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                    })}
                                    type="email"
                                    placeholder="Email"
                                    className="input input-bordered col-span-9"
                                    defaultValue={contact.email}
                                />
                                {errors.email && (
                                    <p className="text-red-500 col-span-12 pl-[10.50rem] pt-4 text-left">{errors.email?.message}</p>
                                )}
                            </div>

                            <div className="form-control grid grid-cols-12 my-5">
                                <label className="label col-span-3">
                                    <span className="label-text font-semibold">Phone Number:</span>
                                </label>
                                <input
                                    {...register("phone", {
                                        required: "Phone Number is required",
                                    })}
                                    type="text"
                                    placeholder="Phone Number"
                                    className="input input-bordered col-span-9"
                                    defaultValue={contact.phone}

                                />
                                {errors.phone && (
                                    <p className="text-red-500 col-span-12 pl-[10.50rem] pt-4 text-left">{errors.phone?.message}</p>
                                )}
                            </div>

                            <div className="form-control grid grid-cols-12 my-5">
                                <label className="label col-span-3">
                                    <span className="label-text font-semibold">Address:</span>
                                </label>
                                <input
                                    {...register("address", {
                                        required: "Adress is required",
                                    })}
                                    type="text"
                                    placeholder="Address"
                                    className="input input-bordered col-span-9"
                                    defaultValue={contact.address}

                                />
                                {errors.address && (
                                    <p className="text-red-500 col-span-12 pl-[10.50rem] pt-4 text-left">{errors.address?.message}</p>
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
                                    <p className="text-red-500 col-span-12 pl-[10.50rem] pt-4 text-left">{errors.status?.message}</p>
                                )}
                            </div>
                            <div className="text-start mt-2">
                                <button className="btn btn-accent rounded-none text-white tracking-wider px-5">
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
