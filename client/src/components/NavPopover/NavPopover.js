import { React, useEffect } from 'react';
import * as Popover from '@radix-ui/react-popover';
import './NavPopover.css';
import getIcon from '../../common/Icons';
import { useSendLogoutMutation } from '../../features/login/authApiSlice';
import { useNavigate } from 'react-router-dom';

const NavPopover = ({ email }) => {
    const navigate = useNavigate()
    const menu = [
        {
            id: "invoices",
            name: "Invoices",
            icon: "invoices",
            slig: "invoices"
        },
        {
            id: "bookmark",
            name: "Bookmarks and History",
            icon: "bookmark",
            slig: "bookmark"
        },
        {
            id: "inbox",
            name: "Inbox",
            icon: "inbox",
            slig: "inbox"
        },
        {
            id: "notifications",
            name: "Notifications",
            icon: "notifications",
            slig: "notifications"
        },
        {
            id: "settings",
            name: "Settings",
            icon: "settings",
            slig: "settings"
        },
        {
            id: "logout",
            name: "Logout",
            icon: "logout",
            slig: "logout"
        }
    ]

    const [sendLogout, {
        isSuccess
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const handlePopMenuClick = (event, action) => {
        if (action === "logout") {
            localStorage.setItem('persist', false);
            sendLogout()
        }
    }
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <div className='flex cursor-pointer items-center flex-col justify-center  rounded-full bg-[#ffc040] border-2 border-gray-300 w-[36px] h-[36px] '>
                    <span className='font-bold text-white capitalize'>{email.charAt(0)}</span>
                </div>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content className="PopoverContent">
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-2 items-center p-4'>
                            <div className='flex items-center justify-center w-[80px] h-[80px] bg-red-500 rounded-md'>
                                <span className='font-bold text-white capitalize text-3xl'>{email.charAt(0)}</span>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <div>
                                    <div className='text-base'>Srinidhi</div>
                                    <div className='text-sm'>{email}</div>
                                </div>
                                <div>
                                    <button className='bg-[#ffc040] text-base font-normal cursor-pointer px-3 py-2 rounded-lg hover:bg-[#d49108] transition-all' onClick={() => navigate('/dashboard')}>My Dashboard</button>
                                </div>
                            </div>
                        </div>
                        <div className='border-t-[1px] border-gray-300 bg-gray-100 px-4 py-2'>
                            <div className="grid grid-cols-1 divide-y gap-3 justify-center items-center">
                                {menu.map((item, index) => (
                                    <div className='flex gap-2 py-1 items-center cursor-pointer' onClick={(event) => handlePopMenuClick(event, item.slig)} key={index}>
                                        {getIcon(item.icon, "1.5em")}
                                        <div className='text-sm'>{item.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Popover.Close className="PopoverClose" aria-label="Close">
                        {getIcon("close", "1.2em","","cursor-pointer")}
                    </Popover.Close>
                    <Popover.Arrow className="PopoverArrow" />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
    ;

export default NavPopover;