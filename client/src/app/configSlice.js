import { createSlice } from '@reduxjs/toolkit'
const getCountryFromStorage = () => {
    try {
        return JSON.parse(localStorage.getItem('countryDetails'));
    } catch (e) {
        return false;
    }
}
const initialState = {
    country: getCountryFromStorage() || { name: 'Afghanistan', alpha2: 'AF', alpha3: 'AFG', isoNumeric: '004', currency: 'AFN' },
    exchangeRate: 1,
    isLoading: false
}

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setCountry: (state, { payload }) => {
            state.country = payload
        },
        setExchangeRate: (state, { payload }) => {
            state.exchangeRate = payload
        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload
        }
    }
})


export default configSlice.reducer
export const { setCountry, setExchangeRate, setIsLoading } = configSlice.actions;