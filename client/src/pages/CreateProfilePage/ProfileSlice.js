// import {
//     createEntityAdapter
// } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { createSlice } from '@reduxjs/toolkit'

// const profileAdapter = createEntityAdapter({})

// const initialState = profileAdapter.getInitialState()

export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addNewBusinessProfile: builder.mutation({
            query: initialProfileData => ({
                url: '/profile/business',
                method: 'POST',
                body: {
                    ...initialProfileData,
                }
            }),
            invalidatesTags: [
                { type: 'Profile', id: "LIST" }
            ]
        }),
        updateBusinessProfile: builder.mutation({
            query: ({ event, profileID }) => ({
                url: `/profile/business/${profileID}`,
                method: 'POST',
                body: {
                    ...event
                }
            })
        }),
        getBusinessByUserId: builder.query({
            query: (userId) => ({
                url: `/users/profiles/business/${userId}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
                transformResponse: (response, meta, arg) => response.data,
            }),
            providesTags: ['Profile'],
        }),
        getAllBusinessProfilesBasic: builder.query({
            query: ({ interestTypeFilter, industryTypeFilter, locationTypeFilter }) => ({
                url: `/profile/business-for-sale?intrestType=${interestTypeFilter}&industryType=${industryTypeFilter}&locationTypeFilter=${locationTypeFilter}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
                transformResponse: (response, meta, arg) => response.data,
            }),
            providesTags: ['Profile'],
        }),
        getBusinessProfileByProfileIDandUserID: builder.query({
            query: (profileID) => ({
                url: `/profile/business/${profileID}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
                transformResponse: (response, meta, arg) => response.data,
            }),
            providesTags: ['Profile'],
        }),
        getBusinessProfileByProfileID: builder.query({
            query: (profileID) => ({
                url: `/profile/business-profile/${profileID}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
                transformResponse: (response, meta, arg) => response.data,
            }),
            providesTags: ['ProfileByID'],
        }),
        deactivateProfileById: builder.mutation({
            query: (profileId) => ({
                url: `/profile/business/${profileId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Profile']
        })
    })
})

const initialState = {
    businessId: ""
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setBusinessId: (state, { payload }) => {
            state.businessId = payload
        }
    }
})

export default profileSlice.reducer
export const { setBusinessId } = profileSlice.actions;

export const {
    useAddNewBusinessProfileMutation,
    useUpdateBusinessProfileMutation,
    useDeactivateProfileByIdMutation,
    useGetBusinessByUserIdQuery,
    useGetBusinessProfileByProfileIDandUserIDQuery,
    useGetAllBusinessProfilesBasicQuery,
    useGetBusinessProfileByProfileIDQuery
} = profileApiSlice

