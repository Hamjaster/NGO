import { useState } from 'react'
import { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const [pass, setPass] = useState()
    const [password, setPassword] = useState('');
    const [isWrong, setIsWrong] = useState(false)

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const go = () => {
        if (password === "carnatic123") {
            setIsWrong(true)
        } else {
            alert('wrong')
            setIsWrong(false)
        }
    }

    // let auth = { 'token': false }

    return (
        // pass && pass === "carnatic" ? <Outlet /> : <Navigate to="/" />
        <>
            {
                isWrong ?
                    <Outlet />
                    :
                    <>
                        <div className="flex items-center justify-center h-screen">
                            <div className="bg-white p-8 rounded shadow-md space-y-3">
                                <h2 className="text-2xl font-semibold mb-4">Enter Password</h2>
                                <input
                                    type="password"
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                {/* Add a button or additional logic here */}
                                <button className='bg-gray-600 text-white px-5 py-3 text-lg hover:bg-gray-900 rounded-lg' onClick={go}>Continue</button>
                            </div>
                        </div>
                    </>

            }
        </>
    )
}

export default PrivateRoutes