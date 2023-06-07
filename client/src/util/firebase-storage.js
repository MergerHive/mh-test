import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase'

export const fbImageUpload = async (userId, images) => {
    if (!images || images.length <= 0) {
        return
    }
    let imgUrlArray = []
    for (let imgCount = 0; imgCount < images.length; imgCount++) {
        const storageRef = ref(storage, `/images/${userId}/${images[imgCount].file.name}`);
        try {
            let uploadedImgSnapshot = await uploadBytes(storageRef, images[imgCount].file)
            let uploadedImgUrl = await getDownloadURL(uploadedImgSnapshot.ref)
            imgUrlArray.push(uploadedImgUrl)
        }
        catch (error) {
            console.log(error)
        }
    }
    return imgUrlArray
};

export const fbFileUpload = async (userId, files) => {
    if (!files || files.length <= 0) {
        return
    }
    let filesUrlArray = []
    for (let fileCount = 0; fileCount < files.length; fileCount++) {
        const storageRef = ref(storage, `/files/${userId}/${files[fileCount].name}`);
        try {
            let uploadedFileSnapshot = await uploadBytes(storageRef, files[fileCount])
            let uploadedFilesUrl = await getDownloadURL(uploadedFileSnapshot.ref)
            let fileObject = { fileURL: uploadedFilesUrl, fileName: files[fileCount].name }
            filesUrlArray.push(fileObject)
        }
        catch (error) {
            console.log(error)
        }
    }
    return filesUrlArray
};
