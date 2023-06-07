import React, { useState } from 'react'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import styles from "../../styles/lpstyle";
import Footer from "../../components/Footer"
import { useGetAllFranchiseProfilesBasicQuery } from './FranchiseProfileSlice';
import FranchiseFilter from '../../features/BusinessFilter/FranchiseFilter';
import FranchiseCard from '../../components/ListingCards/FranchiseCard';

const FranchiseSearchPage = () => {
    const [locationTypeFilter, setLocFilter] = useState([])
    const [industryFilter, setIndustryFilter] = useState([])
    let industryTypeFilter = industryFilter.map(item => item.name).join(",").replace(/&/gi, "%26");
    const {
        data,
        isLoading
    } = useGetAllFranchiseProfilesBasicQuery({ industryTypeFilter, locationTypeFilter }, {
        refetchOnMountOrArgChange: true
    })

    let breadItems = [
        {
            label: "Home",
            url: "Home"
        },
        {
            label: "Investors",
            url: "Investors"
        }
    ]

    return (
        <div className={`bg-gradient-radial bg-[length:36px_36px] ${styles.paddingX} ${styles.flexCenter} h-full flex-col`}>
            <div className='h-full w-full items-center justify-cente py-24'>
                <Breadcrumb items={breadItems} />
                <div className='flex gap-2'>
                    <FranchiseFilter setLocFilter={setLocFilter} setIndustryFilter={setIndustryFilter} />
                    <div className='flex flex-col divide-y divide-gray-300 w-full bg-white border border-gray-200 shadow-[0_0_10px_0] shadow-gray-300'>
                        <div className='p-4 bg-gray-100'>
                            <h1 className='text-base font-bold'>Franchise</h1>
                            <h1 className='text-sm'>Showing 1 - 15 of 71501 Investors. Sell or Finance your Business.</h1>
                        </div>

                        {isLoading ?
                            (<div>
                                Loading....
                            </div>
                            ) : (
                                <div className='p-4'>
                                    <div className='grid grid-cols-3 gap-4'>
                                        {data?.franchiseProfiles.map((item, index) => (<FranchiseCard key={index} item={item} />))}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div >
            <Footer />
        </div >
    )
}

export default FranchiseSearchPage