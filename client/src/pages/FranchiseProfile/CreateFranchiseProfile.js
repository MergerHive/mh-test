import React, { useState } from 'react'
import InputSection from '../../components/sections/InputSection';
import Footer from '../../components/Footer';
import styles from "../../styles/lpstyle";
import Input from '../../components/Input/Input';
import TextArea from '../../components/Input/TextArea';
import MHSelect from '../../components/mhselect/MHSelect';
import franchisemenu from '../../constants/franchisemenu.json'
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import FileUploader from '../../components/FileUploader/FileUploader';
import PhoneInput from 'react-phone-input-2';
import InputCurrency from '../../components/Input/InputCurrency';
import { useSelector, useDispatch } from 'react-redux'
import LocationSelect from '../../features/LocationSelect/LocationSelect';
import IndustrySelect from '../../features/IndustrySelect/IndustrySelect';
import { useForm, Controller } from "react-hook-form";
import useAuth from '../../hooks/useAuth';
import { useAddNewFranchiseProfileMutation } from './FranchiseProfileSlice';
import { useEffect } from 'react';
import { fbImageUpload, fbFileUpload } from '../../util/firebase-storage';
import ProfileProgress from '../../features/ProfileProgress/ProfileProgress';
import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../../app/configSlice'
import './CreateFranchiseProfile.css'

