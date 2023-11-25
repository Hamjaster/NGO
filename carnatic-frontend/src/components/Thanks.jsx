import React, { useContext } from 'react'
import bg from '../images/thanks.jpg'
import { useConst } from '@chakra-ui/react'
import MyContext from '../context/context'
import withDonationInfo from './DonationWrapper'

function Thanks() {
    const { donationInfo } = useContext(MyContext)
    return (
        <div style={{ backgroundImage: `url(${bg})` }} className='h-[80vh] bg-center bg-cover '>

            <div className="z-10 mx-auto md:mx-20 shadow-2xl rounded-lg relative mt-[5vh] md:mt-[10vh] w-10/12 md:w-[40%] text-white bg-[#fe1648] p-8 space-y-5">
                <h1 className='font-bold text-4xl md:text-5xl lg:text-6xl w-full '>Thank You</h1>
                <div className="text-lg sm:text-xl font-thin leading-loose">
                    Dear <b className='font-semibold'>{donationInfo.name} </b>, Thank you for the generous donation of  <b className='font-semibold'>{donationInfo.amount} INR </b> to Carnatic Foundation. We are so grateful for your support.

                    We've sent an email to <b className='font-semibold'>{donationInfo.email}</b> regarding donation details
                </div>
            </div>

        </div>
    )
}

export default withDonationInfo(Thanks)