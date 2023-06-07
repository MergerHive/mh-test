import React from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const CreateProfileMenu = () => {
    const navigate = useNavigate()
    const { userID } = useAuth()
    return (
        <div className='flex flex-col gap-4 p-6 border bg-white border-gray-200 shadow-[0_0_10px_0] shadow-gray-300'>
            <h1 className='text-base font-medium'>Add New Profile</h1>
            <h1 className='text-base'>Welcome to Merger Hive, We help you acquire businesses, raise capital for your company, find franchise partners, or realize value through a strategic sale. Our global network of investors and businesses helps you successfully achieve your strategic objectives.</h1>
            <div className='flex justify-center gap-4'>
                <div className='flex flex-col justify-center items-center gap-3 p-3 border rounded-md border-slate-300 cursor-pointer transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110' onClick={() => navigate('/create-business-profile')}>
                    <div className='flex justify-center bg-red-600 rounded-full items-center w-[100px] h-[100px]'>
                        <span>S</span>
                    </div>
                    <h2 className='font-medium text-center'>Create a <br /> Business Listing</h2>
                </div>
                <div className='flex flex-col justify-center items-center gap-3 p-3 border rounded-md border-slate-300 cursor-pointer transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110' onClick={() => navigate(`/investor-profile/${userID}`)}>
                    <div className='flex justify-center bg-red-600 rounded-full items-center w-[100px] h-[100px]'>
                        <span>S</span>
                    </div>
                    <h2 className='font-medium text-center'>Invest In <br /> Business</h2>
                </div>
                <div className='flex flex-col justify-center items-center gap-3 p-3 border rounded-md border-slate-300 cursor-pointer transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110' onClick={() => navigate(`/create-franchise-profile`)}>
                    <div className='flex justify-center bg-red-600 rounded-full items-center w-[100px] h-[100px]'>
                        <span>S</span>
                    </div>
                    <h2 className='font-medium text-center'>Create a <br /> Franchise Listing</h2>
                </div>
                {/* <div className='flex flex-col justify-center items-center gap-3 p-3 border rounded-md border-slate-300 cursor-pointer transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110'>
                    <div className='flex justify-center bg-red-600 rounded-full items-center w-[100px] h-[100px]'>
                        <span>S</span>
                    </div>
                    <h2 className='font-medium text-center'>Create a <br />Investor / Broker</h2>
                </div> */}
            </div>
        </div>
    )
}

export default CreateProfileMenu