import React from 'react'
import MHToolTip from '../ToolTip/ToolTip'

const TextArea = React.forwardRef(({ id, tooltip = null, defaultValue, label, ...props }, ref) => {
    return (
        <div className='flex flex-col gap-1 w-full'>
            <div className='flex gap-1 items-center'>
                <label className='text-sm' htmlFor={id}>{label}</label>{tooltip && <MHToolTip tooltip={tooltip} />}
            </div>
            <textarea id={id} ref={ref} {...props} defaultValue={defaultValue} type="text" className='rounded px-2 py-1 text-sm h-[72px] border border-gray-300 shadow-inner shadow-gray-300' />
        </div>
    )
})

export default TextArea