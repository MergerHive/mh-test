import React, { useState, useEffect } from 'react'
import { setIsLoading } from '../../app/configSlice';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useGetFranchiseProfileByProfileIDandUserIDQuery, useUpdateFranchiseProfileMutation } from './FranchiseProfileSlice'
import '../CreateProfilePage/BusinessProfile.css'
import InputCurrency from '../../components/Input/InputCurrency';
import TextArea from '../../components/Input/TextArea';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import FileUploader from '../../components/FileUploader/FileUploader';
import ProfileProgress from '../../features/ProfileProgress/ProfileProgress';
import Footer from '../../components/Footer';
import Input from '../../components/Input/Input';
import InputSection from '../../components/sections/InputSection';
import { useSelector, useDispatch } from 'react-redux'
import { useForm, Controller } from "react-hook-form";
import MHSelect from '../../components/mhselect/MHSelect';
import IndustrySelect from '../../features/IndustrySelect/IndustrySelect';
import LocationSelect from '../../features/LocationSelect/LocationSelect';
import PhoneInput from 'react-phone-input-2';
import styles from "../../styles/lpstyle";
import MHLoadingOverlay from '../../components/LoadingComponent/MHLoadingOverlay';
import { fbFileUpload, fbImageUpload } from '../../util/firebase-storage';
import franchisemenu from '../../constants/franchisemenu.json'

