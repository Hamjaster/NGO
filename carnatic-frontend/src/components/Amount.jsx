import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MyContext from '../context/context'
import axios from 'axios'
import { CgSpinner } from 'react-icons/cg'
import withDonationInfo from './DonationWrapper'
import Navbar from './Navbar'
import Payment from './Payment'
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast'


function Amount() {
    const [amount, setAmount] = useState(null)
    const navigate = useNavigate()
    const { donationInfo, setDonationInfo, proxy, user, member } = useContext(MyContext)
    const [loading, setLoading] = useState(false)

    const handlePay = async () => {
        setLoading(true)
        try {
            const { data } = await axios.post(`${proxy}/pay`, {
                amount: `${parseFloat(amount).toFixed(2)}`,
                txnid: uuidv4(),
                productinfo: 'Carnatic Foundation dontaion',
                name: donationInfo.name.trim(),
                email: donationInfo.email.trim(),
                phone: `${donationInfo.phone}`,
                surl: `http://localhost:3000/response`,
                furl: `http://localhost:3000/response`,
                udf1: '',
                udf2: '',
                udf3: '',
                udf4: '',
                udf5: '',
                udf6: '',
                udf7: '',
                udf8: '',
                udf9: '',
                udf10: '',
                unique_id: '',
                split_payments: '',
                sub_merchant_id: '',
                customer_authentication_id: '',
            })
            setLoading(false)
            console.log(data)
            if (data.success) {
                renderIframe(data.access_key, data.key)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const renderIframe = (access_key, key) => {

        console.log('rendering iframe for ', access_key)
        const easebuzzCheckout = window.EasebuzzCheckout; // Access the function from the global scope

        if (easebuzzCheckout) {
            const instance = new easebuzzCheckout(key, 'prod');
            const options = {
                access_key, // access key received via Initiate Payment
                onResponse: async (response) => {
                    console.log(response);
                    if (response.status === "success") {
                        await handleAmountSubmit()
                    } else if (response.status === "failure") {
                        toast.error("Transaction Failed")
                    } else if (response.status === "userCancelled") {
                        toast.error("You've turned down the transaction.")
                    } else {
                        toast.error(response.status)
                    }
                },
                theme: "#123456" // color hex
            };
            instance.initiatePayment(options);
        }


    }

    const handleAmountSubmit = async () => {
        setLoading(true)
        const isDonated = await createTransaction()
        if (isDonated) {
            try {
                // let data = { success: true }

                // Sending mail about dontaion
                const { data } = await axios.post(`${proxy}/mail`, donationInfo)
                console.log(data)
                if (data.success) {
                    setLoading(false)
                    // If box is checked, send mail
                    if (member === "guest" && donationInfo.isContacted) {
                        await sendEmailIfChecked()
                    } else {
                        navigate('/thanks')
                    }
                } else {
                    setLoading(false)
                    console.log("Donation couldnt proceed");
                }

            } catch (error) {
                setLoading(false)
                console.log(error);
            }
        }
    }

    const createTransaction = async () => {
        try {
            const { data } = await axios.post(`${proxy}/donate`, {
                amount: parseFloat(amount),
                id: donationInfo.id,
                member: member
            })
            console.log(data)
            if (data.success) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const sendEmailIfChecked = async () => {
        setLoading(true)
        const { data } = await axios.post(`${proxy}/mail/checkedMail`, donationInfo)
        console.log(data)
        if (!data.success) {
            toast.error(data.data)
        } else {
            navigate('/thanks')
        }
    }

    useEffect(() => {
        setDonationInfo((donationInfo) => {
            return { ...donationInfo, "amount": Number(amount) }
        })
    }, [amount])

    useEffect(() => {
        console.log(donationInfo);
    }, [donationInfo])


    return (
        <div className='h-screen w-full'>
            <Navbar />

            <div className='flex  justify-center h-[84.5vh] pt-44 space-y-8 sm:space-y-10 text-[#474848] md:space-y-10 flex-col items-center'>

                <div className="text-3xl w-[20rem] sm:text-4xl md:text-4xl font-semibold">
                    <span>
                        Enter Amount
                    </span>
                </div>

                <div className='flex flex-col items-center w-10/12  sm:w-[25rem] md:w-[20rem] space-y-2 '>

                    <div className="flex w-full flex-row items-center justify-between">

                        <div className="donateInput  w-full relative rounded-xl text-xl inline-block ">

                            <input value={amount} onChange={(e) => { setAmount(e.target.value) }} type="number" name="phone" class="block w-full border-[1px] border-black  py-3 px-2 rounded-lg appearance-none focus:outline-none focus:ring-0 peer" placeholder="Enter amount here" required />

                            <div className='absolute right-[1px] rounded-tr-lg rounded-br-lg top-1/2 py-3 px-2 bg-gray-200 -translate-y-1/2'> INR </div>

                        </div>

                    </div>

                    <div className="w-full text-end">

                        <button id='ebz-checkout-btn' disabled={!amount}
                            onClick={handlePay}
                            // onClick={handleAmountSubmit}
                            className='bg-[#3dd0f9] hover:bg-[#35a9c6] w-44 text-lg h-12 rounded-md text-white'>
                            {loading ?
                                <div className='animate-spin w-min text-center mx-auto text-2xl'>
                                    <CgSpinner />
                                </div>

                                : <span className=''>
                                    Donate
                                </span>
                            }
                        </button>

                    </div>

                </div>



            </div>
        </div>
    )
}

export default withDonationInfo(Amount)
