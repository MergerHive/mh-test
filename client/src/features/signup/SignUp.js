
import { React, useState } from 'react'
import Modal from '../../components/model/Modal'
import { useForm } from "react-hook-form";
import { useAddNewUserMutation } from '../../components/users/usersApiSlice';
import { useEffect } from 'react';
import PulseLoader from 'react-spinners/PulseLoader'

const SignUp = ({ isOpen, onClose }) => {
    const [toastData, setToastData] = useState({ title: null, description: null, type: null });

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        if (isSuccess) {
            onClose()
            setToastData({ title: "Success", description: "User Added", type: "error" });
            reset()
        }
        if (isError) {
            setToastData({ title: "Failure", description: error?.data?.message, type: "error" });
        }
    }, [isSuccess, isError, error, onClose, reset])

    const onSubmit = async (event) => {
        await addNewUser({ ...event, contactNumber: event.phNumber, roles: ["User"] })
    };
    return (
        <>
            <Modal title="SignUp" isOpen={isOpen} onClose={onClose} >
                <div className='flex flex-col gap-4 divide-y-2'>
                    <div className='grid grid-cols-2 gap-2'>
                        <button className='bg-gray-100 rounded-3xl text-center font-bold px-5 py-3'>&nbsp; Google</button>
                        <button className='bg-gray-100 rounded-3xl text-center font-bold px-5 py-3'>&nbsp;Facebook</button>
                    </div>
                    <form className='flex flex-col gap-4 pt-2' onSubmit={handleSubmit(onSubmit)}>
                        <div className='grid mb-3 grid-cols-2 gap-2 justify-end'>
                            <label className='flex flex-col gap-1'>
                                <span className='text-sm'>First Name</span>
                                <input {...register("firstName", { required: true, maxLength: 20 })} className='p-2 border-2  border-gray-300 rounded-md focus:outline-none' placeholder='Enter your first name' />
                                {errors.firstName && <p className='text-sm text-red-500'>first name is required</p>}
                            </label>
                            <label className='flex flex-col gap-1'>
                                <span className='text-sm'>Last Name</span>
                                <input {...register("lastName", { required: true, maxLength: 20 })} className='p-2 border-2  border-gray-300 rounded-md focus:outline-none' placeholder='Enter your last name' />
                                {errors.lastName && <p className='text-sm text-red-500'>last name is required</p>}
                            </label>
                            <label className='flex flex-col gap-1'>
                                <span className='text-sm'>Phone Number</span>
                                <input type='number' {...register("phNumber", { required: true, maxLength: 20 })} aria-invalid={errors.firstName ? "true" : "false"} className='p-2 border-2  border-gray-300 rounded-md focus:outline-none' placeholder='Enter your contact number' />
                                {errors.phNumber && <p className='text-sm text-red-500'>contact number is required</p>}
                            </label>
                            <label className='flex flex-col gap-1'>
                                <span className='text-sm'>Email</span>
                                <input {...register("email", {
                                    required: "email is required",
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "invalid email"
                                    }
                                })} className='p-2 border-2  border-gray-300 rounded-md focus:outline-none' placeholder='Enter your email' />
                                {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
                            </label>
                            <label className='flex flex-col gap-1'>
                                <span className='text-sm'>Password</span>
                                <input {...register("password", {
                                    required: "password is required", minLength: {
                                        value: 8,
                                        message: "minimum length is 8 characters"
                                    }
                                })} type='password' className='p-2 border-2  border-gray-300 rounded-md focus:outline-none' placeholder='Enter your last name' />
                                {errors.password && (
                                    <p className='text-sm text-red-500'>{errors.password.message}</p>
                                )}

                            </label>
                            <label className='flex flex-col gap-1'>
                                <span className='text-sm'>Confirm Password</span>
                                <input {...register("passwordConfirm", {
                                    required: "please confirm password",
                                    minLength: {
                                        value: 8,
                                        message: "minimum length is 8 characters"
                                    },
                                    validate: {
                                        matchesPreviousPassword: (value) => {
                                            const { password } = getValues();
                                            return password === value || "passwords not matching";
                                        }
                                    }
                                })} type='password' className='p-2 border-2 border-gray-300 rounded-md focus:outline-none' placeholder='Enter your last name' />
                                {errors.passwordConfirm && (
                                    <p className='text-sm text-red-500'>
                                        {errors.passwordConfirm.message}
                                    </p>
                                )}
                            </label>

                        </div>
                        {isLoading ?
                            <div className='bg-[#ffc040] cursor-pointer rounded-3xl text-center font-bold px-5 py-3' >
                                <PulseLoader color={"white"} />
                            </div> :
                            <input type="submit" className='bg-[#ffc040] cursor-pointer rounded-3xl text-center font-bold px-5 py-3' />
                        }
                    </form>
                </div>
            </Modal >
        </>
    )
}

export default SignUp