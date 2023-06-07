import React, { useState } from 'react'
import InputSection from '../../components/sections/InputSection';
import Footer from '../../components/Footer';
import styles from "../../styles/lpstyle";
import Input from '../../components/Input/Input';
import TextArea from '../../components/Input/TextArea';
import MHSelect from '../../components/mhselect/MHSelect';
import investorProfileInterestMenu from '../../constants/investorProfileInterestMenu.json'
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import FileUploader from '../../components/FileUploader/FileUploader';
import PhoneInput from 'react-phone-input-2';
import { useSelector, useDispatch } from 'react-redux'
import LocationSelect from '../../features/LocationSelect/LocationSelect';
import IndustrySelect from '../../features/IndustrySelect/IndustrySelect';
import { useForm, Controller } from "react-hook-form";
import useAuth from '../../hooks/useAuth';
import { useGetInvestorProfileByUserIDQuery, useUpdateInvestorProfileMutation } from './InvestorSlice';
import { useEffect } from 'react';
import { fbImageUpload, fbFileUpload } from '../../util/firebase-storage';
import ProfileProgress from '../../features/ProfileProgress/ProfileProgress';
import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../../app/configSlice'
import investorProfileMenu from '../../constants/investorProfileMenu.json'
import '../CreateProfilePage/BusinessProfile.css'
import MHLoadingOverlay from '../../components/LoadingComponent/MHLoadingOverlay';

