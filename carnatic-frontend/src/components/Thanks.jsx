import React, { useContext } from 'react'
import bg from '../images/thanks.jpg'
import { useConst } from '@chakra-ui/react'
import MyContext from '../context/context'

export default function Thanks() {
    const { donationInfo } = useContext(MyContext)
    return (
        <div style={{ backgroundImage: `url(${bg})` }} className='h-[80vh] bg-center bg-cover '>

            <div className="z-10 mx-20 shadow-2xl rounded-lg relative mt-[20vh] w-[40%] text-white bg-[#fe1648] p-8 space-y-5">
                <h1 className='font-bold text-6xl '>Thank You</h1>
                <div className="text-xl leading-loose">
                    Dear <b>{donationInfo.name} </b>, Thank you for the generous donation of  <b>{donationInfo.amount} INR </b> to Carnatic Foundation. We are so grateful for your support.

                    We've sent an email to <b>{donationInfo.email}</b> regarding donation details
                </div>
            </div>

        </div>
    )
}
