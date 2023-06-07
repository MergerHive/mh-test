import React from 'react'
import Avatar from 'react-avatar';

const TestimonialCard = () => {
    return (
        <div className='px-3 max-w-md'>
            <div className='flex  flex-col bg-slate-100 w-full p-4 rounded gap-4 items-center border border-gray-300 drop-shadow'>

                <Avatar className='rounded-full' facebookId="100008343750912" size="100" />
                <h1>John Doe</h1>
                <p className='line-clamp-4'>
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
            </div>
        </div>
    )
}

export default TestimonialCard