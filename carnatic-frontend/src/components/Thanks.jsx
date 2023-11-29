import React, { useContext } from 'react'
import bg from '../images/thanks.jpg'
import { useConst } from '@chakra-ui/react'
import MyContext from '../context/context'
import withDonationInfo from './DonationWrapper'

function Thanks() {
    const { donationInfo } = useContext(MyContext)
    return (
        <div className='h-[80vh] font-dancing bg-center bg-cover '>

            <div className="z-10 mx-auto mt-36 leading-[6rem] shadow-2xl rounded-lg relative w-10/12 sm:w-8/12 p-8 space-y-8">


                <div className="text-lg sm:text-4xl leading-[6rem] font-thin text-center">
                    Dear <b className='font-semibold'>{donationInfo.name} </b>, Thank you for the generous donation of  <b className='font-semibold'>{donationInfo.amount} INR </b> to Carnatic Foundation. We are so grateful for your support.
                    We've sent an email to <b className='font-semibold'>{donationInfo.email}</b> regarding donation details
                </div>
                <div className='text-center text-3xl font-bold'> - Carnatic Foundation</div>
            </div>

        </div>
    )
}

// export default withDonationInfo(Thanks)
export default Thanks