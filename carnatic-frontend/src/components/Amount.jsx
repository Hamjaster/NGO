import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MyContext from '../context/context'
import axios from 'axios'
import { Spinner } from '@chakra-ui/react'

export default function Amount() {
    const [amount, setAmount] = useState(0)
    const navigate = useNavigate()
    const { donationInfo, setDonationInfo } = useContext(MyContext)
    const [loading, setLoading] = useState(false)

    const handleAmountSubmit = async () => {
        setLoading(true)
        try {
            const { data } = await axios.post('http://localhost:5000/mail', donationInfo)
            if (data.msg) {
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
        <div className='flex h-screen pt-44 bg-[#f4f9fa] space-y-8 sm:space-y-10 text-[#474848] md:space-y-20 flex-col items-center'>

            <div className=" text-4xl sm:text-5xl md:text-6xl font-semibold">
                Enter Amount
            </div>

            <div className='flex flex-col items-center w-10/12  sm:w-[25rem] md:w-[30rem] space-y-2 '>

                <div className="flex w-full flex-row items-center justify-between">

                    <div className="donateInput  w-2/3 relative rounded-xl text-2xl inline-block ">

                        <input value={amount} onChange={(e) => { setAmount(e.target.value) }} type="number" name="phone" class="block w-full border-[1px] border-black  py-3 px-2 rounded-lg appearance-none focus:outline-none focus:ring-0 peer" placeholder="Amount here" required />

                        <div className='absolute right-[1px] rounded-tr-lg rounded-br-lg top-1/2 py-3 px-2 bg-gray-200 -translate-y-1/2'> INR </div>

                    </div>

                    <div className="flex space-x-2 flex-row items-center">
                        <span onClick={() => setAmount((amount) => Number(amount) + 1)} className='px-[14px] sm:px-[22px] py-2 text-4xl hover:bg-[#D60036] bg-[#fe0248] text-white rounded-lg select-none cursor-pointer'>+</span>
                        <span onClick={() => amount !== 0 ? setAmount((amount) => Number(amount) - 1) : 0} className='px-[14px] sm:px-[22px] py-2 text-4xl hover:bg-[#D60036] bg-[#fe0248] text-white select-none rounded-lg cursor-pointer'>-</span>
                    </div>

                </div>

                <button onClick={handleAmountSubmit} className='bg-[#3dd0f9] hover:bg-[#35a9c6] text-xl px-9 py-3 rounded-md text-white w-full'>
                    {loading ?
                        <Spinner />
                        : "Donate"
                    }
                </button>
            </div>



        </div>
    )
}
