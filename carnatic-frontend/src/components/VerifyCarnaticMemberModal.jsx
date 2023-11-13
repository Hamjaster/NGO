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

export default function VerifyCarnaticMemberModal({ isOpen, onOpen, onClose }) {
    const { member, setDonationInfo } = useContext(MyContext)
    const navigate = useNavigate()
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)


    const handleVerifyMember = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`http://localhost:5000/member/find/${password}`)
            if (data.name && data.PAN) {
                setLoading(false)
                setDonationInfo(data)
                setError(null)
                navigate('/donate')
            } else {
                setLoading(false)
                setError('No such member found ')
                console.log('No such user found');
            }
            console.log(data);

        } catch (error) {
            console.log(error)
            setError('Some unexpected error occured ')
            setLoading(false)

        }
    }

    return (
        <div>
            <Modal size={'lg'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Verification</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <div className="mx-5 mt-5 font-roboto">
                            <div className='text-4xl font-bold mb-5'>
                                Carnatic Members
                            </div>

                            <input className=' w-full px-2 py-3 outline-none rounded-md ring-2 ring-gray-300 focus:ring-2 focus:outline-none focus:ring-[#fe1648]' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Type Your Password' />


                            <div className={`${!error ? "invisible" : ""}  text-red-700 px-1 py-3`}>
                                * {error}
                            </div>


                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <button disabled={!password} onClick={handleVerifyMember} className='bg-[#fe1648] hover:bg-[#D60036] text-xl mt-5 float-right flex items-center disabled:bg-gray-300 justify-center space-x-2 w-44 h-12 rounded-md text-white'>
                            {loading ?
                                <div className='animate-spin'>
                                    <BiLoaderAlt />
                                </div>
                                :
                                <>
                                    Continue
                                </>
                            }
                        </button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}
