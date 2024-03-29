import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <div>

            <footer class=" w-full border-t-[1px] py-5 ">
                <div class="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 items-center justify-between mx-auto max-w-screen-xl p-4 md:flex md:justify-between">

                    <span class="text-sm text-gray-500 sm:text-start text-center  :text-gray-400">© 2024 <a href="#" class="hover:underline">Carnatic Foundation</a>. All Rights Reserved.
                    </span>
                    <ul class="flex flex-col sm:flex-row  flex-wrap text-center items-center mt-3 text-sm font-medium text-gray-500  :text-gray-400 sm:mt-0">

                        <li className='w-'>
                            <Link to={'/privacy-policy'} href="#" class="mr-4 w-full hover:underline md:mr-6">Privacy Policy</Link>
                        </li>
                        <li className='w-'>
                            <Link to={'/terms-and-conditions'} href="#" class="mr-4 w-full hover:underline md:mr-6">Terms and Conditions</Link>
                        </li>

                        <li className='w-'>
                            <Link to={'/dashboard'} href="#" class="mr-4 w-full hover:underline md:mr-6">Admin</Link>
                        </li>

                    </ul>

                </div>
            </footer>

        </div>
    )
}
