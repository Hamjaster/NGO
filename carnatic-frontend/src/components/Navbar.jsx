import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpeg'

export default function Navbar() {
    return (


        <nav class="bg-white  fixed w-full">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-center border-b-2 mx-auto py-1">

                <strong className=''>
                    <img src={logo} className='w-32' />
                </strong>

                {/* <div class="hidden w-full md:block md:w-auto" id="navbar-default">

                    <ul class="font-medium mx-14 flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">


                        <li>
                            <Link to="/" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</Link>
                        </li>

                    </ul>

                </div> */}

            </div>
        </nav>


    )
}
