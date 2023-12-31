import { Spinner } from '@chakra-ui/react/dist'
import React, { useState } from 'react'

export default function Explore() {
    const [loading, setLoading] = useState(true)
    return (

        <>
            {loading && <div className='flex h-screen mt-44 justify-center text-lg'>
                {/* <Spinner size={'xl'} /> */}
                Loading...
            </div>}

            <div className="chatbot absolute bottom-0 right-0 left-0 top-0 mx-10">

                <iframe
                    src="https://www.chatbase.co/chatbot-iframe/b4ASrGE61noWsSdH6yK63"
                    width="100%"
                    onLoad={() => setLoading(false)}
                    style={{ height: '100%', minHeight: '100vh' }}
                    frameborder="0"
                ></iframe>

            </div>


        </>
    )
}
