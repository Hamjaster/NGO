// Dashboard.jsx

import React from "react";
import { Link } from "react-router-dom";
import RouteWrapper from "./RouteWrapper";
import DashboardNavbar from "./DashboardNav";
import logo from "../assets/logo.jpeg";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col w-screen items-center h-screen">
        <nav class="bg-white border-b-2 text-center items-center mx-auto justify-center flex p-5 w-full">
          <Link to={"/"} className="  ">
            <img src={logo} className="w-24" />
          </Link>
        </nav>

        <h1 className="text-5xl my-14 font-roboto">Admin Panel</h1>
        <div className="flex flex-col text-white items-center w-full space-y-5 ">
          <Link
            to="/dashboard/membersDB"
            className="relative shadow-xl hover:shadow-2xl transition-all cursor-pointer rounded-full bg-[#4dd7fe] px-5  w-2/3 py-6 text-center text-2xl  option-btn"
          >
            Carnatic Members Database
          </Link>
          <Link
            to="/dashboard/guestsDB"
            className="relative shadow-xl hover:shadow-2xl transition-all cursor-pointer rounded-full bg-[#4dd7fe] px-5  w-2/3 py-6 text-center text-2xl  option-btn"
          >
            Guests Database
          </Link>
          <Link
            to="https://auth.easebuzz.in/easebuzz/login?next=easebuzz.in%2Fmerchant%2Fdashboard"
            className="relative shadow-xl hover:shadow-2xl transition-all cursor-pointer rounded-full bg-[#4dd7fe] px-5  w-2/3 py-6 text-center text-2xl  option-btn"
          >
            Easebuzz Dashboard
          </Link>
          <Link
            to="https://www.chatbase.co/auth/signin"
            className="relative shadow-xl hover:shadow-2xl transition-all cursor-pointer rounded-full bg-[#4dd7fe] px-5  w-2/3 py-6 text-center text-2xl  option-btn"
          >
            Chatbase Dashboard
          </Link>
          <Link
            to="/dashboard/projects"
            className="relative shadow-xl hover:shadow-2xl transition-all cursor-pointer rounded-full bg-[#4dd7fe] px-5  w-2/3 py-6 text-center text-2xl  option-btn"
          >
            Projects Dashboard
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
