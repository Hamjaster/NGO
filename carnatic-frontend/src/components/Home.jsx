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
        <div className='h-[85vh] items-center overflow-hidden flex flex-col'>



            <div className="flex items-center justify-center h-full ">

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

            <Footer />

            {/* <div className="invoice border-2 border-black px-3 w-[30rem] text-sm flex flex-col">

                <div className="top border-b-2 border-black flex flex-row justify-between items-center">
                    <img className='w-28' src={logo} alt="" srcset="" />
                    <div className="flex py-4 mx-12 space-y-1 flex-col items-center justify-center">
                        <span className='font-semibold'>CARNATIC FOUNDATION</span>
                        <span className='text-sm text-center'>No:2, DEJU PLAZA, SOUTH AVENUE , SRINAGAR COLONY,
                            SAIDAPET, CHENNAI - 600029
                        </span>
                    </div>
                </div>

                <div className="second py-4 border-b-2 border-black flex justify-between">
                    <div>No. </div>
                    <div className='font-bold'>DONATION RECIEPT</div>
                    <div>Date.</div>
                </div>

                <div className=" py-2 border-b-2 border-black ">

                    <div className='text-center'>Donations are exempted Under 80-G of the Income Tax Act 1961</div>

                </div>

                <div className="grid grid-cols-2 gap-2 py-3 border-b-2 border-black">
                    <div>
                        Form 12 A No  :  AABTC8873EF2021101
                    </div>
                    <div>
                        REG NO : 56/2016
                    </div>
                    <div>
                        80 G NUMBER :  AABTC8873EF20211
                    </div>
                    <div>
                        PAN NO : AABTC8873E
                    </div>
                </div>

                <div className="flex flex-col justify-between space-y-4 py-3 border-b-2 border-black">
                    <div>Received with thanks from $Name</div>
                    <div>Sum of Rupees : $amount</div>
                    <div>Donation towards : $Project name</div>
                    <div>Address : $Address of donor</div>
                </div>

                <div className="flex flex-col justify-between space-y-4 py-3 border-b-2 border-black">
                    <div>Contact : $mob_no of donor</div>
                    <div>PAN : $PAN number of donor</div>
                    <div>Email : $donor email</div>
                </div>

                <div className='border-b-2 border-black py-4'>
                    Thank You - Received INR. $Amount For CARNATIC FOUNDATION
                </div>

                <div className="flex flex-col items-center py-4 space-y-2">
                    <div className='font-mono text-sm'>This is a computer-generated receipt and no signature required</div>
                    <div className="flex items-center space-x-8 justify-between">
                        <div>For Queries -  Email : trustee@carnaticfoundation.in</div>
                        <div>Phone : 9884232121</div>
                    </div>
                </div>

            </div> */}


        </div>
    )
}