const EditFranchiseProfile = () => {
    const { profileID } = useParams()
    const { userID } = useAuth()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let { country } = useSelector(state => state.config)
    let brandOfferings = franchisemenu.brandOfferings
    console.log("profileID", profileID)
    const pfd = useGetFranchiseProfileByProfileIDandUserIDQuery(profileID, {
        refetchOnMountOrArgChange: true
    })

    const [stage, setStage] = useState(0);
    const [images, setImages] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [phNumber, setphNumber] = useState(pfd?.data?.phNumber)
    const [prevUploadedImg, setPrevUploadedImg] = useState(pfd?.data?.franchiseImages)
    const [prevUploadedFiles, setPrevUploadedFiles] = useState(pfd?.data?.franchiseFiles)
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm();

    const [updateFranchiseProfile, {
        isSuccess,
        isError,
        error
    }] = useUpdateFranchiseProfileMutation()

    const updateData = async (stage, event) => {
        dispatch(setIsLoading(true))
        let businessImageurls = await fbImageUpload(userID, images)
        let businessFiles = await fbFileUpload(userID, uploadedFiles)
        let combinedImages = [...prevUploadedImg]
        combinedImages = combinedImages.map(image => image.image);
        let combinedFiles = [...prevUploadedFiles]
        if (Array.isArray(businessFiles)) {
            combinedFiles = [...combinedFiles, ...businessFiles]
        }
        if (Array.isArray(businessImageurls)) {
            combinedImages = [...combinedImages, ...businessImageurls]
        }
        event = { user: userID, inputCurrency: country, stage: stage, isProfileActive: true, planTye: { planCode: 1, planName: "gold" }, phNumber: phNumber, ...event, franchiseImages: combinedImages, franchiseFiles: combinedFiles }
        await updateFranchiseProfile({ event, profileID })
        dispatch(setIsLoading(false))
    }

    const onSubmit = async (event) => {
        setStage(1)
        await updateData(1, event)
    };

    useEffect(() => {
        if (pfd.isLoading) {
            dispatch(setIsLoading(true))
        } else {
            setphNumber(pfd?.data?.phNumber)
            setPrevUploadedImg(pfd?.data?.franchiseImages)
            setPrevUploadedFiles(pfd?.data?.franchiseFiles)
            dispatch(setIsLoading(false))
        }
    }, [pfd.isLoading, pfd.data, dispatch])

    useEffect(() => {
        if (isSuccess) {
            navigate('/dashboard')
        }
        if (isError) {
            console.log("error", error)
        }
    }, [isSuccess, isError, error, navigate])

    return (
        <>
            {pfd.isLoading ? <MHLoadingOverlay /> :
                <div className={`bg-gradient-radial bg-[length:36px_36px] ${styles.paddingX} ${styles.flexCenter} h-full flex-col`}>
                    <div className='flex h-full flex-col  gap-2 w-full max-w-5xl md:max-w-7xl py-24 md:flex-row'>
                        <div className='p-6 w-full  bg-white border border-gray-200 shadow-[0_0_10px_0] shadow-gray-300'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h1 className='py-5 text-lg font-medium'>Register Franchise Profile</h1>
                                <h1 className='pb-5 text-sm'>Create your profile to fulfill all your franchise requirements with the help of our listings of investors, lenders, mentors, incubators. Share your business information here to receive proposals from all these counter profiles.</h1>
                                <InputSection title={"Confidential Personal Details"}>
                                    <div className='grid grid-cols-1 items-center my-2 gap-2 md:grid-cols-2'>
                                        <Input id='email' {...register('email')} label={'Official Email'} defaultValue={pfd?.data?.email} />
                                        <div className='flex flex-col gap-1 w-full'>
                                            <div className='flex gap-1 items-center'>
                                                <label className='text-sm'>{"Contact Details"}</label>
                                            </div>
                                            <PhoneInput
                                                id={"phNumber"}
                                                country={country.alpha2.toLowerCase()}
                                                containerClass='backgraound-color:red'
                                                inputProps={{
                                                    name: 'phNumber'
                                                }}
                                                onChange={phone => setphNumber(phone)}
                                                value={phNumber}
                                                countryCodeEditable={false}
                                            />
                                        </div>
                                        <Input id="name" {...register('name')} label={'Authorized Person Name'} defaultValue={pfd?.data?.name} />
                                    </div>
                                </InputSection>
                                <div>
                                    <InputSection title={"Brand Details"}>
                                        <div className='grid grid-cols-1 items-center my-2 gap-2 md:grid-cols-2'>
                                            <Input id={'brandName'} {...register('brandName')} label={'Brand Name'} defaultValue={pfd?.data?.brandName} />
                                            <Input id={'website'} {...register('website')} label={'Brand Website'} defaultValue={pfd?.data?.website} />
                                            <Input id={'designation'} {...register('designation')} label={'You are a(n)'} defaultValue={pfd?.data?.designation} />
                                            <Controller
                                                name="brandOffering"
                                                defaultValue={pfd?.data?.brandOffering}
                                                control={control}
                                                render={({ field }) =>
                                                    <MHSelect id={'brandOffering'} field={field} label={'I am Offering'} list={brandOfferings} placeholder="select offerings"
                                                        tooltip={"Designation"}
                                                    />
                                                }
                                            />
                                            <Controller
                                                name="industry"
                                                control={control}
                                                defaultValue={pfd?.data?.industry}
                                                render={({ field }) =>
                                                    <IndustrySelect id={'industry'} field={field} label={'Business Industry'} tooltip={"Select Industry"} />
                                                }
                                            />
                                            <Controller
                                                name="companyLocation"
                                                control={control}
                                                defaultValue={pfd?.data?.companyLocation}
                                                render={({ field }) =>
                                                    <LocationSelect id={'companyLocation'} field={field} label={'Location of The Brand Headquarters(City)'} />
                                                }
                                            />
                                            <Input id={'yoe'} {...register('yoe')} label={'Brand Established Year'} defaultValue={pfd?.data?.yoe} />
                                            <Input id={'noOutlets'} {...register('noOutlets')} label={'How many outlets do you already have globally ?'} defaultValue={pfd?.data?.noOutlets} />
                                            <Controller
                                                name="expandLocation"
                                                control={control}
                                                defaultValue={pfd?.data?.expandLocation}
                                                render={({ field }) =>
                                                    <LocationSelect id={'expandLocation'} field={field} label={'Looking to expand in Cities/Countries'} />
                                                }
                                            />
                                        </div>
                                        <div className='grid grid-cols-1 items-center my-2 gap-2 md:grid-cols-1'>
                                            <TextArea id={'brandIntro'} {...register('brandIntro')} label={'About Your Brand'} defaultValue={pfd?.data?.brandIntro} />
                                            <TextArea id={'brandOffers'} {...register('brandOffers')} label={'Mention all products/services your brand provides'} tooltip={"Highlights of the business"} defaultValue={pfd?.data?.brandOffers} />
                                            <TextArea id={'userExpectations'} {...register('userExpectations')} label={'Expectations from the user who takes up this oppurtunity'} defaultValue={pfd?.data?.userExpectations} />
                                            <TextArea id={'ownerSupport'} {...register('ownerSupport')} label={'Support to the franchisee by the owner'} defaultValue={pfd?.data?.ownerSupport} />
                                            <TextArea id={'procedure'} {...register('procedure')} label={'Procedure to Obtain Franchisee'} defaultValue={pfd?.data?.procedure} />
                                        </div>
                                    </InputSection>
                                </div>
                                <InputSection title={"Franchise Details"}>
                                    <div className='grid grid-cols-1 items-center my-2 gap-2 md:grid-cols-2'>
                                        <Input id="spaceRqd" {...register('spaceRqd')} label={'Space Required'} defaultValue={pfd?.data?.spaceRqd} />
                                        <Input id="avgStaff" {...register('avgStaff')} label={'Average No. of Staff Required'} defaultValue={pfd?.data?.avgStaff} />
                                        <InputCurrency {...register('totalInvestments')} id={'totalInvestments'} label={'Total Investment Needed'} tooltip={"Monthly Sales"} defaultValue={pfd?.data?.totalInvestments} />
                                        <InputCurrency {...register('brandFee')} id={'brandFee'} label={'Brand Fee Included in Investment'} defaultValue={pfd?.data?.brandFee} />
                                        <InputCurrency {...register('commission')} id={'commission'} label={'Royalty / Commission Charged'} defaultValue={pfd?.data?.commission} />
                                        <InputCurrency {...register('avgMonthlySales')} id={'avgMonthlySales'} label={'Average Monthly Sale'} defaultValue={pfd?.data?.avgMonthlySales} />
                                        <InputCurrency {...register('avgEBITDA')} id={'avgEBITDA'} label={'Average EBITDA'} defaultValue={pfd?.data?.avgEBITDA} />
                                    </div>
                                </InputSection>
                                {<InputSection title={"Add Franchise Proof"}>
                                    <div className='flex flex-col gap-3 divide-y'>
                                        <ImageUploader id={'addImages'} name={'Add Images'} images={images} setImages={setImages} tooltip={"Images to be uploaded"} prevUploadedImg={prevUploadedImg} setPrevUploadedImg={setPrevUploadedImg} />
                                        <FileUploader id={'addFiles'} name={'Add Files'} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} tooltip={"Files to be uploaded"} prevUploadedFiles={prevUploadedFiles} setPrevUploadedFiles={setPrevUploadedFiles} />
                                    </div>
                                </InputSection>}
                                <div className='flex gap-2 justify-end'>
                                    <input type="submit" className='bg-[#ffc040] cursor-pointer rounded-3xl text-center font-bold px-5 py-3' />
                                </div>
                            </form>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2 w-60 md:w-72'>
                                <ProfileProgress stage={stage} />
                                <div className='self-start p-6 w-full border border-gray-200 bg-white shadow-[0_0_10px_0] shadow-gray-300'>
                                    <h1 className='font-medium text-sm my-2'>Frequently Asked Questions</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >}
            <Footer />
        </>
    )
}

export default EditFranchiseProfile