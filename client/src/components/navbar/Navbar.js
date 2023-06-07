import React from 'react'
import { useState } from 'react'
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { FaBars } from 'react-icons/fa'
import logo from '../../assets/logos/FINAL_BRAND_LOGO.png'
import menuList from '../../constants/navmenu.json'
import './Navbar.css';
import useAuth from '../../hooks/useAuth';
import NavPopover from '../NavPopover/NavPopover';
import { useNavigate } from 'react-router-dom';
import Login from '../../features/login/Login';
import SignUp from '../../features/signup/SignUp';
import CountrySelect from '../../features/CountrySelect/CountrySelect';
import getIcon from '../../common/Icons';

const Navbar = () => {

    const [loginModal, setLoginModal] = useState(false)
    const [signupModal, setSignupModal] = useState(false)


    // change nav color when scrolling
    const { email, isLogIn } = useAuth()
    const navigate = useNavigate()

    const onLoginClick = () => setLoginModal(true)
    const onSignUpClick = () => setSignupModal(true)



    let login = isLogIn ?
        (
            <div className='flex items-center flex-row-reverse gap-2'>
                <NavPopover email={email} />
                <div className='flex flex-col items-end'>
                    <span className='text-xs text-white'>Welcome, Srinidhi</span>
                    <span className='text-xs text-white'>Credits : 0</span>
                </div>
            </div>
        ) :
        (
            <>
                <button className='px-5 py-2 rounded  bg-[#ffc040] cursor-pointer' onClick={onSignUpClick}>Sign Up</button>
                <button className='px-5 py-2 rounded  bg-green-600 text-white cursor-pointer' onClick={onLoginClick}>Login</button>
            </>
        )

    return (
        <>
            <div className={classNames('flex fixed bg-black bg-opacity-50 w-full z-10 items-center justify-between p-3')}>
                <div className='flex h-full items-center'>
                    <img src={logo} className='cursor-pointer w-[260px] h-[30px]' alt='logo' onClick={() => navigate('/')} />

                    <NavigationMenu.Root className="flex-1 px-3 NavigationMenuRoot mMainMenu">
                        <NavigationMenu.List className="NavigationMenuList">
                            {menuList.map((menuItem, idex) =>
                            (<NavigationMenu.Item key={idex}>
                                <NavigationMenu.Trigger className="NavigationMenuTrigger">
                                    {menuItem.mainTitle}{getIcon("downArrow", "1em", "", "CaretDown")} {/*<CaretDownIcon className="CaretDown" aria-hidden />*/}
                                </NavigationMenu.Trigger>
                                <NavigationMenu.Content className="NavigationMenuContent">
                                    <ul className="List two">
                                        {menuItem.subMenuList.map((subMenu, subIndex) => (<ListItem key={subIndex} title={subMenu.subTitle} className="text-[#ffc040]" href={subMenu.slug}>
                                            {subMenu.subTitleDesc}
                                        </ListItem>))}
                                    </ul>
                                </NavigationMenu.Content>
                            </NavigationMenu.Item>)
                            )}
                            <NavigationMenu.Indicator className="NavigationMenuIndicator">
                                <div className="Arrow" />
                            </NavigationMenu.Indicator>
                        </NavigationMenu.List>
                        <div className="ViewportPosition">
                            <NavigationMenu.Viewport className="NavigationMenuViewport" />
                        </div>
                    </NavigationMenu.Root>
                    <CountrySelect />
                </div>

                <div className='flex gap-2 mMainMenu px-5'>
                    {login}
                </div>
                <div className='hamburger'>
                    <FaBars size={30} style={{ color: '#ffffff' }} />
                </div>
            </div>
            <Login isOpen={loginModal} onClose={() => (setLoginModal(false))} />
            <SignUp isOpen={signupModal} onClose={() => (setSignupModal(false))} />
        </>
    );
};

const ListItem = React.forwardRef(({ className, children, title, ...props }, forwardedRef) => (
    <li>
        <NavigationMenu.Link asChild>
            <a className={classNames('ListItemLink', className)} {...props} ref={forwardedRef}>
                <div className="ListItemHeading">{title}</div>
                <p className="ListItemText">{children}</p>
            </a>
        </NavigationMenu.Link>
    </li>
));

export default Navbar

