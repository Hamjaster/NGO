import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpeg'

export default function DashboardNavbar() {
    return (


        <nav class="bg-white mb-5 top-0 w-full">
            <div class=" flex flex-row items-center space-x-20 px-10 border-b-2 py-4">

                <Link to={'/'} className='  '>
                    <img src={logo} className='w-20' />
                </Link>

                <Link className="text-xl" to={'/dashboard/membersDB'} >
                    Carnatic Members
                </Link>

                <Link className="text-xl" to={'/dashboard/guestsDB'} >
                    Guests
                </Link>




            </div>
        </nav>


    )
}