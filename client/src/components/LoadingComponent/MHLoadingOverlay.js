import React from 'react'
import MHLoadingSVG from '../../assets/logos/MHpro.svg'
import LoadingPro from '../../assets/logos/loadingpro.svg'

const MHLoadingOverlay = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center z-50 bg-opacity-70 cursor-default">
            <div className="flex flex-col items-center justify-center">
                <img src={MHLoadingSVG} alt="MH" />
                <img src={LoadingPro} alt="Loading..." />
            </div>
        </div>

    )
}

export default MHLoadingOverlay