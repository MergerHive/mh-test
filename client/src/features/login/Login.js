import { React } from 'react'
// import { SocialIcon } from 'react-social-icons'
import Modal from '../../components/model/Modal'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import PulseLoader from 'react-spinners/PulseLoader'
import { useLoginMutation } from './authApiSlice';
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice';
import GoogleLogin from './GoogleLogin';


const Login = ({ isOpen, onClose }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const [login, { isLoading }] = useLoginMutation()

    const onSubmit = async (event) => {
        try {

            const { accessToken } = await login(event).unwrap()
            dispatch(setCredentials({ accessToken }))
            localStorage.setItem('persist', true);
            reset()
            navigate('/dashboard')
            onClose()
        } catch (error) {
            console.log("error in Login.js", error)
        }
    };

    return (
        <>
            <Modal title="Login" isOpen={isOpen} onClose={onClose} >
                <div className='flex flex-col gap-4 divide-y-2'>
                    <div className='grid grid-cols-2 gap-2'>
                        <GoogleLogin onClose={onClose} />
                    </div>
                    <form className='flex flex-col gap-2 pt-2' onSubmit={handleSubmit(onSubmit)}>
                        <div className='grid mb-3 grid-cols-2 gap-2 justify-end'>
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
                        </div>
                        {isLoading ?
                            <div className='bg-[#ffc040] cursor-pointer rounded-3xl text-center font-bold px-2 py-3' >
                                <PulseLoader color={"white"} />
                            </div> :
                            <input type="submit" className='bg-[#ffc040] cursor-pointer rounded-3xl text-center font-bold px-2 py-3' />}
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default Login