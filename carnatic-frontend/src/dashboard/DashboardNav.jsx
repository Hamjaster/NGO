import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";

export default function DashboardNavbar() {
  return (
    <nav class="bg-white mb-5 top-0 w-full">
      <div class=" flex flex-wrap items-center space-x-20 px-10 border-b-2 py-4">
        <Link to={"/"} className="  ">
          <img src={logo} className="w-20" />
        </Link>

       <div className="flex flex-wrap justify-around gap-x-8">
       <Link className="md:text-xl" to={"/dashboard/membersDB"}>
          Carnatic Members
        </Link>

        <Link className="md:text-xl" to={"/dashboard/guestsDB"}>
          Guests
        </Link>

        <Link className="md:text-xl" to={"/dashboard/donations"}>
          Donations
        </Link>
        <Link className="md:text-xl" to={"/dashboard/projects"}>
          Projects
        </Link>

        <Link
          className="md:text-xl"
          to={
            "https://auth.easebuzz.in/easebuzz/login?next=easebuzz.in%2Fmerchant%2Fdashboard"
          }
        >
          Easebuzz
        </Link>

        <Link className="md:text-xl" to={"https://www.chatbase.co/auth/signin"}>
          Chatbase
        </Link>
       </div>
      </div>
    </nav>
  );
}
