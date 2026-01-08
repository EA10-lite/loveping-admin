import { useCallback, useEffect, useRef, useState, startTransition } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

/**
 * Top-level layout responsible for synchronising the sidebar and navbar.
 * - Keeps a single source of truth (`isSidebarOpen`) for small screens.
 * - On mobile: Sidebar is always visible but collapsed (icons only) by default, expands to full width when opened.
 * - On desktop: Sidebar is always visible at full width.
 * - Adds an overlay on mobile/tablet when sidebar is expanded to emphasise focus.
 */
const AppLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { pathname } = useLocation();
    const prevPathnameRef = useRef(pathname);

    const handleCloseSidebar = useCallback(() => {
        setIsSidebarOpen(false);
    }, []);

    // Close sidebar when route changes - use ref to track previous pathname
    useEffect(() => {
        if (prevPathnameRef.current !== pathname) {
            prevPathnameRef.current = pathname;
            // Use startTransition to mark this as a non-urgent update
            startTransition(() => {
                setIsSidebarOpen((prev) => prev ? false : prev);
            });
        }
    }, [pathname]);

    return (
        <div className="min-h-screen w-full bg-secondary lg:flex">
            {/* Overlay for mobile/tablet - only show when sidebar is expanded */}
            <div
                aria-hidden="true"
                className={`fixed inset-0 z-20 transition-opacity duration-300 ease-in-out lg:hidden ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={handleCloseSidebar}
            />

            {/* Sidebar container - collapsed (icons only) on mobile when closed, full width when open or on desktop */}
            <aside
                id="app-sidebar"
                aria-expanded={isSidebarOpen}
                className={`fixed left-0 top-0 z-30 h-screen transform transition-all duration-300 ease-in-out lg:static lg:translate-x-0 lg:transform-none lg:block ${isSidebarOpen ? "translate-x-0 w-80" : "translate-x-0 w-20 lg:w-80"}`}
            >
                <Sidebar />
            </aside>

            {/* Main content area - adjust margin on mobile to account for collapsed sidebar */}
            <main className={`relative flex-1 h-screen overflow-y-auto pb-8 transition-all duration-300 lg:ml-0 ${isSidebarOpen ? "ml-0" : "ml-20 lg:ml-0"}`}>
                <Navbar/>
                <div className="p-4">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AppLayout;