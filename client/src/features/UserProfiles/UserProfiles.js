import React, { useState } from 'react'
import getIcon from '../../common/Icons';
import { useDeactivateProfileByIdMutation, useGetBusinessByUserIdQuery } from '../../pages/CreateProfilePage/ProfileSlice';
import Modal from '../../components/model/Modal';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useGetInvestorProfileByUserIDQuery } from '../../pages/InvestorProfilePage/InvestorSlice';
import { useGetFranchiseListByUserIdQuery } from '../../pages/FranchiseProfile/FranchiseProfileSlice';

const UserProfiles = () => {


    return (
        <>
            <div className='flex flex-col gap-2 p-6 border bg-white border-gray-200 shadow-[0_0_10px_0] shadow-gray-300'>
                <div className='flex flex-col gap-3'>
                    <h1 className='text-base font-medium'>My Profiles</h1>
                    <Tabs>
                        <TabList>
                            <Tab>Business Profiles</Tab>
                            <Tab>Investor Profiles</Tab>
                            <Tab>Franchise Profiles</Tab>
                        </TabList>
                        <TabPanel>
                            <UserBusinessProfiles />
                        </TabPanel>
                        <TabPanel>
                            <UserInvestorPorfiles />
                        </TabPanel>
                        <TabPanel>
                            <UserFranchisePorfiles />
                        </TabPanel>
                    </Tabs>
                </div>
            </div >
        </>
    )
}

const UserBusinessProfiles = () => {
    const { userID } = useAuth()
    const {
        data,
        isLoading
    } = useGetBusinessByUserIdQuery(userID, {
        refetchOnMountOrArgChange: true
    })

    const [deleteModel, setDeleteModel] = useState(false)
    const [deleteModelData, setDeleteModelData] = useState({
        title: 'Delete Business Profile',
    })
    const [deactivateProfileById] = useDeactivateProfileByIdMutation()
    const navigate = useNavigate()

    const onProfileDeleteClick = async (profileData) => {
        setDeleteModel(true)
        setDeleteModelData(currentProfile => ({ ...currentProfile, companyName: profileData.companyName, profileId: profileData._id }))
    }

    const onDeleteConfirm = async () => {
        try { await deactivateProfileById(deleteModelData.profileId).unwrap() }
        catch (e) {
            console.log(e)
        }
        setDeleteModel(false)
    }

    return (
        <>
            {isLoading ? <div>Loading</div> : (<div>
                {data.map((profileData, index) => (
                    <div className='grid grid-cols-3 border border-b-1 my-2 px-4 py-2 hover:bg-gray-100' key={index}>
                        <div className='col-span-2 grid grid-cols-2 gap-2'>
                            <div>
                                <h1 className='text-blue-400 text-base'>{profileData.companyName}</h1>
                                <h1 className='text-xs'>{profileData.businessDetails?.companyLocation[0]?.description}</h1>
                                <h1 className='text-xs'>{profileData.businessDetails?.industry[0]?.title}</h1>
                            </div>
                            <div className='flex justify-between'>
                                <div>
                                    <h1 className='text-gray-500  text-base text-center'>{"Proposals Sent"}</h1>
                                    <h1 className='text-blue-500 text-2xl text-center'>1/80</h1>
                                </div>
                                <div>
                                    <h1 className='text-gray-500  text-base text-center'>{"Introductions"}</h1>
                                    <h1 className='text-blue-500 text-2xl text-center'>25</h1>
                                </div>
                            </div>
                            {
                                profileData.stage === 0 &&
                                <div className='flex items-center justify-center rounded bg-gradient-to-r from-cyan-500 to-cyan-600 cursor-pointer'>
                                    <div className='font-medium text-white'>Status : Provide Data</div>
                                </div>
                            }
                            {
                                profileData.stage === 1 &&
                                <div className='flex items-center justify-center rounded bg-gradient-to-r from-violet-500 to-violet-600 cursor-pointer'>
                                    <div className='font-medium text-white'>Status : Verification Call</div>
                                </div>
                            }
                            {
                                profileData.stage === 2 &&
                                <div className='flex items-center justify-center rounded bg-gradient-to-r from-green-500 to-green-600 cursor-pointer'>
                                    <div className='font-medium text-white'>Status : Approved</div>
                                </div>
                            }
                            {
                                profileData.stage === 3 &&
                                <div className='flex items-center justify-center rounded bg-gradient-to-r from-red-500 to-red-600 cursor-pointer'>
                                    <div className='font-medium text-white'>Status : Rejected</div>
                                </div>
                            }
                            {profileData.planTye.planCode === 1 &&
                                <div className='flex items-center justify-center rounded bg-package-gold'>
                                    <div className='font-medium text-white'>Plan : Gold</div>
                                </div>
                            }
                            {profileData.planTye.planCode === 2 &&
                                <div className='flex items-center justify-center rounded bg-package-bronze'>
                                    <div className='font-medium text-white'>Plan : Bronze</div>
                                </div>
                            }
                            {profileData.planTye.planCode === 3 &&
                                <div className='flex items-center justify-center rounded bg-package-basic'>
                                    <div className='font-medium text-white'>Plan : Basic</div>
                                </div>
                            }
                        </div>
                        <div className='flex gap-1 flex-col items-end'>
                            <div className='flex gap-1 text-xs px-3 py-1 rounded bg-[#f5f5f5] border border-[#ccc] cursor-pointer hover:bg-[#ccc] hover:border-[#f5f5f5]' onClick={() => navigate(`/preview-profile/businessProfile/${profileData._id}`)}>
                                {getIcon("invoices", "1.5em")}
                                <span>View Profile</span>
                            </div>
                            <div className='flex gap-1 text-xs px-3 py-1 rounded bg-[#f5f5f5] border border-[#ccc] cursor-pointer hover:bg-[#ccc] hover:border-[#f5f5f5]' onClick={() => navigate(`/edit-profile/businessProfile/${profileData._id}`)}>
                                {getIcon("edit2", "1.5em")}
                                <span>Edit</span>
                            </div>
                            <div className='flex gap-1 text-xs px-3 py-1 rounded bg-[#f5f5f5] border border-[#ccc] cursor-pointer hover:bg-[#ccc] hover:border-[#f5f5f5]' onClick={() => onProfileDeleteClick(profileData)}>
                                {getIcon("close", "1.5em",)}
                                <span>Delete</span>
                            </div>
                            <div className='flex gap-1 text-xs px-3 py-1 rounded bg-green-600 text-white cursor-pointer hover:bg-green-800 '>
                                {getIcon("upgrade", "1.5em", "white")}
                                <span>Upgrade Plan</span>
                            </div>
                        </div>
                    </div>
                )

                )}
                <Modal title={deleteModelData.title} isOpen={deleteModel} onClose={() => setDeleteModel(false)} >
                    <div className='flex flex-col gap-3'>
                        <span>Are you sure you want to delete {deleteModelData.companyName} profile ?</span>
                        <div className='flex gap-2 justify-end'>
                            <button className='px-3 py-1 bg-gray-300 rounded-full font-semibold cursor-pointer' onClick={() => setDeleteModel(false)}>Cancel</button>
                            <button className='px-3 py-1 bg-red-600 rounded-full font-semibold text-white cursor-pointer' onClick={onDeleteConfirm}>Delete</button>
                        </div>
                    </div>
                </Modal>
            </div>)}
        </>
    )

}

