import React from 'react'
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import getIcon from '../../common/Icons';

const MHToolTip = ({ tooltip }) => {
    return (
        <>
            <div
                data-tooltip-id="my-tooltip"
                data-tooltip-content={tooltip}
                className='cursor-pointer'
            >
                {getIcon("infoCircle", "1.2em")}
            </div>
            <Tooltip id="my-tooltip" />
        </>
    )
}

export default MHToolTip