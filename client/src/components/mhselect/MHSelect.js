import React from 'react'
import Select from 'react-select';
import MHToolTip from '../ToolTip/ToolTip';

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

const MHSelect = ({ id, label, field, list, placeholder, hasError, errorMsg, tooltip = null }) => {
    return (
        <div className='flex flex-col gap-1 w-full'>
            <div className='flex gap-1 items-center'>
                <label className='text-sm' htmlFor={id}>{label}</label>{tooltip && <MHToolTip tooltip={tooltip} />}
            </div>
            <Select
                {...field}
                isDisabled={false}
                isLoading={false}
                isClearable={false}
                isSearchable={true}
                options={list}
                styles={selectStyles}
                placeholder={placeholder}
            />
            {hasError && (
                <p className='text-sm text-red-500'>{errorMsg}</p>
            )}
        </div>
    )
}

export default MHSelect