"use client"; 

import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const hideSidebarRoutes = ["/signup", "/login",'/hiretalent'];
  
  return (
    <div className="flex">
      {!hideSidebarRoutes.includes(pathname) && <Sidebar />}
      <main className={`${hideSidebarRoutes.includes(pathname) ? "w-full" : "ml-64 w-full p-6"}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
