
import React from 'react'
import Footer from '../../components/Footer';
import Carousel from '../../components/slider/Carousel'
import FAQ from '../../features/lpcomponents/FAQ';
import Home from '../../features/lpcomponents/Home';
import investorsImg from '../../assets/logos/investorsImg.png'
import ownerImg from '../../assets/logos/ownerImg.png'
import franchiseImg from '../../assets/logos/franchise.png'
import styles from "../../styles/lpstyle";
import SliderCard from '../../components/slider/SliderCard';
import TestimonialCard from '../../components/slider/TestimonialCard';

const Landingpage = () => {
    return (
        <div>
            <div className={`bg-hero ${styles.paddingX} ${styles.flexCenter} flex-col`}>
                <Home />
            </div>
            <div className={`bg-blue-100 ${styles.paddingX} ${styles.flexCenter} flex-col`}>
                <CreateProfile />
            </div>
            <div className={`bg-hero ${styles.paddingX} ${styles.flexCenter} flex-col`}>
                <ListedBusiness />
            </div>
            <div className={`bg-blue-100 ${styles.paddingX} ${styles.flexCenter} flex-col`}>
                <ListedInvestors />
            </div>
            <div className={`bg-hero ${styles.paddingX} ${styles.flexCenter} flex-col`}>
                <ListedFranchise />
            </div>
            <div className={`bg-blue-100 ${styles.paddingX} ${styles.flexCenter} flex-col`}>
                <FeaturedList />
            </div>
            <div className={`bg-hero ${styles.paddingX} ${styles.flexCenter} flex-col`}>
                <WhyMergerHive />
            </div>
            <div className={`bg-blue-100 ${styles.paddingX} ${styles.flexCenter} flex-col`}>
                <Testimonials />
            </div>
            <div className={`bg-hero ${styles.paddingX} ${styles.flexCenter} flex-col`}>
                <FAQ />
            </div>
            <Footer />
        </div>
    )
}
const CreateProfile = () => {
    return (
        <div className='overflow-hidden w-full h-full'>
            <div className='flex flex-col py-6 gap-8'>
                <div className='flex flex-col gap-4 justify-center items-center' data-aos="fade-up">
                    <h1 className={`${styles.lpHeadingBlack}`}>The World’s #1 Business Acquisition Marketplace</h1>
                    <h2 className={`${styles.lpParaBlack}`}>Why Wait? business  Create Your Profile Now!</h2>
                </div>
                <div className='flex gap-12 h-full flex-col px-20 sm:flex-row 2xl:px-52' data-aos="fade-up">
                    <div className='flex gap-4 h-full flex-col justify-between items-center'>
                        <img src={investorsImg} className="cursor-pointer max-w-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110" alt="" />
                        <h2 className={`${styles.lpParaBlack} text-center`}>Looking to buy or invest in an online or SME business or franchises</h2>
                        <button className='bg-[#ffc040] text-lg tracking-wide font-medium cursor-pointer px-7 py-3 rounded-3xl hover:bg-[#d49108] transition-all'>Investors Profile</button>
                    </div>
                    <div className='flex gap-4 flex-col justify-between items-center'>
                        <img src={ownerImg} className="cursor-pointer max-w-sm  transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110" alt="" />
                        <h2 className={`${styles.lpParaBlack} text-center`}>Planning to sell your business or raise funds or sell assets</h2>
                        <button className='bg-[#ffc040] text-lg tracking-wide font-medium cursor-pointer px-7 py-3 rounded-3xl hover:bg-[#d49108] transition-all'>Business Profile</button>
                    </div>
                    <div className='flex gap-4 flex-col justify-between items-center'>
                        <img src={franchiseImg} className="cursor-pointer max-w-sm  transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110" alt="" />
                        <h2 className={`${styles.lpParaBlack} text-center`}>List your brand on MergerHive to give out franchises globally</h2>
                        <button className='bg-[#ffc040] text-lg tracking-wide font-medium cursor-pointer px-7 py-3 rounded-3xl hover:bg-[#d49108] transition-all'>Franchise Profile</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ListedBusiness = () => {
    return (
        <div className='h-full w-full bg-hero'>
            <div className='grid sm:grid-cols-3 items-center grid-cols-1 py-20'>
                <div>
                    <h1 className={`${styles.lpHeadingWhite}`}>Listed Businesses on MergerHive</h1>
                    <h2 className={`${styles.lpParaWhite} mb-12 mt-6`}>Go through thousands of trusted and verified businesses listed for sale, seeking funds. Filter businesses as per your requirements. Register as an Investor to buy a business or invest in them.</h2>
                    <button className='bg-[#ffc040] text-lg tracking-wide font-medium cursor-pointer px-7 py-3 rounded-3xl hover:bg-[#d49108] transition-all'>View All Businesses</button>
                </div>
                <div className='col-span-2 px-4 2xl:px-12'>
                    <Carousel >
                        <SliderCard />
                    </Carousel>
                </div>
            </div>

        </div>
    )
}

const ListedInvestors = () => {
    return (
        <div className='h-full w-full bg-blue-100'>
            <div className='grid sm:grid-cols-3 items-center grid-cols-1 py-20'>
                <div className='col-span-2 px-4 2xl:px-12'>
                    <Carousel >
                        <SliderCard />
                    </Carousel>
                </div>
                <div>
                    <h1 className={`${styles.lpHeadingBlack}`}>Listed Investors and Buyers on MergerHive</h1>
                    <h2 className={`${styles.lpParaBlack} mb-12 mt-6`}> View and connect with pre-screened and vetted investors, buyers, Private Equity Firms, VC Firms and Banks.</h2>
                    <button className='bg-[#ffc040] text-lg tracking-wide font-medium cursor-pointer px-7 py-3 rounded-3xl hover:bg-[#d49108] transition-all'>View all investors</button>
                </div>
            </div>

        </div>
    )
}

const ListedFranchise = () => {
    return (
        <div className='h-full w-full bg-hero'>
            <div className='grid sm:grid-cols-3 items-center grid-cols-1 py-20'>
                <div>
                    <h1 className={`${styles.lpHeadingWhite}`}>Top Brands on MergerHive for Franchise Opportunities</h1>
                    <h2 className={`${styles.lpParaWhite} mb-12 mt-6`}>Reputed and well known global brands looking for expansion through franchise model.</h2>
                    <button className='bg-[#ffc040] text-lg tracking-wide font-medium cursor-pointer px-7 py-3 rounded-3xl hover:bg-[#d49108] transition-all'>View all brands</button>
                </div>
                <div className='col-span-2 px-4 2xl:px-12'>
                    <Carousel >
                        <SliderCard />
                    </Carousel>
                </div>
            </div>

        </div>
    )
}

const FeaturedList = () => {
    return (
        <div className='h-full w-full bg-blue-100'>
            <div className='grid sm:grid-cols-3 items-center grid-cols-1 py-20'>
                <div className='col-span-2 px-4 2xl:px-12'>
                    <Carousel >
                        <SliderCard />
                    </Carousel>
                </div>
                <div>
                    <h1 className={`${styles.lpHeadingBlack}`}>Featured Advisors and Broakers on MergerHive</h1>
                    <h2 className={`${styles.lpParaBlack} mb-12 mt-6`}>Advisors on MergerHive include Business Brokers, M&A advisors, Investment Banks and Merchant Banks. These advisors are ready to work with a wide spectrum of businesses irrespective of size, caliber and growth stage.</h2>
                    <button className='bg-[#ffc040] text-lg tracking-wide font-medium cursor-pointer px-7 py-3 rounded-3xl hover:bg-[#d49108] transition-all'>View all advisors</button>
                </div>
            </div>
        </div>
    )
}

const WhyMergerHive = () => {
    return (
        <div className='h-full w-full bg-hero'>
            <div className='flex flex-col items-center mx-auto pt-6'>
                <h1 className={`${styles.lpHeadingWhite}`}>Why Choose MergerHive?</h1>
                <div className='grid md:grid-cols-3 px-12 sm:grid-cols-1 gap-20 py-16'>
                    <div className='flex flex-col gap-4'>
                        <h1 className={`${styles.lpSubHeadingWhite} text-center`}>Legitimate Businesses</h1>
                        <p className={`${styles.lpParaWhite} text-center`}>We reject most businesses before they ever go live, ensuring you’ll have the highest quality of options for your next acquisition.</p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h1 className={`${styles.lpSubHeadingWhite} text-center`}>Peer-to-peer global platform</h1>
                        <p className={`${styles.lpParaWhite} text-center`}>Merger Hive is a global marketplace and community that connects verified sellers of all types of businesses, with buyers and investors. </p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h1 className={`${styles.lpSubHeadingWhite} text-center`}>Assured Confidentiality</h1>
                        <p className={`${styles.lpParaWhite} text-center`}>The business / investor / buyer profiles on the platform are on a 'no-name' basis to protect any sensitive information that is associated with the business / users.</p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h1 className={`${styles.lpSubHeadingWhite} text-center`}>Free Listing</h1>
                        <p className={`${styles.lpParaWhite} text-center`}>Thousands of business owners, investors, lenders and advisors register with us for free after the screening process</p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h1 className={`${styles.lpSubHeadingWhite} text-center`}>Top notch assistance</h1>
                        <p className={`${styles.lpParaWhite} text-center`}>Complete handholding support, email, phone support until the deal is closed</p>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h1 className={`${styles.lpSubHeadingWhite} text-center`}>Customized Searching</h1>
                        <p className={`${styles.lpParaWhite} text-center`}>Search businesses or investors as per your requirements and preferences using our custom seaarch option</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Testimonials = () => {
    return (
        <div className='h-full w-full bg-blue-100'>
            <div className='flex flex-col mx-auto py-16 gap-14'>
                <h1 className={`${styles.lpHeadingBlack} text-center`}>Testimonials</h1>
                <Carousel slidesToShow={4} speed={1000} autoplaySpeed={2000} >
                    <TestimonialCard />
                </Carousel>
            </div>
        </div>
    )
}

export default Landingpage