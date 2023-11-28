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

export default function VerifyCarnaticMemberModal({ isOpen, onOpen, onClose }) {
    const { member, setDonationInfo, proxy } = useContext(MyContext)
    const navigate = useNavigate()
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)


    const handleVerifyMember = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`${proxy}/member/find/${password}`)
            if (data.name && data.PAN) {
                setLoading(false)
                console.log(data)
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

                            {/* <input className=' w-full px-2 py-3 outline-none rounded-md ring-2 ring-gray-300 focus:ring-2 focus:outline-none focus:ring-[#fe1648]' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your Registered mobile number' /> */}
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
                                    onChange={p => setPassword(p)}
                                />
                            </div>


                            <div className={`${!error ? "invisible" : ""}  text-red-700 px-1 py-3`}>
                                * {error}
                            </div>


                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <button disabled={!password} onClick={handleVerifyMember} className='bg-[#fe1648] hover:bg-[#D60036] text-xl mt-5 float-right flex items-center disabled:bg-gray-300 justify-center space-x-2 w-44 h-12 rounded-md text-white'>
                            {loading ?
                                <div className='animate-spin'>
                                    <CgSpinner />
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
