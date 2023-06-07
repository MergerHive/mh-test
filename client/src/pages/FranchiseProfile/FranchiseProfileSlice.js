import { apiSlice } from "../../app/api/apiSlice";
import { createSlice } from '@reduxjs/toolkit'


export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addNewFranchiseProfile: builder.mutation({
            query: initialProfileData => ({
                url: '/profile/franchise',
                method: 'POST',
                body: {
                    ...initialProfileData,
                }
            }),
            invalidatesTags: [
                { type: 'Profile', id: "LIST" }
            ]
        }),
        getFranchiseListByUserId: builder.query({
            query: (userID) => ({
                url: `/profile/franchise-list/${userID}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
                transformResponse: (response, meta, arg) => response.data,
            }),
            providesTags: ['Profile'],
        }),
        getFranchiseProfileByProfileIDandUserID: builder.query({
            query: (profileID) => ({
                url: `/profile/franchise/${profileID}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
                transformResponse: (response, meta, arg) => response.data,
            }),
            providesTags: ['Profile'],
        }),
        updateFranchiseProfile: builder.mutation({
            query: ({ event, profileID }) => ({
                url: `/profile/franchise/${profileID}`,
                method: 'POST',
                body: {
                    ...event
                }
            })
        }),
        getAllFranchiseProfilesBasic: builder.query({
            query: ({ industryTypeFilter, locationTypeFilter }) => ({
                url: `/profile/franchise?industryType=${industryTypeFilter}&locationTypeFilter=${locationTypeFilter}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
                transformResponse: (response, meta, arg) => response.data,
            }),
            providesTags: ['Profile'],
        }),
        getFranchiseProfileByProfileID: builder.query({
            query: (profileId) => ({
                url: `/profile/franchise-profile/${profileId}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
                transformResponse: (response, meta, arg) => response.data,
            }),
            providesTags: ['FranchiseProfile'],
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
    useAddNewFranchiseProfileMutation,
    useGetFranchiseListByUserIdQuery,
    useGetFranchiseProfileByProfileIDandUserIDQuery,
    useUpdateFranchiseProfileMutation,
    useGetAllFranchiseProfilesBasicQuery,
    useGetFranchiseProfileByProfileIDQuery
} = profileApiSlice

