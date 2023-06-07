import React, { useState } from 'react'
import InputSection from '../../components/sections/InputSection';
import Footer from '../../components/Footer';
import styles from "../../styles/lpstyle";
import Input from '../../components/Input/Input';
import TextArea from '../../components/Input/TextArea';
import MHSelect from '../../components/mhselect/MHSelect';
import bizProfileMenu from '../../constants/bizprofilemenu.json'
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import FileUploader from '../../components/FileUploader/FileUploader';
import PhoneInput from 'react-phone-input-2';
import InputCurrency from '../../components/Input/InputCurrency';
import { useSelector, useDispatch } from 'react-redux'
import LocationSelect from '../../features/LocationSelect/LocationSelect';
import IndustrySelect from '../../features/IndustrySelect/IndustrySelect';
import { useForm, Controller } from "react-hook-form";
import useAuth from '../../hooks/useAuth';
import { useAddNewBusinessProfileMutation } from './ProfileSlice';
import { useEffect } from 'react';
import { fbImageUpload, fbFileUpload } from '../../util/firebase-storage';
import ProfileProgress from '../../features/ProfileProgress/ProfileProgress';
import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../../app/configSlice'
import './BusinessProfile.css'

const BusinessProfile = () => {
  let designations = bizProfileMenu.designations
  let legalEntityTypes = bizProfileMenu.legalEntityTypes
  let bpTypeList = bizProfileMenu.businessProfileTypes

  const { userID, firstName, lastName, email, contactNumber } = useAuth()
  let country = useSelector(state => state.config.country)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [intrestType, setIntrestType] = useState(bpTypeList[0]);
  const [stage, setStage] = useState(0);
  const [images, setImages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [phNumber, setphNumber] = useState(contactNumber)

  const [addNewBusinessProfile, {
    isSuccess,
    isError,
    error
  }] = useAddNewBusinessProfileMutation()

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
    event = { user: userID, intrestType: intrestType, inputCurrency: country, stage: stage, isProfileActive: true, planTye: { planCode: 1, planName: "gold" }, contactNumber: phNumber, ...event, businessImages: businessImageurls, businessFiles: businessFiles }
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

  const FullSale = () => {
    return (<InputSection title={"Transaction Details"}>
      <div className='grid grid-cols-1 items-center my-2 gap-2 md:grid-cols-2'>
        <InputCurrency {...register('transactionDetails.sellingPrice')} id={'sellingPrice'} label={'Selling Price of the Business'} />
        <Input {...register('transactionDetails.reasonSale')} id={'reasonSale'} label={'Reason for Sale'} tooltip={"SRINDIHSI"} />
      </div>
    </InputSection>)
  }

  const PartialSale = () => {
    return (<InputSection title={"Transaction Details"}>
      <div className='grid grid-cols-1 items-center my-2 gap-2 md:grid-cols-2'>
        <Input {...register('transactionDetails.maxstake')} id={'maxstake'} label={'What is the maximum stake you are willing to sell?'} />
        <InputCurrency {...register('transactionDetails.investAmt')} id={'investAmt'} label={'Investment amount you seeking for this stake'} />
        <Input {...register('transactionDetails.investReason')} id={'investReason'} label={'Reason for investment'} />
      </div>
    </InputSection>)
  }

  const BusinessLoan = () => {
    const businessLoanArray = [
      { id: "collateral", label: "Collateral you can provide?" },
      { id: "loanAmt", label: "Loan amount you are seeking" },
      { id: "repayTime", label: "Possible repayment duration" },
      { id: "annualIntrest", label: "Maximum yearly interest payment" },
      { id: "loanReason", label: "Reason for loan" },
    ]
    return (<InputSection title={"Transaction Details"} >
      {businessLoanArray.map((item, index) => (<div className='grid grid-cols-1 items-center my-2 gap-2 md:grid-cols-2' key={index}>
        <Input {...register(`transactionDetails.${item.id}`)} id={item.id} label={item.label} />
      </div>))}
    </InputSection >)
  }

  return (
    <>
      <div className={`bg-gradient-radial bg-[length:36px_36px] ${styles.paddingX} ${styles.flexCenter} h-full flex-col`}>
        <div className='flex h-full flex-col  gap-2 w-full max-w-5xl md:max-w-7xl py-24 md:flex-row'>
          <div className='p-6 w-full  bg-white border border-gray-200 shadow-[0_0_10px_0] shadow-gray-300'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className='py-5 text-lg font-medium'>Register Business Profile</h1>
              <h1 className='pb-5 text-sm'>Create your profile to fulfill all your business requirements with the help of our listings of investors, lenders, mentors, incubators. Share your business information here to receive proposals from all these counter profiles.</h1>
              <InputSection title={"Business Profile Type"}>
                <div className='flex items-center justify-evenly'>
                  <h1>I'm interested in</h1>
                  {bpTypeList.map((option) => (
                    <div key={option.id} className="flex gap-2 items-center">
                      <input
                        type="radio"
                        value={option.value}
                        checked={intrestType.value === option.value}
                        onChange={(e) => (setIntrestType(option))}
                        id={option.id}
                      />
                      <label htmlFor={option.id} className="text-sm">
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </InputSection>
              <InputSection title={"Confidential Personal Details"}>
                <div className='grid grid-cols-1 items-center my-2 gap-2 md:grid-cols-2'>
                  <Input id='email' {...register('email')} hasError={errors?.email} errorMsg={errors?.email?.message} label={'Email Address'} defaultValue={email} />
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
                    />
                  </div>
                  <Input id="name" {...register('name')} hasError={errors?.name} errorMsg={errors?.name?.message} label={'Your Name'} defaultValue={firstName + " ," + lastName} />
                  <Input id={'companyName'} {...register('companyName', { required: "company name is required" })} hasError={errors?.companyName} errorMsg={errors?.companyName?.message} label={'Company Name'} />
                </div>
              </InputSection>
              <div>
                <InputSection title={"Business Details"}>
                  <div className='grid grid-cols-1 items-center my-2 gap-2 md:grid-cols-2'>
                    <Controller
                      name="businessDetails.designation"
                      control={control}
                      defaultValue=""
                      render={({ field }) =>
                        <MHSelect id={'designation'} field={field} label={'Designation'} hasError={errors?.designation} errorMsg={errors?.designation?.message} list={designations} placeholder="select designation"
                          tooltip={"Designation"}
                        />
                      }
                    />
                    <Controller
                      name="businessDetails.legalEntityType"
                      control={control}
                      defaultValue=""
                      render={({ field }) =>
                        <MHSelect id={'legalEntityType'} field={field} label={'Legal Entity Type'} list={legalEntityTypes} placeholder="select legal entity type" />
                      }
                    />
                    <Input id={'yoe'} {...register('businessDetails.yoe')} label={'Establishment Year'} />
                    <Input id={'numOfEmployees'} {...register('businessDetails.numOfEmployees')} label={'Number of Employees'} />
                    <Input id={'companyWebsite'} {...register('businessDetails.companyWebsite')} label={'Business Website'} />
                    <Controller
                      name="businessDetails.industry"
                      control={control}
                      defaultValue={[]}
                      render={({ field }) =>
                        <IndustrySelect id={'industry'} field={field} label={'Business Industry'} tooltip={"Select Industry"} />
                      }
                    />
                    <Controller
                      name="businessDetails.companyLocation"
                      control={control}
                      defaultValue={[]}
                      render={({ field }) =>
                        <LocationSelect id={'companyLocation'} field={field} label={'Location of The Business(City)'} />
                      }
                    />
                    <Input id={'businessDetails.numOfDirectors'} {...register('businessDetails.numOfDirectors')} label={'Number of Directors/Partners'} />
                    <Input id={'businessDetails.description'} {...register('businessDetails.description')} label={'Describe the Business in a Sentence'} />
                  </div>
                  <div className='grid grid-cols-1 items-center my-2 gap-2 md:grid-cols-1'>
                    <TextArea id={'businessDetails.facilityDesc'} {...register('businessDetails.facilityDesc')} label={'Facility Description'} />
                    <TextArea id={'businessDetails.highlights'} {...register('businessDetails.highlights')} label={'Mention Highlights of the Business'} tooltip={"Highlights of the business"} />
                    <TextArea id={'businessDetails.assets'} {...register('businessDetails.assets')} label={'List of Tangible and Intangible Assets'} />
                  </div>
                </InputSection>
                <InputSection title={"Financials"}>
                  <div className='grid grid-cols-1 items-center my-2 gap-2 md:grid-cols-2'>
                    <InputCurrency {...register('financialDetails.monthlySales')} id={'monthlySales'} label={'Average Monthly Sales'} tooltip={"Monthly Sales"} />
                    <InputCurrency {...register('financialDetails.assetValue')} id={'assetValue'} label={'Tangible Asset Value'} />
                    <InputCurrency {...register('financialDetails.revenue')} id={'revenue'} label={'Annual Revenue'} />
                    <InputCurrency {...register('financialDetails.profitMargin')} id={'profitMargin'} label={'Operating Profit Margin'} />
                    <InputCurrency {...register('financialDetails.liability')} id={'liability'} label={'Outside Liabilities/Loans/Debts'} />
                  </div>
                </InputSection>
                {/* A.Full sale of my business */}
                {(intrestType.value === "fullSale") && <FullSale />}
                {/* B.Partial stake sale/Investment */}
                {(intrestType.value === "partialSale") && <PartialSale />}
                {/* C.Loan for business */}
                {(intrestType.value === "businessLoan") && <BusinessLoan />}
              </div>
              {<InputSection title={"Add Business Proof"}>
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

export default BusinessProfile