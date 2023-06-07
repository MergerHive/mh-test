import { apiSlice } from "../../app/api/apiSlice";

export const InvestorApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addNewInvestorProfile: builder.mutation({
            query: initialProfileData => ({
                url: '/profile/investor',
                method: 'POST',
                body: {
                    ...initialProfileData,
                }
            }),
            invalidatesTags: ['InvestorProfile']
        }),
        getInvestorProfileByUserID: builder.query({
            query: (userID) => ({
                url: `/profile/investor/${userID}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
                transformResponse: (response, meta, arg) => response.data,
            }),
            providesTags: ['InvestorProfile'],
        }),
        updateInvestorProfile: builder.mutation({
            query: ({ event, userID }) => ({
                url: `/profile/investor/${userID}`,
                method: 'POST',
                body: {
                    ...event
                }
            })
        }),
        addNewProfileInvestorMap: builder.mutation({
            query: data => ({
                url: '/mapping/profiles-investors',
                method: 'POST',
                body: {
                    ...data,
                }
            }),
            invalidatesTags: ['InvestorProfile']
        }),
        addNewUserInvestorMap: builder.mutation({
            query: data => ({
                url: '/mapping/user-investors',
                method: 'POST',
                body: {
                    ...data,
                }
            }),
            invalidatesTags: ['InvestorProfile']
        }),
        getAllInvestorProfilesBasic: builder.query({
            query: ({ industryTypeFilter, locationTypeFilter }) => ({
                url: `/profile/investor?industryType=${industryTypeFilter}&locationTypeFilter=${locationTypeFilter}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
                transformResponse: (response, meta, arg) => response.data,
            }),
            providesTags: ['Profile'],
        }),
        getInvestorProfileByProfileID: builder.query({
            query: (profileId) => ({
                url: `/profile/investor-profile/${profileId}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
                transformResponse: (response, meta, arg) => response.data,
            }),
            providesTags: ['InvestorProfile'],
        }),
    })
})

export const {
    useAddNewInvestorProfileMutation,
    useGetInvestorProfileByUserIDQuery,
    useAddNewProfileInvestorMapMutation,
    useUpdateInvestorProfileMutation,
    useGetAllInvestorProfilesBasicQuery,
    useGetInvestorProfileByProfileIDQuery,
    useAddNewUserInvestorMapMutation
} = InvestorApiSlice