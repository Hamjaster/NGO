import React from 'react'
import { Link } from 'react-router-dom'
import { LiaRupeeSignSolid } from 'react-icons/lia'
import { BiSearch } from 'react-icons/bi'
import Navbar from './Navbar'
import Footer from './Footer'
import explore from '../images/explore.png'
import donate from '../images/donate.jpg'
import logo from '../assets/logo.jpeg'

export default function Home() {
    return (
        <>

            <div className='h-[83vh] items-center overflow-hidden flex flex-col'>

                <Navbar />

                <div className="flex items-center justify-center h-full mt-28 ">

                    <div className="buttons items-center flex flex-col md:flex-row md:space-x-16 lg:space-x-56 space-y-12  md:space-y-0 [&>*]:text-[7rem] [&>*]:lg:text-[12rem] [&>*]:text-white mx-4 ">

                        <Link className=' relative shadow-xl hover:shadow-2xl transition-all cursor-pointer rounded-full bg-[#4dd7fe] flex-row  px-5' to={'/dropdown'}>
                            <img className='w-16 absolute top-1/2 left-4  -translate-y-1/2' src={donate} alt="" srcset="" />
                            <div className='pl-28 px-14 py-7 text-3xl font-sans font-semibold relative z-50'>Donate</div>
                        </Link>

                        <Link className=' relative shadow-xl hover:shadow-2xl transition-all cursor-pointer rounded-full bg-[#4dd7fe] flex-row px-5' to={'/explore'}>
                            <img className='w-16 absolute top-1/2 left-4  -translate-y-1/2 ' src={explore} alt="" srcset="" />
                            <div className='pl-28 px-14 py-7 text-3xl font-sans font-semibold relative z-50'>Explore</div>
                        </Link>

                    </div>

                </div>


            </div>
            <Footer />
        </>
    )
}
