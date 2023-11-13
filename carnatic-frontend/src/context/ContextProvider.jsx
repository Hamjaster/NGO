// MyContextProvider.js
import React, { useState } from 'react';
import MyContext from './context';

const MyContextProvider = ({ children }) => {
    const [member, setMember] = useState('guest');
    const [project, setProject] = useState(null)
    const [userInfo, setUserInfo] = useState({})
    const [donationInfo, setDonationInfo] = useState(
        {}
    )

    return (
        <MyContext.Provider value={{ donationInfo, setDonationInfo, member, setMember, project, setProject, userInfo, setUserInfo }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContextProvider;
