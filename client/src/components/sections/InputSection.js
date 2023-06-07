import React from 'react'

const InputSection = ({ title, children }) => {
    return (
        <div className='w-full'>
            <div className='relative border border-gray-300 pt-6 mt-5 mb-8 p-4 w-full text-sm rounded-lg'>
                <h1 className='border border-blue-500 bg-white  rounded-lg w-auto px-3 py-2 left-10 font-medium absolute top-[-22px]'>{title}</h1>
                {children}
            </div>
        </div>
    )
}

export default InputSection