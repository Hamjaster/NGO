import React from 'react'
import { Link } from 'react-router-dom'
import { LiaRupeeSignSolid } from 'react-icons/lia'
import { BiSearch } from 'react-icons/bi'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Home() {
    return (
        <div className='h-[110vh] sm:h-[100vh] overflow-hidden flex flex-col'>

            <Navbar />
            <div className="flex items-center justify-center h-full ">

                {/* <div className="text-4xl text-left mx-5 font-semibold">
                    We help businesses grow.
                </div> */}

                <div className="buttons mt-40 hidden sm:flex space-x-56 [&>*]:text-[7rem] [&>*]:lg:text-[12rem] [&>*]:text-white  [&>*]:p-12
              [&>*]:px-14 mx-4 ">

                    <Link to={'/dropdown'} className="flex rounded-3xl shadow-2xl flex-col bg-[#FE0248] hover:bg-[#D60036]">
                        <LiaRupeeSignSolid />

                    </Link>

                    <Link to={'/explore'} className="flex rounded-3xl shadow-2xl flex-col bg-[#4CD8FE] hover:bg-[#35a9c6]  ">
                        <BiSearch />

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
