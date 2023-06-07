import React from 'react'
import Avatar from 'react-avatar';

const SliderCard = () => {
    return (
        <div className='px-2 max-w-lg'>
            <div className='flex  flex-col bg-slate-100 w-full p-2 rounded border border-gray-300 drop-shadow'>
                <p className='text-blue-400 text-base'>Newly Established Fast Food Restaurant for Sale in Bangalore, India</p>
                <div className='flex gap-1 py-1'>
                    <p className='line-clamp-4 text-sm'>
                        Fast food restaurant/pizza shop in South Bangalore with 20 chairs and receives 200 daily walk-ins. Pure veg, fresh baked, hand-tossed pizzas with more than 30 varieties.
                        Gourmet burgers.
                        Grilled sandwiches.
                        Beverages & mojitos. - Pure veg QSR (quick service restaurant) brand serving Indo-Italian cuisine.
                        - We have 2 outlets. One is in another part of Bangalore and started in 2018 and the new one is in South Bangalore started this year. We are only selling the South Bangalore branch along with its cloud kitchen brand.
                        - Cloud kitchen is well equipped and also located in Basavanagudi measuring 250 sq ft.
                        - On average, we receive 150 -200 footfall per day.
                        - Customer rating is good on Swiggy, Zomato & Amazon Food and has a 4.6 rating on Google.
                        - Have seating capacity for 19-20 customers and the ambiance is well appreciated. We also have outdoor seating space.
                        - Average sales per day are INR 12-18k on weekdays & INR 20k on weekends.
                        - 70% of our sales are from dine-in and the food delivery platforms bring in 30% of sales
                    </p>
                    <div >
                        <Avatar className='rounded-md' facebookId="100008343750912" size="75" />
                    </div>
                </div>
                <div className='flex gap-2 py-1'>
                    <div className='flex items-center'>
                        {/* <GradeIcon fontSize='small' color='warning' /> */}
                        <p className='text-sm'>8.3</p>
                    </div>
                    <div>
                        {/* <LocationOnIcon fontSize='small' color='error' /> */}
                        <p className='text-sm'>Bangalore</p>
                    </div>
                </div>
                <div className='flex flex-col gap-2 py-2'>
                    <div className='flex flex-col py-1 bg-slate-200 px-2'>
                        <div className='flex justify-between'>
                            <p className='text-sm'>Run Rate Sales</p>
                            <div className='flex gap-1'>
                                <p className='text-sm'>INR</p>
                                <p className='text-sm'>72 Lakh</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col py-1 bg-slate-200 px-2'>
                        <div className='flex justify-between'>
                            <p className='text-sm'>EBITDA Margin</p>
                            <div className='flex gap-1'>
                                <p className='text-sm'>30 %</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex py-2 divide-x-2 gap-2 items-center justify-end flex-wrap">
                    <div className='flex flex-col'>
                        <div>
                            <p className='text-sm'>
                                Financial Investment
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
                        <button className='px-4 rounded-md py-2 bg-[#f5d244]'>Contact Business</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SliderCard