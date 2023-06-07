// import {
//     createEntityAdapter
// } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

// const usersAdapter = createEntityAdapter({})

// const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [
                { type: 'User', id: "LIST" }
            ]
        }),
    }),
})

export const {
    useAddNewUserMutation
} = usersApiSlice