import React, { useContext, useEffect } from 'react';
import { redirect, useNavigate } from "react-router-dom";
import MyContext from '../context/context';


const withDonationInfo = (WrappedComponent) => {
    return (props) => {
        const navigate = useNavigate();
        const { donationInfo } = useContext(MyContext);

        useEffect(() => {
            // Check if donationInfo contains required information
            const isDonationInfoValid = !!(
                donationInfo &&
                donationInfo.name &&
                donationInfo.email &&
                donationInfo.PAN &&
                donationInfo.phone
            );

            // Redirect to '/donate' page if donationInfo is incomplete or missing
            if (!isDonationInfoValid) {
                navigate("/donate");
            }
        }, [])

        // Render the wrapped component if donationInfo is complete
        return <WrappedComponent {...props} />;
    };
};

export default withDonationInfo;
