import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import Navbar from "./Navbar";
import AppSidebar from "./Sidebar";

/**
 * Top-level layout responsible for synchronising the sidebar and navbar.
 * Uses shadcn/ui SidebarProvider for state management.
 */
const AppLayout = () => {
    return (
        <SidebarProvider className="bg-secondary">
            <AppSidebar />
            <SidebarInset className="border-l border-primary/10 border-none">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b border-primary/10 px-4 bg-secondary">
                    <SidebarTrigger className="-ml-1" />
                    <div className="h-4 w-px bg-border mx-2" />
                    <Navbar />
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 bg-secondary text-white">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default AppLayout;