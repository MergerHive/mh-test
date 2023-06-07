import React, { useState } from 'react'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import BusinessFilter from '../../features/BusinessFilter/BusinessFilter';
import styles from "../../styles/lpstyle";
import Footer from "../../components/Footer"
import menu from '../../constants/bizprofilemenu.json'
import { useGetAllInvestorProfilesBasicQuery } from './InvestorSlice';
import InvestorCard from '../../components/ListingCards/InvestorCard';

const InvestorSearchPage = () => {
    const [locationTypeFilter, setLocFilter] = useState([])
    const [industryFilter, setIndustryFilter] = useState([])
    const [interestType, setInterestType] = useState(menu.businessProfileTypes[0])
    let interestTypeFilter = interestType.value
    let industryTypeFilter = industryFilter.map(item => item.name).join(",").replace(/&/gi, "%26");
    const {
        data,
        isLoading
    } = useGetAllInvestorProfilesBasicQuery({ interestTypeFilter, industryTypeFilter, locationTypeFilter }, {
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
                    <BusinessFilter setLocFilter={setLocFilter} setIndustryFilter={setIndustryFilter} intrestType={interestType} setInterestType={setInterestType} />
                    <div className='flex flex-col divide-y divide-gray-300 w-full bg-white border border-gray-200 shadow-[0_0_10px_0] shadow-gray-300'>
                        <div className='p-4 bg-gray-100'>
                            <h1 className='text-base font-bold'>Investors</h1>
                            <h1 className='text-sm'>Showing 1 - 15 of 71501 Investors. Sell or Finance your Business.</h1>
                        </div>

                        {isLoading ?
                            (<div>
                                Loading....
                            </div>
                            ) : (
                                <div className='p-4'>
                                    <div className='grid grid-cols-3 gap-4'>
                                        {data?.businessProfiles.map((item, index) => (<InvestorCard key={index} item={item} />))}
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

export default InvestorSearchPage