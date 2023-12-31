import React, { useContext } from 'react'
import bg from '../images/thanks.jpg'
import { useConst } from '@chakra-ui/react'
import MyContext from '../context/context'
import withDonationInfo from './DonationWrapper'
import Navbar from './Navbar'

function Thanks() {
    const { donationInfo } = useContext(MyContext)
    return (
        <div className='h-screen w-full '>
            <Navbar />

            <div className='h-[80vh] flex items-center justify-center font-curly bg-center bg-cover '>

                <div className="z-10 mx-auto mt-36 shadow-2xl rounded-lg relative w-10/12 sm:w-8/12 p-4 sm:p-8 space-y-8">


                    <div className="text-xl leading-snug sm:leading-[3rem] sm:text-4xl font-thin text-center">
                        Dear <b className='font-semibold'>{donationInfo.name} </b>, Thank you for the generous donation of  <b className='font-semibold'>INR {donationInfo.amount}</b> to Carnatic Foundation. We are so grateful for your support.
                        <br />
                        We have emailed you the receipt at <b className='font-semibold'>{donationInfo.email}</b> regarding your donation.
                    </div>
                    <div className='text-center text-xl sm:text-3xl font-bold'> - Carnatic Foundation</div>
                </div>

            </div>
        </div>
    )
}

// export default withDonationInfo(Thanks)
export default Thanks