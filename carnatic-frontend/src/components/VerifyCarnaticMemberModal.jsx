import React, { useContext, useEffect, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    useConst,
    Button,
} from '@chakra-ui/react/dist'
import MyContext from '../context/context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BiLoader, BiLoaderAlt, BiLoaderCircle } from 'react-icons/bi'
import { CgSpinner } from "react-icons/cg";
import PhoneInput from 'react-phone-input-2'
import toast from 'react-hot-toast'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '../../firebase.config'

export default function VerifyCarnaticMemberModal({ isOpen, onOpen, onClose }) {
    const { member, setDonationInfo, proxy } = useContext(MyContext)
    const navigate = useNavigate()
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [otpsent, setotpsent] = useState(false)
    const [otploading, setOtploading] = useState(false)
    const [otpvalidateLoading, setOtpvalidateLoading] = useState(false)
    const [otp, setotp] = useState()
    const [isVerified, setIsVerified] = useState(false)

    const handleVerifyMember = async () => {
        console.log('verifying')
        setLoading(true)
        let phone = password.toString()
        phone = phone.slice(2)
        console.log(phone, 'final ph')
        try {
            const { data } = await axios.get(`${proxy}/member/find/${phone}`)
            if (data.name && data.PAN) {
                setLoading(false)
                console.log(data)
                setDonationInfo(data)
                setError(null)
                navigate('/donate')
                return true
            } else {
                setError('No such member found ')
                console.log('No such user found');
                setLoading(false)
                return false
            }

        } catch (error) {
            console.log(error)
            setError('Some unexpected error occured ')
            setLoading(false)
            return false
        }
    }

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
                'size': 'invisible',
                'callback': (response) => {

                    onSignup();
                }
            }
                , auth
            );

        }
    }

    const onSignup = async () => {
        setOtploading(true);
        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier;
        try {
            const res = await signInWithPhoneNumber(auth, "+" + password, appVerifier)
            window.confirmationResult = res
            toast.success("We've sent OTP")
            setOtploading(false)
            setotpsent(true)
            return true
        } catch (error) {
            console.log(error);
            setOtploading(false);
            setotpsent(false)
            return false
        }
    }

    async function onOTPVerify() {
        setOtpvalidateLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                console.log(res);
                console.log(res.user);
                setOtpvalidateLoading(false);
                setotpsent(false)
                setIsVerified(true)
                handleVerifyMember()
            })
            .catch((err) => {
                if (err.message === "Firebase: Error (auth/invalid-verification-code).") {
                    setOtpvalidateLoading(false);
                    toast.error('Invalid OTP')
                    return false
                } else {
                    setOtpvalidateLoading(false);
                    toast.error(err.message)
                    return false
                }
                console.log(err)
                setOtpvalidateLoading(false);
                return false
            });
    }


    console.log(password);
    useEffect(() => {
        console.log(password);
    }, [password])

    return (
        <div>
            <Modal size={{ xs: 'full', base: 'full', sm: 'md', md: 'md', lg: 'lg' }} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Verification</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <div className="mx-5 mt-5 font-roboto">
                            <div className='text-2xl md:text-4xl font-bold mb-5'>
                                Carnatic Members
                            </div>

                            <div className={`w-full`}>
                                <PhoneInput
                                    country={'in'}
                                    countryCodeEditable={false}
                                    onlyCountries={['in']}
                                    value={password}
                                    containerStyle={{
                                        width: '100%'
                                    }}
                                    inputStyle={{
                                        width: '100%'
                                    }}
                                    onChange={phone => setPassword(phone)}

                                />
                            </div>

                            {otpsent ?
                                <div class="relative my-5 z-0 w-full group">
                                    <div className='flex flex-row gap-5'>


                                        <div className={` '`}>
                                            <input value={otp} onChange={(e) => setotp(e.target.value)} class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#fe0248] peer" placeholder="OTP code" required />
                                        </div>



                                        <button onClick={() => {
                                            onOTPVerify()
                                        }} className={`bg-[#4dd7fe] text-lg py-1 w-32 rounded-md hover:bg-[#00c8ff] text-white`}>
                                            {otpvalidateLoading
                                                ? <div className='animate-spin mx-auto text-2xl max-w-min'>
                                                    <CgSpinner />
                                                </div>
                                                : "Validate"
                                            }
                                        </button>
                                    </div>
                                </div>
                                : <></>
                            }


                            <div className={`${!error ? "hidden" : ""}  text-red-700 px-1 py-3`}>
                                * {error}
                            </div>


                        </div>
                    </ModalBody>

                    <ModalFooter>

                        <button id='sign-in-button' disabled={!password} onClick={async () => {
                            onSignup()
                        }} className='bg-[#4dd7fe] hover:bg-[#00c8ff] text-xl mt-5 float-right flex items-center disabled:bg-gray-300 justify-center space-x-2 w-44 h-12 rounded-md text-white'>
                            {otploading || loading ?
                                <div className='animate-spin'>
                                    <CgSpinner />
                                </div>
                                :
                                <>
                                    Verify
                                </>
                            }
                        </button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}
