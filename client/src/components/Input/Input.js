import React from 'react'
import MHToolTip from '../ToolTip/ToolTip'

const Input = React.forwardRef(({ id, label, tooltip = null, defaultValue, disabled = false, hasError, errorMsg, ...props }, ref) => {
    return (
        <div className='flex flex-col gap-1 w-full'>
            <div className='flex gap-1 items-center'>
                <label className='text-sm' htmlFor={id}>{label}</label>{tooltip && <MHToolTip tooltip={tooltip} />}
            </div>
            <input id={id} ref={ref} {...props} type="text" className='rounded px-2 text-sm h-9 border border-gray-300 shadow-inner shadow-gray-300' defaultValue={defaultValue} disabled={disabled} />
            {hasError && (
                <p className='text-sm text-red-500'>{errorMsg}</p>
            )}
        </div>
    )
})

export default Input