const UserInvestorPorfiles = () => {
    const { userID } = useAuth()
    const {
        data,
        isLoading
    } = useGetInvestorProfileByUserIDQuery(userID, {
        refetchOnMountOrArgChange: true
    })

    const [deleteModel, setDeleteModel] = useState(false)
    const [deleteModelData, setDeleteModelData] = useState({
        title: 'Delete Investor Profile',
    })
    // const [deactivateProfileById] = useDeactivateProfileByIdMutation()
    const navigate = useNavigate()

    const onProfileDeleteClick = async (profileData) => {
        setDeleteModel(true)
        setDeleteModelData(currentProfile => ({ ...currentProfile, companyName: profileData.companyName, profileId: profileData._id }))
    }

    const onDeleteConfirm = async () => {
        // try { await deactivateProfileById(deleteModelData.profileId).unwrap() }
        // catch (e) {
        //     console.log(e)
        // }
        setDeleteModel(false)
    }
    return (
        <>
            {isLoading ? <div>Loading</div> : (
                <div>
                    <div className='grid grid-cols-3 border border-b-1 my-2 px-4 py-2 hover:bg-gray-100'>
                        <div className='col-span-2 grid grid-cols-2 gap-2'>
                            <div>
                                <h1 className='text-blue-400 text-base'>{data?.investorProfile?.fullName}</h1>
                                <h1 className='text-xs'>{data?.investorProfile?.companyLocation[0]?.description}</h1>
                                <h1 className='text-xs'>{data?.investorProfile?.investorType?.label}</h1>
                            </div>
                            <div className='flex justify-between'>
                                <div>
                                    <h1 className='text-gray-500  text-base text-center'>{"Proposals Sent"}</h1>
                                    <h1 className='text-blue-500 text-2xl text-center'>1/80</h1>
                                </div>
                                <div>
                                    <h1 className='text-gray-500  text-base text-center'>{"Introductions"}</h1>
                                    <h1 className='text-blue-500 text-2xl text-center'>25</h1>
                                </div>
                            </div>
                            {
                                data?.investorProfile?.stage === 0 &&
                                <div className='flex items-center justify-center rounded bg-gradient-to-r from-cyan-500 to-cyan-600 cursor-pointer'>
                                    <div className='font-medium text-white'>Status : Provide Data</div>
                                </div>
                            }
                            {
                                data?.investorProfile?.stage === 1 &&
                                <div className='flex items-center justify-center rounded bg-gradient-to-r from-violet-500 to-violet-600 cursor-pointer'>
                                    <div className='font-medium text-white'>Status : Verification Call</div>
                                </div>
                            }
                            {
                                data?.investorProfile?.stage === 2 &&
                                <div className='flex items-center justify-center rounded bg-gradient-to-r from-green-500 to-green-600 cursor-pointer'>
                                    <div className='font-medium text-white'>Status : Approved</div>
                                </div>
                            }
                            {
                                data?.investorProfile?.stage === 3 &&
                                <div className='flex items-center justify-center rounded bg-gradient-to-r from-red-500 to-red-600 cursor-pointer'>
                                    <div className='font-medium text-white'>Status : Rejected</div>
                                </div>
                            }
                        </div>
                        <div className='flex gap-1 flex-col items-end'>
                            <div className='flex gap-1 text-xs px-3 py-1 rounded bg-[#f5f5f5] border border-[#ccc] cursor-pointer hover:bg-[#ccc] hover:border-[#f5f5f5]' onClick={() => navigate(`/preview-profile/investorProfile/${userID}`)}>
                                {getIcon("invoices", "1.5em")}
                                <span>View Profile</span>
                            </div>
                            <div className='flex gap-1 text-xs px-3 py-1 rounded bg-[#f5f5f5] border border-[#ccc] cursor-pointer hover:bg-[#ccc] hover:border-[#f5f5f5]' onClick={() => navigate(`/edit-profile/investorProfile/${userID}`)}>
                                {getIcon("edit2", "1.5em")}
                                <span>Edit</span>
                            </div>
                            <div className='flex gap-1 text-xs px-3 py-1 rounded bg-[#f5f5f5] border border-[#ccc] cursor-pointer hover:bg-[#ccc] hover:border-[#f5f5f5]' onClick={() => onProfileDeleteClick(data?.investorProfile)}>
                                {getIcon("close", "1.5em",)}
                                <span>Delete</span>
                            </div>
                            <div className='flex gap-1 text-xs px-3 py-1 rounded bg-green-600 text-white cursor-pointer hover:bg-green-800 '>
                                {getIcon("upgrade", "1.5em", "white")}
                                <span>Upgrade Plan</span>
                            </div>
                        </div>
                    </div>
                    <Modal title={deleteModelData.title} isOpen={deleteModel} onClose={() => setDeleteModel(false)} >
                        <div className='flex flex-col gap-3'>
                            <span>Are you sure you want to delete {deleteModelData.companyName} profile ?</span>
                            <div className='flex gap-2 justify-end'>
                                <button className='px-3 py-1 bg-gray-300 rounded-full font-semibold cursor-pointer' onClick={() => setDeleteModel(false)}>Cancel</button>
                                <button className='px-3 py-1 bg-red-600 rounded-full font-semibold text-white cursor-pointer' onClick={onDeleteConfirm}>Delete</button>
                            </div>
                        </div>
                    </Modal>
                </div>)}
        </>
    )
}

