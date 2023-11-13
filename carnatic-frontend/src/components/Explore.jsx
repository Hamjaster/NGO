import { Spinner } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function Explore() {
    const [loading, setLoading] = useState(true)
    return (

        <>



            {loading && <div className='flex h-screen items-center justify-center text-7xl'>
                <Spinner size={'xl'} />
            </div>}

            <div className="chatbot absolute bottom-0 right-0 left-0 top-0 mx-10">
                <iframe
                    src="https://www.chatbase.co/chatbot-iframe/48unQZTvdjMee1Y75C08y"
                    width="100%"
                    onLoad={() => setLoading(false)}
                    style={{ height: '100%', minHeight: '100vh' }}
                    frameborder="0"
                ></iframe>
            </div>


        </>
    )
}
