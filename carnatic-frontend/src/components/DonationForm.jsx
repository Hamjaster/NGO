import React, { useContext, useEffect, useState } from 'react'
import MyContext from '../context/context'
import { BiDownArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import { useDisclosure } from '@chakra-ui/react/dist'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


export default function DonationForm() {
    const { member, project, setProject, userInfo, donationInfo, setDonationInfo } = useContext(MyContext)
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true)
    const navigate = useNavigate()

    const updateInfo = (e) => {
        setDonationInfo({
            ...donationInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitForm = async () => {

        if (member === 'guest') {
            try {
                const { data } = await axios.post('http://localhost:5000/member/new', donationInfo)
                console.log(data);

                navigate('/amount')

            } catch (error) {
                console.log(error);
            }
        } else {
            navigate('/amount')
        }
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
        console.log(userInfo, donationInfo)
    }, [userInfo])


    return (
        <div className='h-screen text-[#474848] font-roboto mx-auto w-full'>

            <h1 className='pt-1 md:pt-24 font-bold font-poppins 
            text-center mx-auto text-4xl md:text-5xl'>Donation Form</h1>

            <form onSubmit={(e) => e.preventDefault()} className='mt-4 md:mt-10 mx-auto w-full sm:w-2/3 bg-white shadow-lg px-10 py-14 pb-24 text-[#474848]'>

                <div class="relative z-0 w-full mb-11 group">

                    <input disabled={member !== 'guest'} value={donationInfo.name} onChange={(e) => updateInfo(e)} type="text" name="name" id="name" class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#fe0248] peer" placeholder=" " required />

                    <label for="name" class="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#fe0248] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name (As in PAN Card)</label>
                </div>

                <div class="relative z-0 w-full mb-11 group flex flex-row space-x-5">
                    <div className={`${member === 'guest' ? "w-4/5" : "w-full"} '`}>

                        <input disabled={member !== 'guest'} value={donationInfo.PAN} onChange={(e) => updateInfo(e)} type="text" name="PAN" id="pan" class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#fe0248] peer" placeholder=" " required />
                        <label for="pan" class="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#fe0248] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">PAN Number</label>

                    </div>
                    <button className={`${member === 'guest' ? "" : "hidden"}  bg-[#fe0248] text-lg py-1 px-1 w-3/5 sm:w-1/5 rounded-md hover:bg-[#D60036] text-white`}>Verify</button>
                </div>

                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-6 group">
                        <input disabled={member !== 'guest'} value={donationInfo.phone} onChange={(e) => updateInfo(e)} type="text" name="phone" id="floating_first_name" class="pl-9 block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#fe0248] peer" placeholder="Phone Number" required />
                        <div className='absolute text-lg font-medium bottom-[12px] left-0'>+91</div>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                        <input disabled={member !== 'guest'} value={donationInfo.email} onChange={(e) => updateInfo(e)} type="email" name="email" id="floating_last_name" class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#fe0248] peer" placeholder=" " required />
                        <label for="email" class="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#fe0248] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                    </div>
                </div>

                {member === 'guest'
                    ?
                    <div class="flex items-center">
                        <input checked={checked} onChange={(e) => setChecked(e.target.checked)} id="link-checkbox" type="checkbox" value="" class="w-4 h-4 text-[#D60036] bg-gray-100 border    -gray-300 rounded " />
                        <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 ">Also register me as a<a href="#" class="ms-1 text-[#D60036]  hover:underline">Carnatic Member</a>.</label>
                    </div>
                    : <></>
                }

                {/* Project Dropdown */}
                <div onClick={() => setOpen(!open)} className={`relative select-none text-center mt-8 w-full`}>

                    <div className={`flex flex-row items-center text-2xl justify-center py-2 cursor-pointer space-x-7 hover:bg-[#fe1648] hover:text-white border border-[#fe1648]`}>
                        {project
                            ? <>Donating to : {project} </>
                            : <>
                                <span>Chose a Project</span>
                                <span><BiDownArrowAlt /></span>
                            </>
                        }
                    </div>

                    {/* Projects dropdown */}
                    <div id="dropdown" class={`${open ? "" : "hidden"} top-full left-0 right-0 z-10 absolute select-none  w-full divide-y divide-gray-100 rounded-lg dark:bg-gray-700`}>

                        <ul class="text-2xl select-none bg-gray-100 border-2  text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
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



                <button disabled={!project || !donationInfo.PAN || !donationInfo.phone || !donationInfo.email || !donationInfo.name} onClick={handleSubmitForm} type='submit' className='bg-[#fe0248] hover:bg-[#D60036] text-xl mt-5 float-right disabled:bg-gray-400 py-3 flex items-center justify-center space-x-2 px-1 w-3/5 sm:w-1/5 rounded-md text-white'>
                    <span> Proceed</span>
                    <span><BiRightArrowAlt /></span>
                </button>
            </form>



        </div>
    )
}
