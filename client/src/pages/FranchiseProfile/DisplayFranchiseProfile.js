import React from 'react'
import { useParams } from 'react-router-dom';
import getIcon from '../../common/Icons';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import { Carousel } from 'react-carousel-minimal';
import Footer from '../../components/Footer';
import useAuth from '../../hooks/useAuth';
import styles from "../../styles/lpstyle";
import MHLoadingOverlay from '../../components/LoadingComponent/MHLoadingOverlay';
import InfoDisplaySection from '../../components/sections/InfoDisplaySection';
import SendProposal from '../../features/ContactBusiness/SendProposal';
import ContactInvestor from '../../features/ContactInvestor/ContactInvestor';
import { useGetFranchiseProfileByProfileIDQuery } from './FranchiseProfileSlice';
import { useSelector, useDispatch } from 'react-redux'
import { setExchangeRate, setIsLoading } from '../../app/configSlice';
import { getExchangeRates, getFormattedNumber } from '../../common/converterUtil'
import investorsImg from '../../assets/defaults/PlaceholderImage.jpg'

const DisplayFranchiseProfile = () => {
    const { firstName } = useAuth()
    const { profileID } = useParams()
    const dispatch = useDispatch()
    const {
        data,
        isLoading
    } = useGetFranchiseProfileByProfileIDQuery(profileID, {
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
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/mergerhive-7aeeb.appspot.com/o/defaultImages%2FPlaceholderImage.jpg?alt=media&token=5b46df17-5e0f-4b81-89bd-0f0f8cfe3210"
    let { country, exchangeRate } = useSelector(state => state.config)
    const updateExchangeRate = async () => {
        dispatch(setIsLoading(true))
        let exchangeRateRsp = await getExchangeRates(data?.franchiseProfile?.inputCurrency?.currency, country?.currency)
        dispatch(setExchangeRate(exchangeRateRsp))
        dispatch(setIsLoading(false))
    }

    const onProfileDownloadClick = () => {
        console.log("onProfileDownloadClick")
    }

    const onBookMarkClick = () => {
        console.log("onBookMarkClick")
    }

    const Overview = () => {
        const divsArray = [
            { label: 'Brand Name', value: data?.franchiseProfile?.brandName || 'Not Available' },
            { label: 'Brand Website', value: data?.franchiseProfile?.website || 'Not Available' },
            { label: 'You are a(n)', value: data?.franchiseProfile?.designation || 'Not Available' },
            { label: 'I am Offering', value: data?.franchiseProfile?.brandOffering?.label || 'Not Available' },
            { label: 'Business Industry', value: data?.franchiseProfile?.industry.map(item => item?.title).join(', ') || 'Not Available' },
            { label: 'Location of The Brand Headquarters(City)', value: data?.franchiseProfile?.companyLocation?.map(item => item?.title).join(', ') || 'Not Available' },
            { label: 'Brand Established Year', value: data?.franchiseProfile?.yoe || 'Not Available' },
            { label: 'How many outlets do you already have globally ?', value: data?.franchiseProfile?.noOutlets || 'Not Available' },
            { label: 'Looking to expand in Cities/Countries', value: data?.franchiseProfile?.expandLocation?.map(item => item?.description).join(', ') || 'Not Available' },
            { label: 'About Your Brand', value: data?.franchiseProfile?.brandIntro || 'Not Available' },
            { label: 'Mention all products/services your brand provides', value: data?.franchiseProfile?.brandOffers || 'Not Available' },
            { label: 'Expectations from the user who takes up this oppurtunity', value: data?.franchiseProfile?.userExpectations || 'Not Available' },
            { label: 'Support to the franchisee by the owner', value: data?.franchiseProfile?.ownerSupport || 'Not Available' },
            { label: 'Procedure to Obtain Franchisee', value: data?.franchiseProfile?.procedure || 'Not Available' }

        ];
        return <InfoDisplaySection title="Brand Overview" divs={divsArray} />;
    };

    const FranchiseDetails = () => {
        const divsArray = [
            { label: 'Space Required', value: data?.franchiseProfile?.spaceRqd || 'Not Available' },
            { label: 'Average No. of Staff Required', value: data?.franchiseProfile?.avgStaff || 'Not Available' },
            { label: 'Total Investment Needed', value: country.currency + " " + getFormattedNumber(data?.franchiseProfile?.totalInvestments, exchangeRate) },
            { label: 'Brand Fee Included in Investment', value: country.currency + " " + getFormattedNumber(data?.franchiseProfile?.brandFee, exchangeRate) },
            { label: 'Royalty / Commission Charged', value: country.currency + " " + getFormattedNumber(data?.franchiseProfile?.commission, exchangeRate) },
            { label: 'Average Monthly Sale', value: country.currency + " " + getFormattedNumber(data?.franchiseProfile?.avgMonthlySales, exchangeRate) }
        ];
        return <InfoDisplaySection title="Franchise Details" divs={divsArray} />;
    };


    const SideTableData = () => {
        let tableData = [
            { label: 'EBITDA Maring', value: "20%" },
            { label: 'Legal  Entity Type', value: data?.franchiseProfile?.legalEntityType?.label || 'Not Available' },
            { label: 'Employees', value: data?.franchiseProfile?.numOfEmployees || 'Not Available' },
            { label: 'Established Year', value: data?.franchiseProfile?.yoe || 'Not Available' },
            { label: 'Listed By', value: data?.franchiseProfile?.designation?.label || 'Not Available' },
            { label: 'Status', value: data?.franchiseProfile?.isProfileActive ? "Yes" : "No" }
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
                            {`Hello ${firstName}, this is a preview of your profile -`} <span className='font-bold'>{data?.franchiseProfile?.companyName}</span>{`, Profiles with complete and correct information will be approved on priority.You can manage your profile using the links. Any updates to the profile will be followed up by verification call before making it live again.`}
                        </span>
                    </div>
                    <Breadcrumb items={breadItems} />
                    <div className='flex flex-col px-4 py-2 w-full  bg-white border border-gray-200 shadow-[0_0_10px_0] shadow-gray-300'>
                        <div>
                            <h1 className='text-lg font-medium text-[#4183c4]'>{data?.franchiseProfile?.brandName}</h1>
                            <h1 className='text-sm'>{data?.franchiseProfile?.companyLocation[0]?.description}</h1>
                        </div>
                        <div className='flex gap-4'>
                            <div className='w-1/2'>
                                {(data?.franchiseImages?.length > 0) ? <Carousel
                                    data={data?.franchiseProfile?.franchiseImages?.length ? data?.franchiseProfile?.franchiseImages : defaultImage}
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
                                            <h1 className='font-bold text-sm'>{data?.franchiseProfile?.rating}/10</h1>
                                        </div>
                                        <div className='flex'>
                                            <h1 className='text-sm font-bold'>Brand Name :</h1>
                                            <h1 className='text-sm'>&nbsp;{data?.franchiseProfile?.brandName}</h1>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <>
                                            <h1 className='text-sm font-bold'>Name, Phone, Email</h1>
                                            <div className='flex gap-1 items-center'>
                                                {getIcon("user", "1em")}
                                                <h1 className='text-sm'>{data?.franchiseProfile?.name ? data?.franchiseProfile?.name : "Not Available"}</h1>
                                            </div>
                                            <div className='flex gap-1 items-center'>
                                                {getIcon("phone", "1em")}
                                                <h1 className='text-sm'>{data?.franchiseProfile?.phNumber ? "+" + data?.franchiseProfile?.phNumber : "Not Available"}</h1>
                                            </div>
                                            <div className='flex gap-1 items-center'>
                                                {getIcon("mail", "1em")}
                                                <h1 className='text-sm'>{data?.franchiseProfile?.email ? data?.franchiseProfile?.email : "Not Available"}</h1>
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
                                        {data?.franchiseProfile?.franchiseFiles?.length ? data?.franchiseProfile?.franchiseFiles?.map((fileObject, index) => (
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

export default DisplayFranchiseProfile