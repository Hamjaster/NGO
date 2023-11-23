import React from 'react'
import bg from '../images/thanks.jpg'

export default function Thanks() {
    return (
        <div style={{ backgroundImage: `url(${bg})` }} className='h-[80vh] bg-center bg-cover '>

            <div className="z-10 mx-20 shadow-2xl rounded-lg relative mt-64 w-[40%] text-white bg-[#fe1648] p-8 space-y-5">
                <h1 className='font-bold text-6xl '>Thank You</h1>
                <div className="text-xl leading-loose">
                    Dear Hamza, Thank you for the generous donation of 500 INR to Carnatic Foundation. We are so grateful for your support.
                </div>
            </div>

        </div>
    )
}
