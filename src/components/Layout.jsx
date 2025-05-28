"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const hideSidebarRoutes = ["/signup", "/login", "/hiretalent"];
  const shouldHideSidebar = hideSidebarRoutes.includes(pathname);

  return (
    <div className="flex">
      {!shouldHideSidebar && <Sidebar />}
      <main
        className={`w-full transition-all duration-300 ${
          !shouldHideSidebar ? "md:ml-64" : ""
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
