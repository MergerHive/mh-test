import React from 'react'
import AsyncSelect from 'react-select/async';

const selectStyles = {
    control: (provided, state) => ({
        ...provided,
        height: 36,
        minHeight: 36,
        boxShadow: state.isFocused ? 'inset 0 2px 4px 0 #d1d5db' : 'inset 0 2px 4px 0 #d1d5db',
        border: state.isFocused ? '1px solid #D1D5DB' : '1px solid #D1D5DB',
        '&:hover': {
            border: state.isFocused ? '1px solid #D1D5DB' : '1px solid #D1D5DB'
        }
    })
}

const LocationSelect = ({ id, label, field, list, placeholder }) => {

    const getLocationByString = async (inputValue) => {
        let response = await fetch(`http://localhost:3500/util/location?inputValue=${inputValue}`);
        response = await response.json()
        return (response.predictions.map(item => ({ ...item, label: item.description, value: item.description })))
    }

    return (
        <div className='flex flex-col gap-1 w-full'>
            <div className='flex gap-1 items-center'>
                <label className='text-sm' htmlFor={id}>{label}</label>
            </div>
            <AsyncSelect
                {...field}
                loadOptions={getLocationByString}
                cacheOptions
                isMulti
                defaultOptions
                formatOptionLabel={formatOptionLabel}
                styles={selectStyles}
                isOptionDisabled={() => field.value.length >= 1}
                placeholder={"select max 1 location"}
            />
        </div>
    );
}

const formatOptionLabel = ({ description, children }) => (
    <div>
        <div>{description}</div>
    </div>
);

export default LocationSelect