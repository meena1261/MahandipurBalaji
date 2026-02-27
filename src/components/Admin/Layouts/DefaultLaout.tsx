"use client";
import React, { useState, ReactNode, useEffect } from "react";
import Sidebar from "@/components/Admin/Sidebar";
import Header from "@/components/Admin/Header";
import { useRouter } from "next/navigation";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const router = useRouter();
  useEffect(() => {
    const token = typeof window !== "undefined" ? sessionStorage.getItem('token') : null;

    if (token) {
      // If token exists, check authentication and set login status
      setIsLoggedIn(true);
    } else {
      // If token is not found, redirect to signin page
      setIsLoggedIn(false);
      router.push("/admin/signin");
    }
  }, [router]);

  if (isLoggedIn === null) {
    // If still checking authentication, show loading or return null
    return <div>Loading...</div>;
  }
  return (
    <>
      {/* <!-- ===== Page Wrapper Star ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Star ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Star ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Star ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Star ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