const EditInvestorProfile = () => {
  const { userID } = useAuth()
  const {
    data,
    isLoading
  } = useGetInvestorProfileByUserIDQuery(userID, {
    refetchOnMountOrArgChange: true
  })
  let bpTypeList = investorProfileInterestMenu.businessProfileTypes
  let investorTypeList = investorProfileMenu.investorsType

  let country = useSelector(state => state.config.country)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [intrestTypes, setIntrestTypes] = useState([]);
  const [stage, setStage] = useState(0);
  const [images, setImages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [phNumber, setphNumber] = useState(data?.investorProfile?.contactNumber)
  const [prevUploadedImg, setPrevUploadedImg] = useState(data?.investorProfile?.investorImage)
  const [prevUploadedFiles, setPrevUploadedFiles] = useState(data?.investorProfile?.investorFiles)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const [updateInvestorProfile, {
    isSuccess,
    isError,
    error
  }] = useUpdateInvestorProfileMutation()

  const updateData = async (stage, event) => {
    dispatch(setIsLoading(true))
    let investorImageurls = await fbImageUpload(userID, images)
    let investorFiles = await fbFileUpload(userID, uploadedFiles)
    let combinedImages = [...prevUploadedImg]
    combinedImages = combinedImages.map(image => image.image);
    let combinedFiles = [...prevUploadedFiles]
    if (Array.isArray(investorFiles)) {
      combinedFiles = [...combinedFiles, ...investorFiles]
    }
    if (Array.isArray(investorImageurls)) {
      combinedImages = [...combinedImages, ...investorImageurls]
    }
    event = { user: userID, intrestTypes, stage: stage, isProfileActive: true, phNumber, ...event, investorImage: combinedImages, investorFiles: combinedFiles }
    await updateInvestorProfile({ event, userID })
    dispatch(setIsLoading(false))
  }

  const onSubmit = async (event) => {
    setStage(1)
    await updateData(1, event)
  };

  useEffect(() => {
    if (isLoading) {
      dispatch(setIsLoading(true))
    } else {
      console.log("data?.investorProfile?.investorImage", data?.investorProfile)
      setphNumber(data?.investorProfile?.phNumber)
      setPrevUploadedImg(data?.investorProfile?.investorImage)
      setPrevUploadedFiles(data?.investorProfile?.investorFiles)
      setIntrestTypes(data?.investorProfile?.intrestTypes)
      dispatch(setIsLoading(false))
    }
  }, [data, dispatch, isLoading])

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
      {
        isLoading ? <MHLoadingOverlay /> :
          <div className={`bg-gradient-radial bg-[length:36px_36px] ${styles.paddingX} ${styles.flexCenter} h-full flex-col`}>
            <div className='flex h-full flex-col  gap-2 w-full max-w-5xl md:max-w-7xl py-24 md:flex-row'>
              <div className='p-6 w-full  bg-white border border-gray-200 shadow-[0_0_10px_0] shadow-gray-300'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h1 className='py-5 text-lg font-medium'>Register A Business Profile</h1>
                  <h1 className='pb-5 text-sm'>Create your profile to fulfill all your investments requirements with the help of our listings of investors, lenders, mentors, incubators. Share your business information here to receive proposals from all these counter profiles.</h1>
                  <InputSection title={"Investor Intrest Type"}>
                    <div className='flex items-center justify-evenly'>
                      <h1>I'm interested in</h1>
                      <div className='flex items-start gap-3 justify-evenly flex-col'>
                        {bpTypeList.map((option) => (
                          <div key={option.id} className="flex gap-2 items-center">
                            <input
                              type="checkbox"
                              value={option.value}
                              checked={intrestTypes.some((type) => type.id === option.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setIntrestTypes([...intrestTypes, { id: option.id, label: option.label, value: option.value }]);
                                } else {
                                  setIntrestTypes(intrestTypes.filter((type) => type.id !== option.id));
                                }
                              }}
                              id={option.id}
                            />
                            <label htmlFor={option.id} className="text-sm">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </InputSection>
                  <InputSection title={"Confidential Personal Details"}>
                    <div className='grid grid-cols-1 items-center my-2 gap-2 md:grid-cols-2'>
                      <Input id='email' {...register('email')} hasError={errors?.email} errorMsg={errors?.email?.message} label={'Email Address'} defaultValue={data?.investorProfile?.email} />
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
                          countryCodeEditable={false}
                          onChange={phone => setphNumber(phone)}
                          value={phNumber}
                        />
                      </div>
                      <Input id="fullName" {...register('fullName')} hasError={errors?.fullName} errorMsg={errors?.fullName?.message} label={'Your Name'} defaultValue={data?.investorProfile?.fullName} />
                      <Input id={'company'} {...register('company'
                      )} hasError={errors?.company} errorMsg={errors?.company?.message} label={'Company Name'} defaultValue={data?.investorProfile?.company} />
                    </div>
                  </InputSection>
                  <div>
                    <InputSection title={"Investor Profile Details"}>
                      <div className='grid grid-cols-1 items-center my-2 gap-2 md:grid-cols-2'>
                        <Controller
                          name="investorType"
                          control={control}
                          defaultValue={data?.investorProfile?.investorType}
                          render={({ field }) =>
                            <MHSelect id={'investorType'} field={field} label={'Type of Investor'} list={investorTypeList} placeholder="select investor type" />
                          }
                        />
                        <Input {...register('designation')} id={'designation'} label={'Designation'} placeholder={'Enter Designation'} defaultValue={data?.investorProfile?.designation} />
                        <Input id={'companyWebsite'} {...register('companyWebsite')} label={'Company Website'} defaultValue={data?.investorProfile?.companyWebsite} />
                        <Controller
                          name="industry"
                          control={control}
                          defaultValue={data?.investorProfile?.industry}
                          render={({ field }) =>
                            <IndustrySelect id={'industry'} field={field} label={'Business Industry'} tooltip={"Select Industry"} />
                          }
                        />
                        <Controller
                          name="companyLocation"
                          control={control}
                          defaultValue={data?.investorProfile?.companyLocation}
                          render={({ field }) =>
                            <LocationSelect id={'companyLocation'} field={field} label={'Intrested Locations'} />
                          }
                        />
                      </div>
                      <div className='grid grid-cols-1 items-center my-2 gap-2 md:grid-cols-1'>
                        <TextArea id={'investCriteria'} {...register('investCriteria')} label={'Investment Criteria'} defaultValue={data?.investorProfile?.investCriteria} />
                        <TextArea id={'introMsg'} {...register('introMsg')} label={'Professional summary/experties'} defaultValue={data?.investorProfile?.introMsg} />
                      </div>
                    </InputSection>
                  </div>
                  {<InputSection title={"Add Investor Proof"}>
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
          </div >
      }
      <Footer />
    </>
  )
}

export default EditInvestorProfile