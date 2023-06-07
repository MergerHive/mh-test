import React from 'react'
import CreateProfileMenu from '../../features/CreateProfileMenu/CreateProfileMenu';
import UserInfo from '../../features/UserInfo/UserInfo';
import Footer from '../../components/Footer';
import UserProfiles from '../../features/UserProfiles/UserProfiles';
import styles from "../../styles/lpstyle";

const DashBoard = () => {
  return (
    <>
      <div className={`bg-gradient-radial bg-[length:36px_36px] ${styles.paddingX} ${styles.flexCenter} h-full flex-col`}>
        <div className='h-full w-full items-center justify-cente py-24'>
          <div className='flex gap-2 w-full'>
            <div className='flex-[1]'>
              <UserInfo />
            </div>
            <div className='flex flex-col flex-[3] gap-2'>
              <CreateProfileMenu />
              <UserProfiles />
            </div>
            <div className='self-start w-1/5 p-6 border border-gray-200 bg-white shadow-[0_0_10px_0] shadow-gray-300'>
              <h1 className='font-medium text-sm my-2'>Frequently Asked Questions</h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default DashBoard