import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

interface FormData {
    firstName: string;
    lastName: string;
    status: string;
}
const CcreateContact = () => {
    const navigate = useNavigate();

    const [contactStatus, setContactStatus] = useState('active');

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm<FormData>();

    const toggleStatus = (formStatus: string) => {
        setContactStatus(formStatus);
        console.log(formStatus);
    }
    const handleContact: SubmitHandler<FormData> = (data) => {
        const conatct = { ...data, status: contactStatus }
        
        fetch("http://localhost:5000/contact", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(conatct),
        })
            .then((res) => res.json())
            .then((data) => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successful",
                    showConfirmButton: false,
                    timer: 1000,
                });
                navigate("/");
                setContactStatus('active')
                reset();
            })
    }
    return (
        <div className='text-center'>

            {/* conatct form */}
            <form onSubmit={handleSubmit(handleContact)} className="card-body ">
                <h1 className="text-3xl text-start text-sky-900 font-bold">
                    Create Contact
                </h1>

                <div className="form-control grid grid-cols-12 my-5">
                    <label className="label col-span-2">
                        <span className="label-text font-semibold">First Name:</span>
                    </label>
                    <input
                        {...register("firstName", {
                            required: "First Name is required",
                        })}
                        type="text"
                        placeholder="First Name"
                        className="input input-bordered col-span-10"
                    />
                    {errors.firstName && (
                        <p className="text-red-500">{errors.firstName?.message}</p>
                    )}
                </div>

                <div className="form-control grid grid-cols-12 my-5">
                    <label className="label col-span-2">
                        <span className="label-text font-semibold">Last Name:</span>
                    </label>
                    <input
                        {...register("lastName", {
                            required: "Last Name is required",
                        })}
                        type="text"
                        placeholder="Last Name"
                        className="input input-bordered col-span-10"
                    />
                    {errors.lastName && (
                        <p className="text-red-500">{errors.lastName?.message}</p>
                    )}
                </div>

                <div className="form-control grid grid-cols-12 my-5">
                    <label className="label col-span-2">
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
                        Save Conatct
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CcreateContact;