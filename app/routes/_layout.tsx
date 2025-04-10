import React from "react";
import { Link, Outlet } from "react-router";

const LayoutHeader = () => {
  return (
    <div>
      <nav className="bg-gradient-to-br from-purple-400 via-purple-500 to-purple-500 w-full fixed top-0 left-0 px-5">
        <div className="w-full max-w-screen-lg mx-auto flex justify-between content-center py-3 ">
          <Link className="text-white text-3xl font-bold" to="/">
            Quote Wall
          </Link>
          <div className="flex flex-col md:flex-row items-center justify-between gap-x-4 text-blue-50">
            <Link to="login">Login</Link>
            <Link to="signup">Register</Link>

            <Link to="dashboard">Dashboard</Link>

            <Link to="new-quote">Add A Quote</Link>
            <Link to="logout">Logout</Link>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default LayoutHeader;
