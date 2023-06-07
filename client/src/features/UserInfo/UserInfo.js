import React from 'react'
// import getIcon from '../../common/Icons'

const UserInfo = () => {
    return (
        <>
            <div className='flex flex-col gap-4 justify-center divide-y-2 p-4 border bg-white border-gray-200 shadow-[0_0_10px_0] shadow-gray-300'>
                <div className='flex flex-col items-center gap-2'>
                    <div className='flex bg-orange-700 rounded-full w-[120px] h-[120px] items-center justify-center'>
                        <span className='text-5xl text-white'>S</span>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h2 className='font-medium text-base'>Srinidhi Koundinya</h2>
                        <h2 className='font-normal text-sm'>srinidhi1071@gmail.com</h2>
                    </div>
                    <div className='flex gap-2'>
                        <div className='text-sm p-2 rounded cursor-pointer bg-[#ffc040] text-black'>Edit Profile</div>
                        <div className='text-sm p-2 rounded cursor-pointer bg-[#ffc040] text-black'>Change Password</div>
                    </div>
                </div>
                {/* <div>
                    <div className='flex flex-col gap-1 my-2'>
                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-1'>
                                <div className='flex gap-1 items-center'>
                                    {getIcon("industries", "1.2em")}
                                    <h2 className='text-sm'>Industries</h2>
                                </div>
                                <div className='rounded-md p-2 border border-slate-200 bg-white'>
                                    <div className='flex flex-wrap gap-1'>
                                        <p className='py-1 px-2 text-xs text-black bg-blue-300 rounded-3xl'>Land Development</p>
                                        <p className='py-1 px-2 text-xs text-black bg-blue-300 rounded-3xl'>Colleges</p>
                                        <p className='py-1 px-2 text-xs text-black bg-blue-300 rounded-3xl'>Womens Apparels</p>
                                        <p className='py-1 px-2 text-xs text-black bg-blue-300 rounded-3xl'>Retail Shops</p>
                                        <p className='py-1 px-2 text-xs text-black bg-blue-300 rounded-3xl'>Colleges</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <div className='flex gap-1 items-center'>
                                    {getIcon("map", "1.2em")}
                                    <h2 className='text-sm'>Locations</h2>
                                </div>
                                <div className='rounded-md p-2 border border-slate-200 bg-white'>
                                    <div className='flex flex-wrap gap-1'>
                                        <p className='py-1 px-2 text-xs text-black bg-blue-300 rounded-3xl'>Bangalore, India</p>
                                        <p className='py-1 px-2 text-xs text-black bg-blue-300 rounded-3xl'>India</p>
                                        <p className='py-1 px-2 text-xs text-black bg-blue-300 rounded-3xl'>Mysore</p>
                                        <p className='py-1 px-2 text-xs text-black bg-blue-300 rounded-3xl'>Texas, USA</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex flex-col gap-1 my-2'>
                        <h2 className='text-base text-center text-hero font-medium'>Current Plan</h2>
                        <div className='bg-gray-400 rounded-md p-2 text-center'>
                            No Plan Activated
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default UserInfo