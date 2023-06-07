import React from 'react'
import heroImg from '../../assets/logos/hero-img.png'
import styles from '../../styles/lpstyle'

const Home = () => {
    return (
        <div className='h-full w-full bg-hero overflow-hidden py-24'>
            <div className='flex items-center justify-center sm:flex-row flex-col-reverse'>
                <div>
                    <h1 className={`${styles.lpHeadingWhite}`}>Better Solutions For Your Business</h1>
                    <h2 className={`${styles.lpParaWhite} mb-12 mt-6`}>We always try to provide the best business solutions for clients to grow up their business very sharply and smoothly.</h2>
                    <button className='bg-[#ffc040] text-lg tracking-wide font-medium cursor-pointer px-7 py-3 rounded-3xl hover:bg-[#d49108] transition-all'>View Listings</button>
                </div>
                <div>
                    <img src={heroImg} alt="" className='animate-up-down' />
                </div>
            </div>
        </div>
    )
}

export default Home