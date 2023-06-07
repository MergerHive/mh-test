import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-carousel-minimal';
import getIcon from '../../common/Icons';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import Footer from '../../components/Footer';
import useAuth from '../../hooks/useAuth';
import styles from "../../styles/lpstyle";
import { useGetBusinessProfileByProfileIDQuery } from '../CreateProfilePage/ProfileSlice';
import { useSelector, useDispatch } from 'react-redux'
import investorsImg from '../../assets/defaults/PlaceholderImage.jpg'
import { getNumberInWords, getExchangeRates, getFormattedNumber } from '../../common/converterUtil'
import { setExchangeRate, setIsLoading } from '../../app/configSlice';
import { setBusinessId } from '../CreateProfilePage/ProfileSlice'
import MHLoadingOverlay from '../../components/LoadingComponent/MHLoadingOverlay';
import InfoDisplaySection from '../../components/sections/InfoDisplaySection';
import ContactBusiness from '../../features/ContactBusiness/ContactBusiness';
import SendProposal from '../../features/ContactBusiness/SendProposal';

const DisplayBusinessProfile = () => {
    const { firstName } = useAuth()
    const { profileID } = useParams()
    const {
        data,
        isLoading
    } = useGetBusinessProfileByProfileIDQuery(profileID, {
        refetchOnMountOrArgChange: true
    })
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/mergerhive-7aeeb.appspot.com/o/defaultImages%2FPlaceholderImage.jpg?alt=media&token=5b46df17-5e0f-4b81-89bd-0f0f8cfe3210"
    let { country, exchangeRate } = useSelector(state => state.config)
    const dispatch = useDispatch()

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

    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    }

    useEffect(() => {
        if (!isLoading) {
            dispatch(setIsLoading(false))
            dispatch(setBusinessId(data._id))
            if (data?.inputCurrency.currency !== country.currency) {
                async function updateExchangeRate() {
                    dispatch(setIsLoading(true))
                    let exchangeRateRsp = await getExchangeRates(data?.inputCurrency.currency, country.currency)
                    dispatch(setExchangeRate(exchangeRateRsp))
                    dispatch(setIsLoading(false))
                }
                updateExchangeRate()
            } else {
                dispatch(setExchangeRate(1))
            }
        } else {
            dispatch(setIsLoading(true))
        }
    }, [isLoading, country, data, exchangeRate, dispatch])

    const onProfileDownloadClick = () => {
        console.log("onProfileDownloadClick")
    }

    const onBookMarkClick = () => {
        console.log("onBookMarkClick")
    }

    const Overview = () => {
        const divsArray = [
            { label: 'Highlights', value: data?.businessDetails?.highlights || 'Not Available' },
            { label: 'Facilities', value: data?.businessDetails?.facilityDesc || 'Not Available' },
            { label: 'Management Information', value: data?.businessDetails?.legalEntityType?.label || 'Not Available' },
            { label: 'Posted By', value: data?.businessDetails?.designation?.label || 'Not Available' },
        ];
        return <InfoDisplaySection title="Business Overview" divs={divsArray} />;
    };

    const BusinessDetails = () => {
        const divsArray = [
            { label: 'Establishment Year', value: data?.businessDetails?.yoe || 'Not Available' },
            { label: 'Employees', value: data?.businessDetails?.numOfEmployees || 'Not Available' },
            { label: 'Business Sector', value: data?.businessDetails?.industry.map(item => item?.title).join(', ') || 'Not Available' },
            {
                label: 'Website', value: data?.isLocked ? <><div className='flex gap-1 items-center'>
                    {getIcon("lock", "1em")}
                    <h1 className='font-bold text-sm'>Locked</h1>
                </div></> : (data?.businessDetails?.companyWebsite || 'Not Available')
            },
            { label: 'Location of The Business(City)', value: data?.businessDetails?.companyLocation.map(item => item?.description).join(' ') || 'Not Available' },
            { label: 'Number of Directors/Partners', value: data?.businessDetails?.numOfDirectors || 'Not Available' },
            { label: 'Tangible and Intangible Assets', value: data?.businessDetails?.assets || 'Not Available' },
        ];
        return <InfoDisplaySection title="Details" divs={divsArray} />;
    };

    const FinancialDetails = () => {
        const divsArray = [
            { label: 'Annual Sales', value: country.currency + " " + getFormattedNumber(data.financialDetails.revenue, exchangeRate) },
            { label: 'Monthly Sales', value: country.currency + " " + getFormattedNumber(data.financialDetails.monthlySales, exchangeRate) },
            { label: 'Tangible Asset Value', value: country.currency + " " + getFormattedNumber(data.financialDetails.assetValue, exchangeRate) },
            { label: 'Operating Profit Margin', value: country.currency + " " + getFormattedNumber(data.financialDetails.profitMargin, exchangeRate) },
            { label: 'Liabilities', value: country.currency + " " + getFormattedNumber(data.financialDetails.liability, exchangeRate) },
            { label: 'Number of Directors/Partners', value: data?.businessDetails?.numOfDirectors || 'Not Available' },
            { label: 'Tangible and Intangible Assets', value: data?.businessDetails?.assets || 'Not Available' },
        ];
        return <InfoDisplaySection title="Financials" divs={divsArray} />;
    };

    const BusinessFullSale = () => {
        const divsArray = [
            { label: 'Looking For', value: data?.intrestType?.label || 'Not Available' },
            { label: 'Selling Price', value: country.currency + " " + getFormattedNumber(data.transactionDetails.sellingPrice, exchangeRate) },
            { label: 'Reason for Sale', value: data?.transactionDetails?.reasonSale || 'Not Available' }
        ];
        return <InfoDisplaySection title="Business Requirements" divs={divsArray} />;
    };
    const BusinessPartialSale = () => {
        const divsArray = [
            { label: 'Looking For', value: data?.intrestType?.label || 'Not Available' },
            { label: 'Maximum Stake Available For Sale', value: data?.transactionDetails?.maxstake || 'Not Available' },
            { label: 'Required Investment Amount', value: data?.transactionDetails?.investAmt || 'Not Available' },
            { label: 'Reason For Investment', value: data?.transactionDetails?.investReason || 'Not Available' }
        ];
        return <InfoDisplaySection title="Business Requirements" divs={divsArray} />;
    };
    const BusinessLoan = () => {
        const divsArray = [
            { label: 'Looking For', value: data?.intrestType?.label || 'Not Available' },
            { label: 'Collateral', value: data?.transactionDetails?.collateral || 'Not Available' },
            { label: 'Seeking Loan Amount', value: data?.transactionDetails?.loanAmt || 'Not Available' },
            { label: 'Possible Repayment Duration', value: data?.transactionDetails?.repayTime || 'Not Available' },
            { label: 'Maximum Annual Intrest', value: data?.transactionDetails?.annualIntrest || 'Not Available' },
            { label: 'Reason For Loan', value: data?.transactionDetails?.loanReason || 'Not Available' },
        ];
        return <InfoDisplaySection title="Business Requirements" divs={divsArray} />;
    };

    const SideTableData = () => {
        let tableData = [
            { label: 'Reported Sales', value: getNumberInWords(getFormattedNumber(data.financialDetails.monthlySales, exchangeRate), country) },
            { label: 'Run Rate Sales', value: getNumberInWords(getFormattedNumber(data.financialDetails.revenue, exchangeRate), country) },
            { label: 'EBITDA Maring', value: "20%" },
            { label: 'Legal  Entity Type', value: data?.businessDetails?.legalEntityType?.label || 'Not Available' },
            { label: 'Employees', value: data?.businessDetails?.numOfEmployees || 'Not Available' },
            { label: 'Established Year', value: data?.businessDetails?.yoe || 'Not Available' },
            { label: 'Listed By', value: data.businessDetails.designation?.label || 'Not Available' },
            { label: 'Status', value: data?.isProfileActive ? "Yes" : "No" },
            { label: 'Physical Asset Value', value: getNumberInWords(getFormattedNumber(data.financialDetails.assetValue, exchangeRate), country) || 'Not Available' }
        ]
        return (
            tableData.map((item, index) => (
                <div className='flex justify-center flex-col items-center bg-[#f1f5f9] px-3 py-2' key={index}>
                    <h1 className='font-semibold text-sm'>{item?.label}</h1>
                    <h1 className='text-[13px]'>{item.value}</h1>
                </div>
            ))
        )
    }

    return (
        <>
            {isLoading ? <MHLoadingOverlay /> :
                <div className={`bg-gradient-radial bg-[length:36px_36px] ${styles.paddingX} justify-center h-full flex`}>
                    <div className='h-full w-full max-w-7xl py-24'>
                        <div className='flex flex-col p-4 w-full  bg-white border border-gray-200 shadow-[0_0_10px_0] shadow-gray-300 gap-2'>
                            <span className='text-sm'>
                                {`Hello ${firstName}, this is a preview of your profile -`} <span className='font-bold'>{data.companyName}</span>{`, Profiles with complete and correct information will be approved on priority.You can manage your profile using the links. Any updates to the profile will be followed up by verification call before making it live again.`}
                            </span>
                        </div>
                        <Breadcrumb items={breadItems} />
                        <div className='flex gap-2'>
                            <div className='flex flex-col px-4 py-2 w-full  bg-white border border-gray-200 shadow-[0_0_10px_0] shadow-gray-300'>
                                <div className=' flex justify-between'>
                                    <div>
                                        <h1 className='text-lg font-medium text-[#4183c4]'>{data.businessDetails.description}</h1>
                                        <h1 className='text-sm'>{data.businessDetails.companyLocation[0]?.description}</h1>
                                    </div>
                                    <div className='flex gap-2'>
                                        {getIcon("bookmark", "24px", "", "cursor-pointer", onBookMarkClick)}
                                        {getIcon("fileDownload", "24px", "", "cursor-pointer", onProfileDownloadClick)}
                                    </div>
                                </div>
                                <div className='flex gap-4'>
                                    <div className='w-1/2'>
                                        {(data.businessImages.length > 0) ? <Carousel
                                            data={data?.businessImages?.length ? data.businessImages : defaultImage}
                                            time={2000}
                                            width="100%"
                                            radius="4px"
                                            slideNumber={true}
                                            slideNumberStyle={slideNumberStyle}
                                            automatic={true}
                                            dots={true}
                                            pauseIconColor="white"
                                            pauseIconSize="40px"
                                            slideBackgroundColor="darkgrey"
                                            slideImageFit="contain"
                                            // thumbnails={true}
                                            thumbnailWidth="100px"
                                            style={{
                                                textAlign: "center",
                                                maxHeight: "500px",
                                                margin: "20px auto",
                                            }}
                                        /> :
                                            <img src={investorsImg} className="rounded h-[350px] w-full my-5" alt="" />
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
                                                <div>
                                                    <h1 className='font-bold text-sm'>Profile Type : </h1>
                                                    <h1 className='text-sm'>&nbsp;{data.intrestType.label}</h1>
                                                </div>
                                                <div>
                                                    <h1 className='text-sm font-bold'>Business Name :</h1>
                                                    {data?.isLocked ? <div className='flex gap-1 items-center'>
                                                        {getIcon("lock", "1em")}
                                                        <h1 className='font-bold text-sm'>Locked</h1>
                                                    </div> :
                                                        <h1 className='text-sm'>&nbsp;{data.companyName}</h1>}
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <>
                                                    <h1 className='text-sm font-bold'>Name, Phone, Email</h1>
                                                    <div className='flex gap-1 items-center'>
                                                        {getIcon("user", "1em")}
                                                        {
                                                            data?.isLocked ? <div className='flex gap-1 items-center'>
                                                                {getIcon("lock", "1em")}
                                                                <h1 className='font-bold text-sm'>Locked</h1>
                                                            </div> :
                                                                <h1 className='text-sm'>{data?.name ? data.name : "Not Available"}</h1>
                                                        }
                                                    </div>
                                                    <div className='flex gap-1 items-center'>
                                                        {getIcon("phone", "1em")}
                                                        {data?.isLocked ? <div className='flex gap-1 items-center'>
                                                            {getIcon("lock", "1em")}
                                                            <h1 className='font-bold text-sm'>Locked</h1>
                                                        </div> :
                                                            <h1 className='text-sm'>{data?.contactNumber ? "+" + data.contactNumber : "Not Available"}</h1>}
                                                    </div>
                                                    <div className='flex gap-1 items-center'>
                                                        {getIcon("mail", "1em")}
                                                        {data?.isLocked ? <div className='flex gap-1 items-center'>
                                                            {getIcon("lock", "1em")}
                                                            <h1 className='font-bold text-sm'>Locked</h1>
                                                        </div> :
                                                            <h1 className='text-sm'>{data?.email ? data.email : "Not Available"}</h1>}
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
                                    <BusinessDetails />
                                    <FinancialDetails />
                                    {(data?.intrestType?.value === "fullSale") && <BusinessFullSale />}
                                    {(data?.intrestType?.value === "partialSale") && <BusinessPartialSale />}
                                    {(data?.intrestType?.value === "businessLoan") && <BusinessLoan />}
                                    <div className='border border-gray-200 rounded w-full my-2'>
                                        <div>
                                            <h1 className='p-2 bg-gray-100 font-bold text-base'>{"Business Documents"}</h1>
                                        </div>
                                        <div className='p-2'>
                                            <div className='grid grid-cols-6 gap-2'>
                                                {data?.businessFiles?.length ? data?.businessFiles?.map((fileObject, index) => (
                                                    <div key={index}>
                                                        <a href={fileObject?.fileURL} className="text-xs" download>{getIcon("file", "5em", "gold")}{fileObject.fileName}</a>
                                                    </div>
                                                )) : 'Not Available'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {data?.isLocked ? <ContactBusiness /> :
                                <SendProposal />
                            }
                        </div>
                    </div>
                </div >}
            <Footer />
        </>
    )
}

export default DisplayBusinessProfile