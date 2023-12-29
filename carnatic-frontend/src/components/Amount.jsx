import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MyContext from '../context/context'
import axios from 'axios'
import { CgSpinner } from 'react-icons/cg'
import withDonationInfo from './DonationWrapper'
import Navbar from './Navbar'
import Payment from './Payment'


function Amount() {
    const [amount, setAmount] = useState(null)
    const navigate = useNavigate()
    const { donationInfo, setDonationInfo, proxy, user } = useContext(MyContext)
    const [loading, setLoading] = useState(false)

    const handlePay = async () => {
        setLoading(true)
        try {
            const { data } = await axios.post(`${proxy}/pay`, {
                amount: parseFloat(amount),
                txnid: 'AbCdEfG123_||-',
                productInfo: 'Carnatic Foundation dontaion',
                firstname: donationInfo.name,
                email: dontaionInfo.email,
                phone: donationInfo.phone,
                surl: `${proxy}/thanks`,
                furl: `${proxy}/failed`
            })
            setLoading(false)
            console.log(data)
            if (data.success) {
                return (
                    <Payment access_key={access_key} />
                )
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const handleAmountSubmit = async () => {
        setLoading(true)
        try {
            const { data } = await axios.post(`${proxy}/mail`, donationInfo)
            console.log(data)
            if (data.success) {
                setLoading(false)
                navigate('/thanks')
            } else {
                setLoading(false)
                console.log("Donation couldnt proceed");
            }

        } catch (error) {
            setLoading(false)
            console.log(error);
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

                        <button id='ebz-checkout-btn' disabled={!amount} onClick={handlePay} className='bg-[#3dd0f9] hover:bg-[#35a9c6] w-44 text-lg h-12 rounded-md text-white'>
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
