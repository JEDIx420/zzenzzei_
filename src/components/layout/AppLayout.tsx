
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AppLayout = () => {
  // Instead of just open/closed, we'll use three states: 
  // "expanded", "collapsed" (icons-only), and "closed" (mobile)
  const [sidebarState, setSidebarState] = useState("expanded");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setSidebarState("closed");
    } else {
      setSidebarState("expanded");
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    if (isMobile) {
      // On mobile: toggle between closed and expanded
      setSidebarState(sidebarState === "closed" ? "expanded" : "closed");
    } else {
      // On desktop: toggle between expanded and collapsed (icons only)
      setSidebarState(sidebarState === "expanded" ? "collapsed" : "expanded");
    }
  };

  const closeSidebarMobile = () => {
    if (isMobile) {
      setSidebarState("closed");
    }
  };

  const isSidebarOpen = sidebarState === "expanded" || sidebarState === "collapsed";
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar 
        toggleSidebar={toggleSidebar} 
        sidebarState={sidebarState}
        isMobile={isMobile}
      />
      <div className="flex flex-1">
        <Sidebar state={sidebarState} />
        <main 
          className={`flex-1 transition-all duration-300 ${
            sidebarState === "expanded" ? "md:ml-64" : 
            sidebarState === "collapsed" ? "md:ml-16" : ""
          }`}
        >
          <div className="container py-6 md:py-8">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Mobile overlay */}
      {sidebarState === "expanded" && isMobile && (
        <div 
          className="fixed inset-0 z-10 bg-black/50 md:hidden" 
          onClick={closeSidebarMobile}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default AppLayout;
