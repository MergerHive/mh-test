import React from 'react'
import cx from "classnames"

const ProfileProgress = ({ stage }) => {
    let stages = [
        {
            name: "Provide Details",
            status: "inProgress"
        },
        {
            name: "Verification Call",
            status: "todo"
        },
        {
            name: "Approval",
            status: "todo"
        }
    ]
    return (
        <div className='self-start p-6 w-full border border-gray-200 bg-white shadow-[0_0_10px_0] shadow-gray-300'>
            <h1 className='font-medium text-sm my-2'>Your Profile Status</h1>
            <ul >
                {stages.map((item, index) => (
                    <div key={index}>
                        <li>
                            <div className={cx('h-[10px] w-[10px] rounded-full inline-block',
                                {
                                    'bg-gray-500': stage < index,
                                    'bg-none border-2 border-green-500': stage === index,
                                    'bg-green-500': stage > index,
                                }
                            )}></div>
                            <p className='text-sm inline-block ml-4'>{item.name}</p>
                        </li>
                        {(index < stages.length - 1) && < li > <div className="h-10 w-[2px] ml-1 grey"></div></li>}
                    </div>
                ))}

            </ul>
        </div>
    )
}

export default ProfileProgress
