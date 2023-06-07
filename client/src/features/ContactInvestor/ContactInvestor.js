import React, { useEffect, useState } from 'react'
import Input from '../../components/Input/Input'
import { useForm, Controller } from "react-hook-form";
import MHSelect from '../../components/mhselect/MHSelect';
import PhoneInput from 'react-phone-input-2';
import { useDispatch, useSelector } from 'react-redux';
import TextArea from '../../components/Input/TextArea';
import investorProfileMenu from '../../constants/investorProfileMenu.json'
import useAuth from '../../hooks/useAuth';
import { useAddNewInvestorProfileMutation, useGetInvestorProfileByUserIDQuery, useAddNewUserInvestorMapMutation } from '../../pages/InvestorProfilePage/InvestorSlice'
import { setIsLoading } from '../../app/configSlice'

const ContactInvestor = () => {
    const { userID } = useAuth()
    const { data, isLoading } = useGetInvestorProfileByUserIDQuery(userID, {
        refetchOnMountOrArgChange: true
    })
    const [addNewInvestorProfile, { isSuccess, isError, error }] = useAddNewInvestorProfileMutation()
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
    const dispatch = useDispatch()

    let investorTypeList = investorProfileMenu.investorsType
    const [phNumber, setphNumber] = useState("")


    let { country } = useSelector(state => state.config)
    const onSubmit = async (event) => {
        dispatch(setIsLoading(true))
        event = { user: userID, phNumber, ...event, stage: 1 }
        await addNewInvestorProfile(event)
        dispatch(setIsLoading(false))
    };
    useEffect(() => {
        if (isSuccess) {
            reset()
            setphNumber("")
        }
        if (isError) {
            console.log("error", error)
        }
    }, [isSuccess, isError, error, reset])

    return (
        <>
            {isLoading ? (<div>Loading....</div>) :
                (data?.investorProfile ? <CreateContact investorId={data?.investorProfile._id} /> :
                    (<div className='flex flex-col gap-2 self-start max-w-xs p-6 w-full border border-gray-200 bg-white shadow-[0_0_10px_0] shadow-gray-300'>
                        <div>
                            <h1 className='font-semibold text-base text-blue-600'>Contact Business<span className='text-xs text-black'>&nbsp;(One Time Registration)</span></h1>
                            <h1 className='text-[13px]'>Fill your details below to contact this business</h1>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='flex flex-col gap-2'>

                                    <Input {...register('fullName', { required: "full name is required" })} id={'fullName'} hasError={errors?.fullName} errorMsg={errors?.fullName?.message} label={'Full Name'} placeholder={'Enter Full Name'} />
                                    <div className='flex flex-col gap-1 w-full'>
                                        <div className='flex gap-1 items-center'>
                                            <label className='text-sm'>{"Contact Details"}</label>
                                        </div>
                                        <PhoneInput
                                            id={"phNumber"}
                                            country={country?.alpha2?.toLowerCase()}
                                            containerClass='backgraound-color:red'
                                            inputProps={{
                                                name: 'phNumber'
                                            }}
                                            onChange={phone => setphNumber(phone)}
                                            value={phNumber}
                                        />
                                    </div>
                                    <Controller
                                        name="investorType"
                                        control={control}
                                        render={({ field }) =>
                                            <MHSelect id={'investorType'} field={field} label={'Type of Investor'} list={investorTypeList} hasError={errors?.designation} errorMsg={errors?.designation?.message} placeholder="select investor type" />
                                        }
                                    />
                                    <Input {...register('company')} id={'company'} label={'Company You Work In'} placeholder={'Enter Company Name'} />
                                    <Input {...register('designation')} id={'designation'} label={'Designation'} placeholder={'Enter Designation'} />
                                    <TextArea {...register('introMsg')} id={'introMsg'} label={'Introduce yourself and leave a message to this business'} />
                                    <input type="submit" className='bg-[#ffc040] cursor-pointer rounded-3xl text-center font-bold px-5 py-3' />
                                </div>
                            </form>
                        </div>
                    </div >))
            }
        </>
    )
}

const CreateContact = ({ investorId }) => {
    const { userID } = useAuth()
    const [addNewUserInvestorMap, { isSuccess, isError, error }] = useAddNewUserInvestorMapMutation()


    const handleContactInvestorClick = () => {
        addNewUserInvestorMap({ investorId })
    }

    return (
        <div className='flex flex-col gap-2 self-start max-w-xs p-6 w-full border border-gray-200 bg-white shadow-[0_0_10px_0] shadow-gray-300'>
            <div>
                <h1 className='font-semibold text-base text-blue-600'>Contact Business</h1>
                <h1 className='text-[13px]'>Click below to Connect and Unlock profile now!</h1>
            </div>
            <div>
                <form>
                    <div className='flex flex-col gap-2'>
                        <button type="submit" className='bg-[#ffc040] cursor-pointer rounded-3xl text-center font-bold px-5 py-3' onClick={handleContactInvestorClick}> Contact this Investor </button>
                    </div>
                </form>
            </div>

        </div >
    )
}

export default ContactInvestor