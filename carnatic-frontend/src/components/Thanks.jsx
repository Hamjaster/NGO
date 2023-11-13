import React from 'react'

export default function Thanks() {
    return (
        <div className='flex  flex-col space-y-6 items-center h-screen pt-56  font-bold'>
            <div className='text-4xl md:text-7xl'>
                Thanks for donating.
            </div>
            <div className='text-xl'>
                We've sent email regarding the donation details.
            </div>
        </div>
    )
}
