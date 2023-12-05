import React, { useContext, useEffect, useState } from 'react'
import { BiDownArrow, BiDownArrowAlt } from 'react-icons/bi'
import { Link, redirect, useNavigate } from 'react-router-dom'
import MyContext from '../context/context'
import VerifyCarnaticMemberModal from './VerifyCarnaticMemberModal'
import { useDisclosure } from '@chakra-ui/react/dist'
import Navbar from './Navbar'

export default function Dropdown() {
    const { member, setMember } = useContext(MyContext)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div className='h-screen w-full'>
            <Navbar />

            <div className='flex w-full  flex-col text-[#474848] h-[70vh] space-y-4 items-center justify-center pt-32 sm:pt-64'>



                <div onClick={() => setOpen(!open)} className="text-lg sm:text-2xl cursor-pointer  border-2 w-2/3 sm:w-1/3 px-4 py-2 relative ">

                    <div className=''>
                        <span>
                            {member === 'guest' ? 'Guest' : "Carnatic Member"}
                        </span>
                        <span className='absolute top-3 right-4'>
                            <BiDownArrowAlt />
                        </span>
                    </div>

                    {/* Members dropdown */}
                    <div id="dropdown" class={`${open ? "" : "hidden"} top-full left-0 right-0  z-10 absolute  w-full divide-y divide-gray-100 rounded-lg `}>

                        <ul class="sm:text-2xl text-md bg-gray-100 border-2" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <div onClick={() => {
                                    setMember('guest')
                                    setOpen(false)
                                }} class="block  px-3  py-2  hover:bg-gray-200">Guest</div>
                            </li>
                            <li>
                                <div onClick={() => {
                                    setMember('carnatic')
                                    setOpen(false)
                                }} class="block  px-3  py-2  hover:bg-gray-200">Carnatic Member</div>
                            </li>
                        </ul>

                    </div>


                </div>

                <button disabled={!member} onClick={() => {
                    if (member !== 'guest') {
                        onOpen()
                    } else {
                        navigate('/donate');
                    }
                }} className='disabled:bg-gray-400 bg-[#4dd7fe]  py-4 hover:bg-[#00c8ff] rounded-md text-xl text-center text-white w-1/3'>
                    Continue
                </button>
                <VerifyCarnaticMemberModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            </div>
        </div>

    )
}
