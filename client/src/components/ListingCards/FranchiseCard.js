import React from 'react'
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';
import getIcon from '../../common/Icons';

const FranchiseCard = ({ item }) => {
    const navigate = useNavigate()
    return (
        <div className='flex  flex-col w-full p-2 border border-gray-300 drop-shadow-md shadow-gray-300'>
            <p className='text-blue-400 text-base'>{item.brandName}</p>
            <p className='text-sm'>
                {item?.companyLocation.map(obj => obj.description)}
            </p>
            <p className='text-sm'>
                {item?.industry.map(obj => obj.title).join(", ")}
            </p>
            <div className='flex gap-1 py-1'>
                <p className='line-clamp-4 text-sm'>
                    {item?.brandIntro}
                </p>
                <div>
                    {item?.franchiseImages[0] ? <Avatar className='rounded-md' src={item?.franchiseImages[0]} size="75" /> : <Avatar className='rounded-md' facebookId="100008343750912" size="75" />}
                </div>
            </div>
            <div className='flex gap-1 py-1 justify-end'>
                <div className='flex items-center gap-1'>
                    {getIcon("link", "1.25em", "blue")}
                    <p className='text-sm'>Connected with <span className='font-medium'>40 businesses</span></p>
                </div>
            </div>
            <div className='flex flex-col gap-2 py-2'>
                <div className='flex flex-col py-1 bg-slate-200 px-2'>
                    <div className='flex justify-between'>
                        <p className='text-sm'>Prefered Locations</p>
                        <div className='flex gap-1'>
                            <p className='text-sm'>{item?.industry.map(obj => obj.title).join(", ")}</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col py-1 bg-slate-200 px-2'>
                    <div className='flex justify-between'>
                        <p className='text-sm'>Interested Industries</p>
                        <div className='flex gap-1'>
                            <p className='text-sm'>{item?.companyLocation.map(obj => obj.description).join(", ")}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex py-2 divide-x-2 gap-2 items-center justify-end flex-wrap">
                <div className='flex flex-col'>
                    <div>
                        <p className='text-sm'>
                            Investment Size
                        </p>
                        <div className='flex gap-1'>
                            <p className='text-sm'>INR</p>
                            <p className='text-sm'>1.2</p>
                            <p className='text-sm'>Cr</p>
                            <p className='text-sm'>For</p>
                            <p className='text-sm'>20 %</p>
                        </div>
                    </div>
                </div>
                <div className='px-2'>
                    <button className='px-4 rounded-md py-2 bg-[#f5d244] cursor-pointer' onClick={() => navigate(`/franchises/franchiseProfile/${item._id}`)}>Contact Business</button>
                </div>
            </div>
        </div>
    )
}

export default FranchiseCard