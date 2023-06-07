import React from 'react'
import ImageUploading from 'react-images-uploading';
import getIcon from '../../common/Icons';
import MHToolTip from '../ToolTip/ToolTip';

const ImageUploader = ({ id, name, images, setImages, prevUploadedImg = [], setPrevUploadedImg, tooltip }) => {

    const maxNumber = 5;

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    const onUploadedImgRemove = (index) => {
        setPrevUploadedImg(prevUploadedImg.filter((value, i) => i !== index));
    }

    return (
        <div className='flex flex-col gap-4 w-full items-start justify-start  lg:flex-row lg:items-center'>
            <div className='flex lg:w-1/6 items-center justify-start'>
                <label className='text-sm' htmlFor={id}>{name}</label><MHToolTip tooltip={tooltip} />
            </div>
            <div className='flex lg:w-5/6'>
                <ImageUploading
                    id={id}
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                    }) => (
                        <div className='flex flex-col gap-2 w-full lg:flex-row'>
                            {/* write your building UI */}
                            <div className='flex flex-col gap-2'>
                                <button
                                    onClick={(event) => {
                                        event.preventDefault()
                                        return onImageUpload()
                                    }}
                                    className='px-5 py-2 bg-red-500 w-28 rounded text-center text-white'
                                >Upload Image</button>
                                {/* <button onClick={onImageRemoveAll} className='px-5 py-2 w-28 text-center text-white bg-blue-500 rounded'>Remove All</button> */}
                            </div>
                            <div className='flex flex-col gap-2 lg:flex-row'>
                                {imageList.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img src={image?.['data_url']} alt="" width="100" />
                                        <div className="flex bg-opacity-40 absolute w-6 items-center justify-center h-6 bg-black rounded-full right-[-8px] top-[-8px]">
                                            <button onClick={(event) => {
                                                event.preventDefault()
                                                return onImageRemove(index)
                                            }}>{getIcon("close", "1em", "white")}</button>
                                        </div>
                                    </div>
                                ))}
                                {prevUploadedImg.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img src={image?.image} alt="" width="100" />
                                        <div className="flex bg-opacity-40 absolute w-6 items-center justify-center h-6 bg-black rounded-full right-[-8px] top-[-8px]">
                                            <button onClick={(event) => {
                                                event.preventDefault()
                                                return onUploadedImgRemove(index)
                                            }}>{getIcon("close", "1em", "white")}</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </ImageUploading>
            </div>
        </div>
    )
}

export default ImageUploader