const UserFranchisePorfiles = () => {
    const { userID } = useAuth()
    const {
        data,
        isLoading
    } = useGetFranchiseListByUserIdQuery(userID, {
        refetchOnMountOrArgChange: true
    })

    const [deleteModel, setDeleteModel] = useState(false)
    const [deleteModelData, setDeleteModelData] = useState({
        title: 'Delete Investor Profile',
    })
    // const [deactivateProfileById] = useDeactivateProfileByIdMutation()
    const navigate = useNavigate()

    const onProfileDeleteClick = async (profileData) => {
        setDeleteModel(true)
        setDeleteModelData(currentProfile => ({ ...currentProfile, companyName: profileData.companyName, profileId: profileData._id }))
    }

    const onDeleteConfirm = async () => {
        // try { await deactivateProfileById(deleteModelData.profileId).unwrap() }
        // catch (e) {
        //     console.log(e)
        // }
        setDeleteModel(false)
    }
    return (
        <>
            {isLoading ? <div>Loading</div> : (<div>
                {data.map((profileData, index) => (
                    <div className='grid grid-cols-3 border border-b-1 my-2 px-4 py-2 hover:bg-gray-100' key={index}>
                        <div className='col-span-2 grid grid-cols-2 gap-2'>
                            <div>
                                <h1 className='text-blue-400 text-base'>{profileData.brandName}</h1>
                                <h1 className='text-xs'>{profileData?.companyLocation[0]?.description}</h1>
                                <h1 className='text-xs'>{profileData?.industry[0]?.title}</h1>
                            </div>
                            <div className='flex justify-between'>
                                <div>
                                    <h1 className='text-gray-500  text-base text-center'>{"Proposals Sent"}</h1>
                                    <h1 className='text-blue-500 text-2xl text-center'>1/80</h1>
                                </div>
                                <div>
                                    <h1 className='text-gray-500  text-base text-center'>{"Introductions"}</h1>
                                    <h1 className='text-blue-500 text-2xl text-center'>25</h1>
                                </div>
                            </div>
                            {
                                profileData.stage === 0 &&
                                <div className='flex items-center justify-center rounded bg-gradient-to-r from-cyan-500 to-cyan-600 cursor-pointer'>
                                    <div className='font-medium text-white'>Status : Provide Data</div>
                                </div>
                            }
                            {
                                profileData.stage === 1 &&
                                <div className='flex items-center justify-center rounded bg-gradient-to-r from-violet-500 to-violet-600 cursor-pointer'>
                                    <div className='font-medium text-white'>Status : Verification Call</div>
                                </div>
                            }
                            {
                                profileData.stage === 2 &&
                                <div className='flex items-center justify-center rounded bg-gradient-to-r from-green-500 to-green-600 cursor-pointer'>
                                    <div className='font-medium text-white'>Status : Approved</div>
                                </div>
                            }
                            {
                                profileData.stage === 3 &&
                                <div className='flex items-center justify-center rounded bg-gradient-to-r from-red-500 to-red-600 cursor-pointer'>
                                    <div className='font-medium text-white'>Status : Rejected</div>
                                </div>
                            }
                            {profileData.planTye.planCode === 1 &&
                                <div className='flex items-center justify-center rounded bg-package-gold'>
                                    <div className='font-medium text-white'>Plan : Gold</div>
                                </div>
                            }
                            {profileData.planTye.planCode === 2 &&
                                <div className='flex items-center justify-center rounded bg-package-bronze'>
                                    <div className='font-medium text-white'>Plan : Bronze</div>
                                </div>
                            }
                            {profileData.planTye.planCode === 3 &&
                                <div className='flex items-center justify-center rounded bg-package-basic'>
                                    <div className='font-medium text-white'>Plan : Basic</div>
                                </div>
                            }
                        </div>
                        <div className='flex gap-1 flex-col items-end'>
                            <div className='flex gap-1 text-xs px-3 py-1 rounded bg-[#f5f5f5] border border-[#ccc] cursor-pointer hover:bg-[#ccc] hover:border-[#f5f5f5]' onClick={() => navigate(`/preview-profile/franchiseProfile/${profileData._id}`)}>
                                {getIcon("invoices", "1.5em")}
                                <span>View Profile</span>
                            </div>
                            <div className='flex gap-1 text-xs px-3 py-1 rounded bg-[#f5f5f5] border border-[#ccc] cursor-pointer hover:bg-[#ccc] hover:border-[#f5f5f5]' onClick={() => navigate(`/edit-profile/franchiseProfile/${profileData._id}`)}>
                                {getIcon("edit2", "1.5em")}
                                <span>Edit</span>
                            </div>
                            <div className='flex gap-1 text-xs px-3 py-1 rounded bg-[#f5f5f5] border border-[#ccc] cursor-pointer hover:bg-[#ccc] hover:border-[#f5f5f5]' onClick={() => onProfileDeleteClick(profileData)}>
                                {getIcon("close", "1.5em",)}
                                <span>Delete</span>
                            </div>
                            <div className='flex gap-1 text-xs px-3 py-1 rounded bg-green-600 text-white cursor-pointer hover:bg-green-800 '>
                                {getIcon("upgrade", "1.5em", "white")}
                                <span>Upgrade Plan</span>
                            </div>
                        </div>
                    </div>
                )

                )}
                <Modal title={deleteModelData.title} isOpen={deleteModel} onClose={() => setDeleteModel(false)} >
                    <div className='flex flex-col gap-3'>
                        <span>Are you sure you want to delete {deleteModelData.companyName} profile ?</span>
                        <div className='flex gap-2 justify-end'>
                            <button className='px-3 py-1 bg-gray-300 rounded-full font-semibold cursor-pointer' onClick={() => setDeleteModel(false)}>Cancel</button>
                            <button className='px-3 py-1 bg-red-600 rounded-full font-semibold text-white cursor-pointer' onClick={onDeleteConfirm}>Delete</button>
                        </div>
                    </div>
                </Modal>
            </div>)}
        </>
    )
}

export default UserProfiles