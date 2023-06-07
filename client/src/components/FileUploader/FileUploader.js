import React from 'react'
import { getIconWithClose } from '../../common/Icons';
import MHToolTip from '../ToolTip/ToolTip';

const MAX_COUNT = 5;

const FileUploader = ({ id, name, uploadedFiles, tooltip, setUploadedFiles, setPrevUploadedFiles, prevUploadedFiles = [] }) => {

    // const [fileLimit, setFileLimit] = useState(5);
    const handleFileEvent = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles);
    }
    const handleUploadFiles = files => {
        let limitExceeded = false
        const uploaded = [...uploadedFiles];
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                if (uploaded.length >= MAX_COUNT) return;
                else {
                    uploaded.push(file);
                }
            }
        })
        if (!limitExceeded) setUploadedFiles(uploaded)
    }

    const handleFileRemove = (e) => {
        e.preventDefault()
        let updatedFiles = uploadedFiles.filter((item) => {
            return item.name !== e.target.id
        })
        setUploadedFiles(updatedFiles)
    }

    const handlePrevFileRemove = (index) => {
        setPrevUploadedFiles(prevUploadedFiles.filter((value, i) => i !== index));
    }

    return (
        <div className='flex flex-col py-6 gap-4 w-full items-start justify-start  lg:flex-row lg:items-center'>
            <div className='flex lg:w-1/6 items-center justify-start'>
                <p className='text-sm'>{name}</p><MHToolTip tooltip={tooltip} />
            </div>
            <div className='flex w-5/6 lg:w-5/6 items-center gap-2'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='fileInput'>
                        <div className='px-5 py-2 bg-red-500 w-auto rounded text-center text-white'>File Upload</div>
                    </label>
                    <input
                        id='fileInput'
                        type={"file"}
                        multiple
                        className='hidden'
                        onChange={handleFileEvent}
                        onClick={(event) => {
                            event.target.value = null
                        }}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    {uploadedFiles.map((file, index) => (
                        <div key={index} className='relative'>
                            <div id={file.name} className='flex bg-opacity-40 absolute w-5 h-5 items-center justify-center bg-black rounded-full right-[-6px] top-[-6px]' onClick={handleFileRemove}>
                                <button id={file.name} onClick={handleFileRemove}>{getIconWithClose("close", "0.75em", "white", file.name, handleFileRemove)}</button>
                            </div>
                            <div className='px-2 py-2 rounded border border-gray-300 bg-slate-300'>
                                {file.name}
                            </div>
                        </div>
                    ))}
                    {prevUploadedFiles.map((file, index) => (
                        <div key={index} className='relative'>
                            <div id={file.fileName} className='flex bg-opacity-40 absolute w-5 h-5 items-center justify-center bg-black rounded-full right-[-6px] top-[-6px]' onClick={handleFileRemove}>
                                <button id={file.fileName} onClick={(event) => {
                                    event.preventDefault()
                                    return handlePrevFileRemove(index)
                                }}>{getIconWithClose("close", "0.75em", "white", file.fileName, handleFileRemove)}</button>
                            </div>
                            <div className='px-2 py-2 rounded border border-gray-300 bg-slate-300'>
                                {file.fileName}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FileUploader

