// Dashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="flex flex-col w-screen items-center justify-center h-screen">
            <h1 className="text-5xl mb-14 font-roboto">Admin Panel</h1>
            <div className="flex flex-col items-center w-full ">
                <Link to="/dashboard/membersDB" className="w-2/3 py-6 text-center text-2xl border-b-2 border-l-2 border-r-2 border-t-2 border-[#99acff] option-btn">
                    Carnatic Members Database
                </Link>
                <Link to="/dashboard/guestsDB" className="w-2/3 py-6 text-center text-2xl border-b-2 border-l-2 border-r-2 border-[#99acff] option-btn">
                    Guests Database
                </Link>
                <Link to="https://auth.easebuzz.in/easebuzz/login?next=easebuzz.in%2Fmerchant%2Fdashboard" className="w-2/3 py-6 text-center text-2xl border-b-2 border-l-2 border-r-2 border-[#99acff] option-btn">
                    Easebuzz Dashboard
                </Link>
                <Link to="https://www.chatbase.co/auth/signin" className="w-2/3 py-6 text-center text-2xl border-b-2 border-l-2 border-r-2 border-[#99acff] option-btn">
                    Chatbase Dashboard
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
