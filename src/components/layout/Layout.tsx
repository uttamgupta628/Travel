import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
 
const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0b0b0c] p-2 sm:p-3">
      <div className="mx-auto max-w-[1600px] overflow-hidden rounded-3xl bg-white shadow-2xl">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;