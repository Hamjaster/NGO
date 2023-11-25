import React from 'react'
import { Link } from 'react-router-dom'
import { LiaRupeeSignSolid } from 'react-icons/lia'
import { BiSearch } from 'react-icons/bi'
import Navbar from './Navbar'
import Footer from './Footer'
import explore from '../images/explore.jpg'
import donate from '../images/donate.jpg'

export default function Home() {
    return (
        <div className='h-[85vh]  overflow-hidden flex flex-col'>



            <div className="flex items-center justify-center h-full ">

                <div className="buttons hidden sm:flex space-x-56 [&>*]:text-[7rem] [&>*]:lg:text-[12rem] [&>*]:text-white mx-4 ">
                    <Link to={'/dropdown'}>
                        <img className='w-64 shadow-xl hover:shadow-2xl transition-all cursor-pointer rounded-2xl' src={donate} alt="" srcset="" />
                    </Link>

                    <Link to={'/explore'}>
                        <img className='w-64 shadow-xl hover:shadow-2xl transition-all cursor-pointer rounded-2xl' src={explore} alt="" srcset="" />
                    </Link>

                </div>

                <div className="explorebtn-wrapper sm:hidden [&>*]:text-[7rem] [&>*]:lg:text-[12rem] [&>*]:text-white mx-4">
                    <Link to={'/explore'}>
                        <img className='w-52 shadow-xl hover:shadow-2xl transition-all cursor-pointer rounded-2xl' src={explore} alt="" srcset="" />
                    </Link>
                </div>

            </div>

            {/* Donate button in mobile */}
            <Link to={'/dropdown'} className="fixed sm:hidden bottom-0 py-6 uppercase text-2xl font-semibold text-white w-full text-center bg-[#48d2f9]">
                Donate today
            </Link>

            <Footer />

        </div>
    )
}
