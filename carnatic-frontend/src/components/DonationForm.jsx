import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../context/context'
import { BiDownArrowAlt, BiFemaleSign, BiLoaderCircle, BiRightArrowAlt } from 'react-icons/bi'
import { ToastOptionProvider, flattenTokens, useDisclosure } from '@chakra-ui/react/dist'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import OTPVerifications from './OTPVerifications'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../../firebase.config'
import toast from 'react-hot-toast'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { CgSpinner } from "react-icons/cg";
import logo from '../assets/logo.jpeg'

export default function DonationForm() {
    const { member, project, setProject, userInfo, donationInfo, setDonationInfo, proxy } = useContext(MyContext)
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [otploading, setOtploading] = useState(false)
    const [phone, setphone] = useState(null)
    const [otpsent, setotpsent] = useState(false)
    const [otpvalidateLoading, setotpvalidateLoading] = useState(false)
    const [phoneVerified, setPhoneVerified] = useState(false)
    const [otp, setotp] = useState()
    const navigate = useNavigate()
    const [panValidated, setPanValidated] = useState(false)
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [panverifyloading, setPanverifyloading] = useState(false)

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    useEffect(() => {
        setIsValidEmail(validateEmail(donationInfo.email));
    }, [donationInfo.email]);


    const createUser = async () => {
        setLoading(true)
        try {
            const { data } = await axios.post(`${proxy}/member/new`, {
                name: donationInfo.name,
                PAN: donationInfo.PAN,
                email: donationInfo.email,
                phone: donationInfo.phone,
                address: donationInfo.address,
                isContacted: checked
            })
            console.log(data);
            if (data['_id']) {
                donationInfo['id'] = data['_id']
                toast.success('Registered successfully')
                setLoading(false)
                navigate('/amount')
                return true
            } else {
                toast.error(data.message)
                setLoading(false)
                return false
            }
        } catch (error) {
            toast.error('Error while registeration')
            console.log(error);
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
            const res = await signInWithPhoneNumber(auth, "+" + donationInfo.phone, appVerifier)
            window.confirmationResult = res
            toast.success("We've sent OTP")
            setOtploading(false)
            setotpsent(true)
        } catch (error) {
            console.log(error);
            setOtploading(false);
            setotpsent(false)
            return false
        }
    }

    const updateInfo = (e) => {
        let { name, value } = e.target;
        const keyPressed = e.keyCode || e.which;



        if (name === "name") {
            value = value.replace(/[^a-z\s]/gi, '');
            value = value.toUpperCase();
        }
        if (name === "PAN") {

            value = value.toUpperCase();
        }

        setDonationInfo({
            ...donationInfo,
            [name]: value
        })
    }

    useEffect(() => {
        setDonationInfo((donationInfo) => {
            return {
                ...donationInfo,
                "project": project
            }
        })
    }, [project])

    useEffect(() => {
        {
            member === "guest"
                ? setDonationInfo((donationInfo) => {
                    return {
                        ...donationInfo,
                        "phone": parseInt("+" + phone)
                    }
                })
                : console.log('You are a carnatic member')
        }

    }, [phone])

    useEffect(() => {
        {
            member === "guest"
                ? setDonationInfo((donationInfo) => {
                    return {
                        ...donationInfo,
                        "isContacted": checked
                    }
                })
                : console.log('You are a carnatic member')
        }

    }, [checked])


    function onOTPVerify() {
        setotpvalidateLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                console.log(res);
                console.log(res.user);
                setotpvalidateLoading(false);
                setPhoneVerified(true)
                setotpsent(false)
            })
            .catch((err) => {

                if (err.message === "Firebase: Error (auth/invalid-verification-code).") {
                    toast.error('Invalid OTP')
                } else {
                    toast.error(err.message)
                }
                console.log(err)
                setotpvalidateLoading(false);
            });
    }

    useEffect(() => {
        console.log(donationInfo)
    }, [donationInfo])

    const verifyPAN = async () => {

        setPanverifyloading(true)

        const BearerToken = import.meta.env.VITE_SUREPASS
        // Checking if name is empty
        if (!donationInfo.name) {
            toast.error("Fill the Name Field first")
            setPanverifyloading(false)
        } else {
            // Body for Request
            const body = {
                id_number: donationInfo.PAN
            }
            // Headers for request
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${BearerToken}`,
            }

            try {
                const { data } = await axios.post('https://kyc-api.aadhaarkyc.io/api/v1/pan/pan-comprehensive', body,
                    {
                        headers: headers
                    }
                )
                // If request succeeds
                if (data.message_code === "success") {
                    // Checking if name of PAN matches with entered-name
                    if (data.data.full_name === donationInfo.name) {
                        setPanValidated(true)
                        setPanverifyloading(false)
                        toast.success('Your PAN card no. is verified')
                    } else {
                        toast.error("Your name is inconsistent with that of PAN card name")
                        setPanValidated(false)
                        setPanverifyloading(false)
                    }
                } else {
                    setPanverifyloading(false)
                    toast.error('Validation Failed.')
                }
            } catch (error) {
                setPanverifyloading(false)
                console.log(error)
                toast.error('Validation falied.')
            }
        }
    }

    return (
        <div className='text-[#474848] h-screen overflow-y-scroll font-roboto mx-auto w-full'>


            <section className='mx-auto w-full md:w-2/3 space-y-10 py-4  pb-8 bg-white shadow-lg px-4 sm:px-10 text-[#474848]'>

                <h1 className='font-bold font-poppins 
            text-center mx-auto text-4xl flex w-full items-center justify-between space-x-0 sm:space-x-8 md:text-5xl'>
                    <img src={logo} className='w-20 sm:w-32' />
                    <span className='text-center  w-full'>Donation Form</span>
                </h1>

                {/* Name input */}
                <div class="relative z-0 w-full  group">

                    <input disabled={member !== 'guest'} value={donationInfo.name} onChange={(e) => updateInfo(e)} type="text" name="name" id="name" class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-[#fe0248] peer" placeholder=" " required />

                    <label for="name" class="peer-focus:font-medium absolute text-lg text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#fe0248]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name (As in PAN Card)</label>
                </div>

                {/* PAN number input */}
                <div class="relative z-0 w-full  group flex flex-row items-center justify-between gap-3">

                    <div className={`${member === 'guest' ? "w-full" : "w-full"} '`}>

                        <input disabled={member !== 'guest' || (member === 'guest' && panValidated)} value={donationInfo.PAN} onChange={(e) => updateInfo(e)} type="text" name="PAN" id="pan" class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#fe0248] peer" placeholder=" " required />
                        <label for="pan" class="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#fe0248] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">PAN Number</label>

                    </div>

                    <button disabled={panValidated} onClick={verifyPAN} className={`${member === 'guest' ? "" : "hidden"} w-44    bg-[#4dd7fe] text-lg h-[3.1rem]  rounded-md disabled:bg-gray-400 hover:bg-[#00c8ff] text-white`}>
                        {panverifyloading
                            ? <div className='animate-spin mx-auto text-2xl max-w-min'>
                                <CgSpinner />
                            </div>
                            // If pan is validated, show verified
                            : panValidated ? "Verified" : "Verify"
                        }
                    </button>

                </div>


                {/* Phone */}
                <div class="relative z-0 w-full group">
                    {
                        member !== "guest"
                            ?
                            <>
                                <input disabled value={donationInfo.phone} type="text" name="phone" class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#fe0248] peer" placeholder=" " required />
                                <label for="pan" class="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#fe0248] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
                            </>

                            :
                            <div className='flex flex-row items-center justify-between w-full gap-3'>

                                <div className={`w-full`}>
                                    <PhoneInput
                                        country={'in'}
                                        countryCodeEditable={false}
                                        value={phone}
                                        onlyCountries={['in']}
                                        containerStyle={{
                                            width: '100%'
                                        }}
                                        disabled={phoneVerified}
                                        inputStyle={{
                                            width: '100%'
                                        }}
                                        onChange={phone => setphone(phone)}
                                    />
                                </div>


                                <button id='sign-in-button' disabled={phoneVerified} onClick={async () => {
                                    await onSignup()
                                }} className={`${member === 'guest' ? "" : "hidden"} w-44    bg-[#4dd7fe] text-lg h-[3.1rem]  rounded-md disabled:bg-gray-400 hover:bg-[#00c8ff] text-white`}>

                                    {
                                        phoneVerified ? "Verified" :
                                            otploading
                                                ? <div className='animate-spin mx-auto text-2xl max-w-min'>
                                                    <CgSpinner />
                                                </div>
                                                : otpsent ? "Send again" : "Verify"

                                    }
                                </button>


                            </div>
                    }

                </div>

                {/* OTP validation */}
                {otpsent ?
                    <div class="relative z-0 w-full group">
                        <div className='flex flex-row gap-5'>


                            <div className={` '`}>
                                <input value={otp} onChange={(e) => setotp(e.target.value)} class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#fe0248] peer" placeholder="OTP code" required />
                            </div>



                            <button onClick={() => {
                                onOTPVerify()
                            }} className={`${member === 'guest' ? "" : "hidden"} bg-[#4dd7fe] text-lg py-1 w-32 rounded-md hover:bg-[#00c8ff] text-white`}>
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

                {/* Email & Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">


                    <div class="relative z-0 w-full group">
                        <input disabled={member !== 'guest'} value={donationInfo.email} onChange={(e) => updateInfo(e)} type="email" name="email" id="floating_last_name" class={`"block py-2.5 px-2 w-full text-lg text-gray-900 rounded-lg bg-transparent border-2 
                            ${isValidEmail ? 'border-gray-300' : 'border-red-500'}
                                 appearance-none  focus:outline-none peer"`} placeholder="Enter Email " required />
                        {/* <label for="email" class="peer-focus:font-medium absolute text-lg text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#fe0248]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label> */}
                    </div>

                    <div class="relative z-0 w-full group">
                        <input disabled={member !== 'guest'} value={donationInfo.address} onChange={(e) => updateInfo(e)} type="text" name="address" id="address" class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-[#fe0248] peer" placeholder=" " required />
                        <label for="address" class="peer-focus:font-medium absolute text-lg text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#fe0248]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                    </div>

                </div>


                {/* Project Dropdown */}
                <div onClick={() => setOpen(!open)} className={`relative z-0 select-none text-center w-full`}>

                    <div className={`flex flex-row items-center text-lg justify-center py-2 cursor-pointer space-x-7 hover:bg-[#fe1648] hover:text-white border border-[#fe1648]`}>
                        {project
                            ? <>Donating to : {project} </>
                            : <>
                                <span>Select a Project</span>
                                <span><BiDownArrowAlt /></span>
                            </>
                        }
                    </div>

                    {/* Projects dropdown */}
                    <div id="dropdown" class={`${open ? "" : "hidden"} top-full left-0 right-0 z-10 absolute select-none  w-full divide-y divide-gray-100 rounded-lg `}>

                        <ul class="text-lg select-none bg-gray-100 border-2  text-gray-700" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <div onClick={() => {
                                    setOpen(false)
                                    setProject('Corpus')
                                }} class="block  px-3  py-2  hover:bg-gray-200">Corpus</div>
                            </li>
                            <li>
                                <div onClick={() => {
                                    setOpen(false)
                                    setProject('Project 2')
                                }} class="block  px-3  py-2  hover:bg-gray-200">Project 2</div>
                            </li>
                            <li>
                                <div onClick={() => {
                                    setOpen(false)
                                    setProject('Project 3')
                                }} class="block  px-3  py-2  hover:bg-gray-200">Project 3</div>
                            </li>
                            <li>
                                <div onClick={() => {
                                    setOpen(false)
                                    setProject('Project 4')
                                }} class="block  px-3  py-2  hover:bg-gray-200">Project 4</div>
                            </li>

                        </ul>
                    </div>

                </div>

                {/* Boxes */}
                {member === 'guest'
                    ?
                    <div class="flex items-center space-x-8">
                        <div className='parent flex items-center'>
                            <input checked={checked}
                                onChange={(e) => setChecked(e.target.checked)}
                                id='check2' type="checkbox" class="w-4 h-4 text-[#D60036] bg-gray-100 border-gray-300 rounded " />
                            <label for="check2" class="ms-2 text-sm font-medium text-gray-900 ">
                                I'd like to be contacted for discussing membership opportunities
                            </label>
                        </div>
                    </div>
                    : <></>
                }


                {/* Proceed button */}
                <button
                    disabled={
                        member === "guest"
                            ?
                            !project || !donationInfo.PAN
                            // || !phoneVerified 
                            || !donationInfo.email || !donationInfo.name || !isValidEmail
                            // ||  !panValidated
                            : !project
                    }
                    onClick={() => {
                        member === 'guest'
                            ? createUser()
                            : navigate('/amount')
                    }} className='bg-[#4dd7fe] hover:bg-[#00c8ff] text-xl  disabled:bg-gray-400 h-12 flex items-center justify-center space-x-2 px-1 w-44 rounded-md text-white'>
                    {loading
                        ? <div className='animate-spin'>
                            <CgSpinner />
                        </div>
                        :
                        <>
                            <span> Proceed</span>
                            <span><BiRightArrowAlt /></span>
                        </>
                    }
                </button>

                <div id="recaptcha h-44 w-44">
                </div>

            </section>
        </div>
    )
}
