import React from 'react'
import { useParams } from 'react-router-dom';
import getIcon from '../../common/Icons';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import Footer from '../../components/Footer';
import useAuth from '../../hooks/useAuth';
import styles from "../../styles/lpstyle";
import { useGetInvestorProfileByProfileIDQuery } from './InvestorSlice';
import MHLoadingOverlay from '../../components/LoadingComponent/MHLoadingOverlay';
import InfoDisplaySection from '../../components/sections/InfoDisplaySection';
import SendProposal from '../../features/ContactBusiness/SendProposal';
import Avatar from 'react-avatar';
import ContactInvestor from '../../features/ContactInvestor/ContactInvestor';

const DisplayInvestorProfile = () => {
    const { firstName } = useAuth()
    const { profileID } = useParams()
    const {
        data,
        isLoading
    } = useGetInvestorProfileByProfileIDQuery(profileID, {
        refetchOnMountOrArgChange: true
    })

    let breadItems = [
        {
            label: "Home",
            url: "Home"
        },
        {
            label: "Business",
            url: "Business"
        },
        {
            label: "India",
            url: "India"
        },
        {
            label: "Healthcare",
            url: "Healthcare"
        }
    ]

    const onProfileDownloadClick = () => {
        console.log("onProfileDownloadClick")
    }

    const onBookMarkClick = () => {
        console.log("onBookMarkClick")
    }

    const Overview = () => {
        const divsArray = [
            { label: 'Investor Designation', value: data?.investorProfile?.designation || 'Not Available' },
            {
                label: 'Company Name', value: data?.investorProfile.isLocked ? <><div className='flex gap-1 items-center'>
                    {getIcon("lock", "1em")}
                    <h1 className='font-bold text-sm'>Locked</h1>
                </div></>
                    : (data?.investorProfile?.company || 'Not Available')
            },
            {
                label: 'Company Website', value: data?.investorProfile.isLocked ? <><div className='flex gap-1 items-center'>
                    {getIcon("lock", "1em")}
                    <h1 className='font-bold text-sm'>Locked</h1>
                </div></>
                    : (data?.investorProfile?.companyWebsite || 'Not Available')
            },
            { label: 'Profile Status', value: <div className='flex items-center gap-1'><div>{getIcon("online", "0.50em", "green")}</div> <div>{data?.investorProfile?.isProfileActive ? "Active" : "Inactive"}</div></div> },
            { label: 'Interest Type', value: data?.investorProfile?.intrestTypes.map(item => item?.label).join(', ') || 'Not Available' },
            { label: 'Location Preference', value: data?.investorProfile?.companyLocation[0]?.description || 'Not Available' },
            { label: 'Professional Summary', value: data?.investorProfile?.introMsg || 'Not Available' },
            { label: 'Investment Criteria', value: data?.investorProfile?.investCriteria || 'Not Available' },
            { label: 'Intrested Industries/Sectors', value: data?.investorProfile?.industry.map(item => item?.title).join(', ') || 'Not Available' },
        ];
        return <InfoDisplaySection title="Business Overview" divs={divsArray} />;
    };

    return (
        <>
            {isLoading ? <MHLoadingOverlay /> : <div className={`bg-gradient-radial bg-[length:36px_36px] ${styles.paddingX} ${styles.flexCenter} h-full flex-col`}>
                <div className='h-full w-full max-w-5xl md:max-w-6xl py-24'>
                    <div className='flex flex-col p-4 w-full  bg-white border border-gray-200 shadow-[0_0_10px_0] shadow-gray-300 gap-2'>
                        <span className='text-sm'>
                            {`Hello ${firstName}, this is a preview of your profile -`} <span className='font-bold'>{data.companyName}</span>{`, Profiles with complete and correct information will be approved on priority.You can manage your profile using the links. Any updates to the profile will be followed up by verification call before making it live again.`}
                        </span>
                    </div>
                    <Breadcrumb items={breadItems} />
                    <div className='flex gap-2'>
                        <div className='flex flex-col px-4 py-2 w-full  bg-white border border-gray-200 shadow-[0_0_10px_0] shadow-gray-300'>
                            <div>
                                <h1 className='text-lg font-medium text-[#4183c4]'>{data?.investorProfile?.investorType.label}</h1>
                                <h1 className='text-sm'>{data?.investorProfile?.companyLocation[0]?.description}</h1>
                            </div>
                            <div className='max-w-5xl m-auto w-full'>
                                <div className='flex gap-4'>
                                    <div className='w-1/2 py-5 w-full'>
                                        <div className='flex gap-4 w-full'>
                                            {data?.investorProfile?.investorImage[0]?.image ? <Avatar className='rounded-md border' src={data?.investorProfile?.investorImage[0]?.image} size="200" /> : <Avatar className='rounded-md' facebookId="100008343750912" size="200" />}
                                            <div className='flex flex-col gap-2'>
                                                <h1 className='text-sm font-bold'>Overall rating</h1>
                                                <div className='flex gap-1 items-center'>
                                                    {getIcon("ratingStar", "0.90em", "gold")}
                                                    <h1 className='font-bold text-sm'>{data?.investorProfile?.rating}/10</h1>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <>
                                                    <h1 className='text-sm font-bold'>Name, Phone, Email</h1>
                                                    <div className='flex gap-1 items-center'>
                                                        {getIcon("user", "1em")}
                                                        {
                                                            data?.investorProfile?.isLocked ? <div className='flex gap-1 items-center'>
                                                                {getIcon("lock", "1em")}
                                                                <h1 className='font-bold text-sm'>Locked</h1>
                                                            </div> :
                                                                <h1 className='text-sm'>{data?.investorProfile?.fullName ? data?.investorProfile?.fullName : "Not Available"}</h1>
                                                        }
                                                    </div>
                                                    <div className='flex gap-1 items-center'>
                                                        {getIcon("phone", "1em")}
                                                        {
                                                            data?.investorProfile?.isLocked ? <div className='flex gap-1 items-center'>
                                                                {getIcon("lock", "1em")}
                                                                <h1 className='font-bold text-sm'>Locked</h1>
                                                            </div> :
                                                                <h1 className='text-sm'>{data?.investorProfile?.phNumber ? "+" + data?.investorProfile?.phNumber : "Not Available"}</h1>
                                                        }
                                                    </div>
                                                    <div className='flex gap-1 items-center'>
                                                        {getIcon("mail", "1em")}
                                                        {
                                                            data?.investorProfile?.isLocked ? <div className='flex gap-1 items-center'>
                                                                {getIcon("lock", "1em")}
                                                                <h1 className='font-bold text-sm'>Locked</h1>
                                                            </div> :
                                                                <h1 className='text-sm'>{data?.investorProfile?.email ? data?.investorProfile?.email : "Not Available"}</h1>
                                                        }
                                                    </div>
                                                </>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Overview />
                                <div className='border border-gray-200 rounded w-full my-2'>
                                    <div>
                                        <h1 className='p-2 bg-gray-100 font-bold text-base'>{"Business Documents"}</h1>
                                    </div>
                                    <div className='p-2'>
                                        <div className='grid grid-cols-6 gap-2'>
                                            {data?.investorProfile?.investorFiles?.length ? data?.investorProfile?.investorFiles?.map((fileObject, index) => (
                                                <div key={index}>
                                                    <a href={fileObject?.fileURL} className="text-xs" download>{getIcon("file", "5em", "gold")}{fileObject.fileName}</a>
                                                </div>
                                            )) : 'Not Available'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {data?.investorProfile?.isLocked ? <ContactInvestor /> :
                            <SendProposal />
                        }
                    </div>
                </div>
            </div >}
            <Footer />
        </>
    )
}

export default DisplayInvestorProfile