const CreateFranchiseProfile = () => {
  let brandOfferings = franchisemenu.brandOfferings

  const { userID } = useAuth()
  let country = useSelector(state => state.config.country)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [stage, setStage] = useState(0);
  const [images, setImages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [phNumber, setphNumber] = useState("")

  const [addNewBusinessProfile, {
    isSuccess,
    isError,
    error
  }] = useAddNewFranchiseProfileMutation()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const updateData = async (stage, event) => {
    dispatch(setIsLoading(true))
    let businessImageurls = await fbImageUpload(userID, images)
    let businessFiles = await fbFileUpload(userID, uploadedFiles)
    event = { user: userID, inputCurrency: country, stage: stage, isProfileActive: true, planTye: { planCode: 1, planName: "gold" }, phNumber: phNumber, ...event, franchiseImages: businessImageurls, franchiseFiles: businessFiles }
    await addNewBusinessProfile(event)
    dispatch(setIsLoading(false))
  }

  const onSubmit = async (event) => {
    setStage(1)
    await updateData(1, event)
  };

  useEffect(() => {
    if (isSuccess) {
      // setToastData({ title: "Success", description: "Business Profile Added", type: "success" });
      navigate('/dashboard')
    }
    if (isError) {
      // setToastData({ title: "Failure", description: error?.data?.message, type: "error" });
    }
  }, [isSuccess, isError, error, navigate])

  return (
    <>
      <div className={`bg-gradient-radial bg-[length:36px_36px] ${styles.paddingX} ${styles.flexCenter} h-full flex-col`}>
        <div className='flex h-full flex-col  gap-2 w-full max-w-5xl md:max-w-7xl py-24 md:flex-row'>
          <div className='p-6 w-full  bg-white border border-gray-200 shadow-[0_0_10px_0] shadow-gray-300'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className='py-5 text-lg font-medium'>Register Franchise Profile</h1>
              <h1 className='pb-5 text-sm'>Create your profile to fulfill all your franchise requirements with the help of our listings of investors, lenders, mentors, incubators. Share your business information here to receive proposals from all these counter profiles.</h1>
              <InputSection title={"Confidential Personal Details"}>
                <div className='grid grid-cols-1 items-center my-2 gap-2 md:grid-cols-2'>
                  <Input id='email' {...register('email')} hasError={errors?.email} errorMsg={errors?.email?.message} label={'Official Email'} />
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
                  <Input id="name" {...register('name')} label={'Authorized Person Name'} />
                </div>
              </InputSection>
              <div>
                <InputSection title={"Brand Details"}>
                  <div className='grid grid-cols-1 items-center my-2 gap-2 md:grid-cols-2'>
                    <Input id={'brandName'} {...register('brandName')} label={'Brand Name'} />
                    <Input id={'website'} {...register('website')} label={'Brand Website'} />
                    <Input id={'designation'} {...register('designation')} label={'You are a(n)'} />
                    <Controller
                      name="brandOffering"
                      control={control}
                      defaultValue=""
                      render={({ field }) =>
                        <MHSelect id={'brandOffering'} field={field} label={'I am Offering'} list={brandOfferings} placeholder="select offerings"
                          tooltip={"Designation"}
                        />
                      }
                    />
                    <Controller
                      name="industry"
                      control={control}
                      defaultValue={[]}
                      render={({ field }) =>
                        <IndustrySelect id={'industry'} field={field} label={'Business Industry'} tooltip={"Select Industry"} />
                      }
                    />
                    <Controller
                      name="companyLocation"
                      control={control}
                      defaultValue={[]}
                      render={({ field }) =>
                        <LocationSelect id={'companyLocation'} field={field} label={'Location of The Brand Headquarters(City)'} />
                      }
                    />
                    <Input id={'yoe'} {...register('yoe')} label={'Brand Established Year'} />
                    <Input id={'noOutlets'} {...register('noOutlets')} label={'How many outlets do you already have globally ?'} />
                    <Controller
                      name="expandLocation"
                      control={control}
                      defaultValue={[]}
                      render={({ field }) =>
                        <LocationSelect id={'expandLocation'} field={field} label={'Looking to expand in Cities/Countries'} />
                      }
                    />
                  </div>
                  <div className='grid grid-cols-1 items-center my-2 gap-2 md:grid-cols-1'>
                    <TextArea id={'brandIntro'} {...register('brandIntro')} label={'About Your Brand'} />
                    <TextArea id={'brandOffers'} {...register('brandOffers')} label={'Mention all products/services your brand provides'} tooltip={"Highlights of the business"} />
                    <TextArea id={'userExpectations'} {...register('userExpectations')} label={'Expectations from the user who takes up this oppurtunity'} />
                    <TextArea id={'ownerSupport'} {...register('ownerSupport')} label={'Support to the franchisee by the owner'} />
                    <TextArea id={'procedure'} {...register('procedure')} label={'Procedure to Obtain Franchisee'} />
                  </div>
                </InputSection>
              </div>
              <InputSection title={"Franchise Details"}>
                <div className='grid grid-cols-1 items-center my-2 gap-2 md:grid-cols-2'>
                  <Input id="spaceRqd" {...register('spaceRqd')} label={'Space Required'} />
                  <Input id="avgStaff" {...register('avgStaff')} label={'Average No. of Staff Required'} />
                  <InputCurrency {...register('totalInvestments')} id={'totalInvestments'} label={'Total Investment Needed'} tooltip={"Monthly Sales"} />
                  <InputCurrency {...register('brandFee')} id={'brandFee'} label={'Brand Fee Included in Investment'} />
                  <InputCurrency {...register('commission')} id={'commission'} label={'Royalty / Commission Charged'} />
                  <InputCurrency {...register('avgMonthlySales')} id={'avgMonthlySales'} label={'Average Monthly Sale'} />
                  <InputCurrency {...register('avgEBITDA')} id={'avgEBITDA'} label={'Average EBITDA'} />
                </div>
              </InputSection>
              {<InputSection title={"Add Franchise Proof"}>
                <div className='flex flex-col gap-3 divide-y'>
                  <ImageUploader id={'addImages'} name={'Add Images'} images={images} setImages={setImages} tooltip={"Images to be uploaded"} />
                  <FileUploader id={'addFiles'} name={'Add Files'} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} tooltip={"Files to be uploaded"} />
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
      </div >
      <Footer />
    </>
  )
}

export default CreateFranchiseProfile