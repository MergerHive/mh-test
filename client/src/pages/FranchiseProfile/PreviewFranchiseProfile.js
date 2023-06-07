import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-carousel-minimal';
import getIcon from '../../common/Icons';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import Footer from '../../components/Footer';
import useAuth from '../../hooks/useAuth';
import styles from "../../styles/lpstyle";
import { useSelector, useDispatch } from 'react-redux'
import investorsImg from '../../assets/defaults/PlaceholderImage.jpg'
import { getNumberInWords, getExchangeRates, getFormattedNumber } from '../../common/converterUtil'
import { setExchangeRate, setIsLoading } from '../../app/configSlice';
import MHLoadingOverlay from '../../components/LoadingComponent/MHLoadingOverlay';
import InfoDisplaySection from '../../components/sections/InfoDisplaySection';
import { useGetFranchiseProfileByProfileIDandUserIDQuery } from './FranchiseProfileSlice';

const PreviewFranchiseProfile = () => {
    const { firstName } = useAuth()
    const { profileID } = useParams()
    const dispatch = useDispatch()
    const { data, isLoading } = useGetFranchiseProfileByProfileIDandUserIDQuery(profileID, {
        refetchOnMountOrArgChange: true
    })
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/mergerhive-7aeeb.appspot.com/o/defaultImages%2FPlaceholderImage.jpg?alt=media&token=5b46df17-5e0f-4b81-89bd-0f0f8cfe3210"
    let { country, exchangeRate } = useSelector(state => state.config)

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

    const updateExchangeRate = async () => {
        dispatch(setIsLoading(true))
        let exchangeRateRsp = await getExchangeRates(data?.inputCurrency?.currency, country?.currency)
        dispatch(setExchangeRate(exchangeRateRsp))
        dispatch(setIsLoading(false))
    }

    useEffect(() => {
        if (isLoading) {
            dispatch(setIsLoading(true))
        } else {
            dispatch(setIsLoading(false))
            if (data?.inputCurrency?.currency !== country?.currency) {
                updateExchangeRate()
            } else {
                dispatch(setExchangeRate(1))
            }
        }
    }, [isLoading, country, data, dispatch])

    const Overview = () => {
        const divsArray = [
            { label: 'Brand Name', value: data?.brandName || 'Not Available' },
            { label: 'Brand Website', value: data?.website || 'Not Available' },
            { label: 'You are a(n)', value: data?.designation || 'Not Available' },
            { label: 'I am Offering', value: data?.brandOffering?.label || 'Not Available' },
            { label: 'Business Industry', value: data?.industry.map(item => item?.title).join(', ') || 'Not Available' },
            { label: 'Location of The Brand Headquarters(City)', value: data?.companyLocation?.map(item => item?.title).join(', ') || 'Not Available' },
            { label: 'Brand Established Year', value: data?.yoe || 'Not Available' },
            { label: 'How many outlets do you already have globally ?', value: data?.noOutlets || 'Not Available' },
            { label: 'Looking to expand in Cities/Countries', value: data?.expandLocation?.map(item => item?.description).join(', ') || 'Not Available' },
            { label: 'About Your Brand', value: data?.brandIntro || 'Not Available' },
            { label: 'Mention all products/services your brand provides', value: data?.brandOffers || 'Not Available' },
            { label: 'Expectations from the user who takes up this oppurtunity', value: data?.userExpectations || 'Not Available' },
            { label: 'Support to the franchisee by the owner', value: data?.ownerSupport || 'Not Available' },
            { label: 'Procedure to Obtain Franchisee', value: data?.procedure || 'Not Available' }

        ];
        return <InfoDisplaySection title="Brand Overview" divs={divsArray} />;
    };

    const FranchiseDetails = () => {
        const divsArray = [
            { label: 'Space Required', value: data?.spaceRqd || 'Not Available' },
            { label: 'Average No. of Staff Required', value: data?.avgStaff || 'Not Available' },
            { label: 'Total Investment Needed', value: country.currency + " " + getFormattedNumber(data.totalInvestments, exchangeRate) },
            { label: 'Brand Fee Included in Investment', value: country.currency + " " + getFormattedNumber(data.brandFee, exchangeRate) },
            { label: 'Royalty / Commission Charged', value: country.currency + " " + getFormattedNumber(data.commission, exchangeRate) },
            { label: 'Average Monthly Sale', value: country.currency + " " + getFormattedNumber(data.avgMonthlySales, exchangeRate) }
        ];
        return <InfoDisplaySection title="Franchise Details" divs={divsArray} />;
    };


    const SideTableData = () => {
        let tableData = [
            { label: 'EBITDA Maring', value: "20%" },
            { label: 'Legal  Entity Type', value: data?.legalEntityType?.label || 'Not Available' },
            { label: 'Employees', value: data?.numOfEmployees || 'Not Available' },
            { label: 'Established Year', value: data?.yoe || 'Not Available' },
            { label: 'Listed By', value: data.designation?.label || 'Not Available' },
            { label: 'Status', value: data?.isProfileActive ? "Yes" : "No" }
        ]
        return (
            tableData.map((item, index) => (
                <div className='flex justify-center flex-col items-center bg-[#f1f5f9] px-3 py-3' key={index}>
                    <h1 className='font-semibold text-base'>{item?.label}</h1>
                    <h1 className='text-sm'>{item.value}</h1>
                </div>
            ))
        )
    }
    return (
        <>
            {isLoading ? <MHLoadingOverlay /> : <div className={`bg-gradient-radial bg-[length:36px_36px] ${styles.paddingX} ${styles.flexCenter} h-full flex-col`}>
                <div className='h-full w-full max-w-5xl md:max-w-6xl py-24'>
                    <div className='flex flex-col p-4 w-full  bg-white border border-gray-200 shadow-[0_0_10px_0] shadow-gray-300 gap-2'>
                        <span className='text-sm'>
                            {`Hello ${firstName}, this is a preview of your profile -`} <span className='font-bold'>{data?.companyName}</span>{`, Profiles with complete and correct information will be approved on priority.You can manage your profile using the links. Any updates to the profile will be followed up by verification call before making it live again.`}
                        </span>
                    </div>
                    <Breadcrumb items={breadItems} />
                    <div className='flex flex-col px-4 py-2 w-full  bg-white border border-gray-200 shadow-[0_0_10px_0] shadow-gray-300'>
                        <div>
                            <h1 className='text-lg font-medium text-[#4183c4]'>{data?.brandName}</h1>
                            <h1 className='text-sm'>{data.companyLocation[0]?.description}</h1>
                        </div>
                        <div className='flex gap-4'>
                            <div className='w-1/2'>
                                {(data.franchiseImages.length > 0) ? <Carousel
                                    data={data?.franchiseImages?.length ? data.franchiseImages : defaultImage}
                                    time={2000}
                                    width="100%"
                                    radius="4px"
                                    slideNumber={true}
                                    slideNumberStyle={{ fontSize: '20px', fontWeight: 'bold' }}
                                    automatic={true}
                                    dots={true}
                                    pauseIconColor="white"
                                    pauseIconSize="40px"
                                    slideBackgroundColor="darkgrey"
                                    slideImageFit="contain"
                                    thumbnailWidth="100px"
                                    style={{
                                        textAlign: "center",
                                        maxHeight: "500px",
                                        margin: "20px auto",
                                    }}
                                /> :
                                    <img src={investorsImg} className="rounded h-[400px] w-full my-5" alt="" />
                                }
                            </div>
                            <div className='w-1/2 py-5'>
                                <div className='flex gap-4'>
                                    <div className='flex flex-col gap-2'>
                                        <h1 className='text-sm font-bold'>Overall rating</h1>
                                        <div className='flex gap-1 items-center'>
                                            {getIcon("ratingStar", "0.90em", "gold")}
                                            <h1 className='font-bold text-sm'>{data?.rating}/10</h1>
                                        </div>
                                        <div className='flex'>
                                            <h1 className='text-sm font-bold'>Brand Name :</h1>
                                            <h1 className='text-sm'>&nbsp;{data?.brandName}</h1>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <>
                                            <h1 className='text-sm font-bold'>Name, Phone, Email</h1>
                                            <div className='flex gap-1 items-center'>
                                                {getIcon("user", "1em")}
                                                <h1 className='text-sm'>{data?.name ? data.name : "Not Available"}</h1>
                                            </div>
                                            <div className='flex gap-1 items-center'>
                                                {getIcon("phone", "1em")}
                                                <h1 className='text-sm'>{data?.phNumber ? "+" + data.phNumber : "Not Available"}</h1>
                                            </div>
                                            <div className='flex gap-1 items-center'>
                                                {getIcon("mail", "1em")}
                                                <h1 className='text-sm'>{data?.email ? data.email : "Not Available"}</h1>
                                            </div>
                                        </>
                                    </div>
                                </div>
                                <div className='grid grid-cols-3 gap-1 my-3'>
                                    <SideTableData />
                                </div>
                            </div>
                        </div>
                        <div className='max-w-5xl m-auto w-full'>
                            <Overview />
                            <FranchiseDetails />
                            <div className='border border-gray-200 rounded w-full my-2'>
                                <div>
                                    <h1 className='p-2 bg-gray-100 font-bold text-base'>{"Business Documents"}</h1>
                                </div>
                                <div className='p-2'>
                                    <div className='grid grid-cols-6 gap-2'>
                                        {data?.franchiseFiles?.length ? data?.franchiseFiles?.map((fileObject, index) => (
                                            <div key={index}>
                                                <a href={fileObject?.fileURL} className="text-xs" download>{getIcon("file", "5em", "gold")}{fileObject.fileName}</a>
                                            </div>
                                        )) : 'Not Available'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >}
            <Footer />
        </>
    )
}

export default PreviewFranchiseProfile