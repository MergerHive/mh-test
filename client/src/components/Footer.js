import React from 'react'

const Footer = () => {
    return (
        <div className='h-full w-full bg-blue-100 p-6'>
            <div className='flex flex-col divide-y-2 divide-blue-300 mx-auto px-20 pt-6 gap-20'>
                <div className='grid grid-cols-5'>
                    <div className='flex flex-col justify-start'>
                        <p className='text-base'>Businesses</p>
                        <p className='text-sm'>Businesses For Sale</p>
                        <p className='text-sm'>Investment Opportunities</p>
                        <p className='text-sm'>Businesses Seeking Loan</p>
                        <p className='text-sm'>Business Assets For Sale</p>
                    </div>
                    <div className='flex flex-col justify-start'>
                        <p className='text-base'>Investors</p>
                        <p className='text-sm'>Individual Investors</p>
                        <p className='text-sm'>Business Buyers</p>
                        <p className='text-sm'>Corporate Investors</p>
                        <p className='text-sm'>Venture Capital Firms</p>
                        <p className='text-sm'>Private Equity Firms</p>
                        <p className='text-sm'>Family Offices</p>
                        <p className='text-sm'>Business Lenders</p>
                    </div>
                    <div className='flex flex-col justify-start'>
                        <p className='text-base'>Advisors</p>
                        <p className='text-sm'>Businesses Seeking Advisors</p>
                        <p className='text-sm'>Investment Banks</p>
                        <p className='text-sm'>M&A Advisors</p>
                        <p className='text-sm'>Business Brokers</p>
                        <p className='text-sm'>CRE Brokers</p>
                        <p className='text-sm'>Financial Consultants</p>
                        <p className='text-sm'>Accountants</p>
                        <p className='text-sm'>Law Firms</p>
                    </div>
                    <div className='flex flex-col justify-start'>
                        <p className='text-base'>Get Started</p>
                        <p className='text-sm'>Sell your Business</p>
                        <p className='text-sm'>Finance your Business</p>
                        <p className='text-sm'>Buy a Business</p>
                        <p className='text-sm'>Invest in a Business</p>
                        <p className='text-sm'>Value your Business</p>
                        <p className='text-sm'>Register as Advisor</p>
                    </div>
                    <div className='flex flex-col justify-start'>
                        <p className='text-base'>Company</p>
                        <p className='text-sm'>About</p>
                        <p className='text-sm'>Testimonials</p>
                        <p className='text-sm'>Blog</p>
                        <p className='text-sm'>Press</p>
                        <p className='text-sm'>FAQs</p>
                    </div>
                    <div className='flex flex-col justify-start'>
                        <p className='text-base'>Franchises</p>
                        <p className='text-sm'>Franchises For Sale</p>
                        <p className='text-sm'>Franchise Investors</p>
                    </div>
                </div>
                <div className='flex justify-center py-2'>
                    <div>Copyright © 2022 Merger Hive Online Services Private Limited. All Rights Reserved.</div>
                </div>
            </div>
        </div>
    )
}

export default Footer