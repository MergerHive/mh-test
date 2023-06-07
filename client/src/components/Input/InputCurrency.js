import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getformatedNumber } from '../../common/converterUtil'
import MHToolTip from '../ToolTip/ToolTip'

const InputCurrency = React.forwardRef(({ id, label, defaultValue = '', hasError, tooltip, errorMsg, ...props }, ref) => {

    let country = useSelector(state => state.config.country)
    const [number, setNumber] = useState(defaultValue)

    const formatNumber = (e) => {
        let formattedNumber = getformatedNumber(e.target.value)
        if (formattedNumber) {
            setNumber(formattedNumber)
        }
    }

    return (
        <div className='flex flex-col gap-1 w-full'>
            <div className='flex gap-1 items-center'>
                <label className='text-sm' htmlFor={id}>{label}</label><MHToolTip tooltip={tooltip} />
            </div>
            <div className='flex items-center rounded w-full px-2 border border-gray-300 shadow-inner shadow-gray-300 space-x-2 divide-gray-300 divide-x-[1px]'>
                <span>{country.currency}</span>
                <input  {...props} id={id} ref={ref} type="text" className='w-full px-2 h-9 bg-transparent text-sm focus:outline-none' value={number} onChange={formatNumber} />
            </div>
            {hasError && (
                <p className='text-sm text-red-500'>{errorMsg}</p>
            )}
        </div>
    )
})

export default InputCurrency