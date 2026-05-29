import React from "react";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-[#09090b]">
      {/* Fixed Sidebar component mounted here */}
      <Sidebar />

      {/* 
        MAIN CONTENT: 
        - On desktop, we apply 'lg:pl-64' to perfectly offset the sidebar's width.
        - If you use a context variable to shrink padding on collapse, even better!
      */}
      <div className="flex-1 w-full min-h-screen p-4 md:p-8 lg:pl-72">
        {children}
      </div>
    </div>
  );
}
