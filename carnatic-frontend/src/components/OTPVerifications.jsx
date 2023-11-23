import React, { useContext, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'
import OtpInput from 'react-otp-input';
import MyContext from '../context/context';

import { auth } from '../../firebase.config';
import { BiLoaderAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';


export default function OTPVerifications({ isOpen, onClose, onOpen }) {
    const [otp, setOtp] = useState();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const { donationInfo } = useContext(MyContext)
    const navigate = useNavigate()

    function onOTPVerify() {
        setLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then(async (res) => {
                console.log(res);
                console.log(res.user);
                setLoading(false);
                navigate('/amount')
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }

    return (
        <div>

            <Modal size={'lg'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Mobile Number Verification</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <div className="mx-5 mt-5 font-roboto space-y-5">
                            <div className='text-2xl text-gray-500 mb-5'>
                                Enter the code we've sent to <br />
                                <span className='font-bold text-red-500'>+91 3045208070</span>
                            </div>

                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                containerStyle={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: '40px',
                                    width: '100%'
                                }}
                                inputType="number"
                                // renderSeparator={<span className='text-4xl font-mono '>-</span>}
                                inputStyle={{
                                    width: '4rem',
                                    padding: '12px 0px',
                                    margin: "0 0px",
                                    fontSize: '27px',
                                    background: "white",
                                    outline: 'none',
                                    color: 'black',
                                    borderRadius: '4px',
                                    // boxShadow: '-1px 5px 10px 0px gainsboro'
                                    border: '1px solid red'
                                }}
                                className='opt-container'
                                renderInput={(props) => <input {...props} />}

                            />


                            <div className={`${!error ? "invisible" : ""}  text-red-700 px-1 py-3`}>
                                * {error}
                            </div>


                        </div>
                    </ModalBody>

                    <ModalFooter>

                        <button onClick={onOTPVerify} disabled={!otp} className='bg-[#fe1648] hover:bg-[#D60036] text-xl float-right flex items-center disabled:bg-gray-300 justify-center space-x-2 px-12 py-4 h-12 rounded-md text-white'>
                            {loading ?
                                <div className='animate-spin'>
                                    <BiLoaderAlt />
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

        </div >
    )
}
