import React, { useEffect } from 'react'

export default function Payment({ access_key }) {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/easebuzz-checkout.js';
        script.async = true;

        document.body.appendChild(script);

        script.onload = () => {
            const easebuzzCheckout = window.EasebuzzCheckout; // Access the function from the global scope

            if (easebuzzCheckout) {
                const instance = new easebuzzCheckout(key, 'prod');

                document.getElementById('ebz-checkout-btn').addEventListener('click', function (e) {
                    const options = {
                        access_key, // access key received via Initiate Payment
                        onResponse: (response) => {
                            console.log(response);
                        },
                        theme: "#123456" // color hex
                    };
                    instance.initiatePayment(options);
                });
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <div></div>
    )
}
