import React from 'react'

const InfoDisplaySection = ({ title, divs = [] }) => {
    const coloredDiv = divs.map((div, i) => {
        const classSpec = i % 2 === 0 ? 'my-2' : 'bg-gray-100 py-2 my-2';
        return (<div className={classSpec} key={i}>
            <div className='grid grid-cols-3 gap-2'>
                <h1 className='flex items-center justify-center font-bold'>{div.label}</h1>
                <h1 className='col-span-2'>
                    {div.value}
                </h1>
            </div>
        </div>);
    })
    return (
        <div className='border border-gray-200 rounded w-full my-2'>
            <div>
                <h1 className='p-2 bg-gray-100 font-bold text-base'>{title}</h1>
            </div>
            <div className='p-2'>
                {coloredDiv}
            </div>
        </div>
    )
}

export default InfoDisplaySection