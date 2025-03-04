"use client"; // Required for client-side hooks

import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const hideSidebarRoutes = ["/signUp", "/login"];

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
