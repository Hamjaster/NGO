import React from 'react'

export default function Footer() {
    return (
        <div>

            <footer class=" w-full border-t-[1px] py-5 ">
                <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                    <span class="text-sm text-gray-500 sm:text-center  :text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Carnatic Foundation</a>. All Rights Reserved.
                    </span>
                    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500  :text-gray-400 sm:mt-0">

                        <li>
                            <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                        </li>

                    </ul>
                </div>
            </footer>

        </div>
    )
}
