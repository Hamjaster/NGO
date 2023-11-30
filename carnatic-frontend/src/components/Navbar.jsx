import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpeg'

export default function Navbar() {
    return (


        <nav class="bg-white  w-full">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-center border-b-2 mx-auto py-1">

                <Link to={'/'} className='  '>
                    <img src={logo} className='w-36' />
                </Link>

            </div>
        </nav>


    )
}
