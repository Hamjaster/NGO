import React, { useContext, useEffect, useState } from 'react'
import { BiDownArrow, BiDownArrowAlt } from 'react-icons/bi'
import { Link, redirect, useNavigate } from 'react-router-dom'
import MyContext from '../context/context'
import VerifyCarnaticMemberModal from './VerifyCarnaticMemberModal'
import { useDisclosure } from '@chakra-ui/react/dist'

export default function Dropdown() {
    const { member, setMember } = useContext(MyContext)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div className='flex flex-col text-[#474848] h-screen space-y-4 items-center justify-start pt-32 sm:pt-64'>

            {/* <div className=' text-4xl sm:text-6xl font-bold mb-16'>Tell us who you are ?</div> */}

            <div onClick={() => setOpen(!open)} className="text-lg sm:text-2xl cursor-pointer  border-2 w-1/3 px-4 py-2 relative ">

                <div className=''>
                    <span>
                        {member === 'guest' ? 'Guest' : "Carnatic Member"}
                    </span>
                    <span className='absolute top-3 right-4'>
                        <BiDownArrowAlt />
                    </span>
                </div>

                {/* Members dropdown */}
                <div id="dropdown" class={`${open ? "" : "hidden"} top-full left-0 right-0  z-10 absolute  w-full divide-y divide-gray-100 rounded-lg dark:bg-gray-700`}>

                    <ul class="sm:text-2xl text-lg bg-gray-100 border-2  text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
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
            }} className='disabled:bg-gray-400 bg-[#fe0248]  py-4 hover:bg-[#D60036] rounded-md text-xl text-center text-white w-1/3'>
                Continue
            </button>
            <VerifyCarnaticMemberModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </div>
    )
}
