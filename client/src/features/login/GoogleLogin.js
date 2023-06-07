import { React } from 'react'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../firebase';
import { useLoginGoogleMutation } from './authApiSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from './authSlice';
import { PulseLoader } from 'react-spinners';

const GoogleLogin = ({ onClose }) => {
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }
    const [loginGoogle, { isLoading }] = useLoginGoogleMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleSignIn = async () => {
        try {
            let googleSignResponse = await googleSignIn()
            // This gives you a Google Access Token. You can use it to access the Google API.
            // The signed-in user info.
            const user = googleSignResponse.user;
            let googleToken = user.accessToken
            const { accessToken } = await loginGoogle(googleToken).unwrap()
            dispatch(setCredentials({ accessToken }))
            localStorage.setItem('persist', true);
            navigate('/dashboard')
            onClose()
        }
        catch (error) {
            console.log("error in googlelogin", error)
            onClose()
        }
    }

    return (
        <>
            {isLoading ?
                <button className='bg-gray-100 rounded-3xl cursor-pointer text-center font-bold px-5 py-3' onClick={handleGoogleSignIn}>
                    <PulseLoader color={"white"} />
                </button>
                :
                <button className='bg-gray-100 rounded-3xl cursor-pointer text-center font-bold px-5 py-3' onClick={handleGoogleSignIn}>
                    {/* <SocialIcon network="google" style={{ height: 25, width: 25 }} /> */}
                    &nbsp; Google</button>
            }
        </>
    )
}

export default GoogleLogin