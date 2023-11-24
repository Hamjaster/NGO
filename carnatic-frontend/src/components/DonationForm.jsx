import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../context/context'
import { BiDownArrowAlt, BiLoaderCircle, BiRightArrowAlt } from 'react-icons/bi'
import { useDisclosure } from '@chakra-ui/react/dist'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import OTPVerifications from './OTPVerifications'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../../firebase.config'
import toast from 'react-hot-toast'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { CgSpinner } from "react-icons/cg";

export default function DonationForm() {
    const { member, project, setProject, userInfo, donationInfo, setDonationInfo } = useContext(MyContext)
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true)
    const [loading, setLoading] = useState(false)
    const [phone, setphone] = useState(null)
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const createUser = async () => {
        try {
            // Check if such user don't exists

            const { data } = await axios.post('https://carnatic-backend.vercel.app/member/new', {
                name: donationInfo.name,
                PAN: donationInfo.PAN,
                email: donationInfo.email,
                phone: donationInfo.phone
            })
            console.log(data);
            if (data['_id']) {
                toast.success('Registered successfully')
                return true
            } else {
                toast.error(data.message)
                return false
            }
        } catch (error) {
            toast.error('Error while registeration')
            console.log(error);
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
        setLoading(true);
        onCaptchVerify();
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, "+" + donationInfo.phone, appVerifier)
            .then(async (confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                const done = await createUser()
                if (done) {
                    toast.success('OTP sent !')
                    onOpen()
                }
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }

    const updateInfo = (e) => {
        setDonationInfo({
            ...donationInfo,
            [e.target.name]: e.target.value
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
        console.log(donationInfo);
    }, [donationInfo])



    return (
        <div className='h-[84.5vh] text-[#474848] font-roboto mx-auto w-full'>


            <form onSubmit={(e) => e.preventDefault()} className='mt-4 md:mt-12 mx-auto w-full md:w-2/3 bg-white shadow-lg px-10 pb-24 text-[#474848] pt-7'>

                <h1 className='font-bold font-poppins 
            text-center mx-auto text-4xl flex items-center space-x-8 my-8 md:text-5xl'>
                    <span className=''>Donation Form</span>
                </h1>

                <div class="relative z-0 w-full mb-11 group">

                    <input disabled={member !== 'guest'} value={donationInfo.name} onChange={(e) => updateInfo(e)} type="text" name="name" id="name" class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-[#fe0248] peer" placeholder=" " required />

                    <label for="name" class="peer-focus:font-medium absolute text-lg text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#fe0248]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name (As in PAN Card)</label>
                </div>

                <div class="relative z-0 w-full mb-11 group flex flex-row space-x-5">
                    <div className={`${member === 'guest' ? "w-4/5" : "w-full"} '`}>

                        <input disabled={member !== 'guest'} value={donationInfo.PAN} onChange={(e) => updateInfo(e)} type="text" name="PAN" id="pan" class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#fe0248] peer" placeholder=" " required />
                        <label for="pan" class="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#fe0248] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">PAN Number</label>

                    </div>
                    <button className={`${member === 'guest' ? "" : "hidden"}  bg-[#fe0248] text-lg py-1 px-1 w-3/5 sm:w-1/5 rounded-md hover:bg-[#D60036] text-white`}>Verify</button>
                </div>

                <div class="grid md:grid-cols-2 md:gap-6">

                    <div class="relative z-0 w-full mb-6 group">
                        {
                            member !== "guest"
                                ?
                                <>
                                    <input value={donationInfo.phone} onChange={(e) => updateInfo(e)} type="text" name="phone" id="floating_first_name" class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-[#fe0248] peer" placeholder="Phone Number" required />
                                    {/* <div className='absolute text-lg font-medium bottom-[12px] left-0'>+91</div> */}
                                </>

                                : <PhoneInput
                                    country={'in'}
                                    value={phone}
                                    // containerStyle={{
                                    //     width: '100%'
                                    // }}
                                    // inputStyle={{
                                    //     width: '100%'
                                    // }}
                                    onChange={phone => setphone(phone)}
                                />
                        }

                    </div>

                    <div class="relative z-0 w-full mb-6 group">
                        <input disabled={member !== 'guest'} value={donationInfo.email} onChange={(e) => updateInfo(e)} type="email" name="email" id="floating_last_name" class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-[#fe0248] peer" placeholder=" " required />
                        <label for="email" class="peer-focus:font-medium absolute text-lg text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#fe0248]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                    </div>

                </div>

                {member === 'guest'
                    ?
                    <div class="flex items-center space-x-8">
                        <div className="parent flex items-center">
                            <input checked={checked} onChange={(e) => setChecked(e.target.checked)} id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-[#D60036] bg-gray-100 border-gray-300 rounded " />
                            <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 ">Also register me as a<a href="#" class="ms-1 text-[#D60036]  hover:underline">Carnatic Member</a>.</label>
                        </div>

                        <div className='parent flex items-center'>
                            <input id='check2' type="checkbox" value="" class="w-4 h-4 text-[#D60036] bg-gray-100 border-gray-300 rounded " />
                            <label for="check2" class="ms-2 text-sm font-medium text-gray-900 ">
                                I'd like to be contacted for discussing membership opportunities
                            </label>
                        </div>
                    </div>
                    : <></>
                }

                {/* Project Dropdown */}
                <div onClick={() => setOpen(!open)} className={`relative z-0 select-none text-center mt-8 w-full`}>

                    <div className={`flex flex-row items-center text-lg justify-center py-2 cursor-pointer space-x-7 hover:bg-[#fe1648] hover:text-white border border-[#fe1648]`}>
                        {project
                            ? <>Donating to : {project} </>
                            : <>
                                <span>Chose a Project</span>
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
                                    setProject('Project 1')
                                }} class="block  px-3  py-2  hover:bg-gray-200">Project 1</div>
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

                {/* Proceed button */}
                <button
                    disabled={!project || !donationInfo.PAN || !donationInfo.phone || !donationInfo.email || !donationInfo.name}
                    onClick={() => {
                        member === 'guest'
                            ? onSignup()
                            : navigate('/amount')
                    }} id='sign-in-button' type='submit' className='recaptcha bg-[#fe0248] hover:bg-[#D60036] text-xl mt-5 float-right disabled:bg-gray-400 py-3 flex items-center justify-center space-x-2 px-1 w-3/5 sm:w-1/5 rounded-md text-white'>
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

            </form>


            {/* OPT modal */}
            <OTPVerifications isOpen={isOpen} onClose={onClose} onOpen={onOpen} />

        </div>
    )
}
