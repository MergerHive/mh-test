import React from 'react'


const SendProposal = ({ investorId }) => {
    const handleContactBusinessClick = () => {
        console.log("Send Proposal")
    }

    return (
        <div className='flex flex-col gap-2 self-start max-w-xs p-6 w-full border border-gray-200 bg-white shadow-[0_0_10px_0] shadow-gray-300'>
            <div>
                <h1 className='font-semibold text-base text-blue-600'>Send Business Proposal</h1>
                <h1 className='text-[13px]'>To encourage serious businesses, sending proposals is allowed only on premium plans</h1>
            </div>
            <div>
                <form>
                    <div className='flex flex-col gap-2'>
                        <button type="submit" className='bg-[#ffc040] cursor-pointer rounded-3xl text-center font-bold px-5 py-3' onClick={handleContactBusinessClick}> Send Proposal </button>
                    </div>
                </form>
            </div>

        </div >
    )
}

export default SendProposal