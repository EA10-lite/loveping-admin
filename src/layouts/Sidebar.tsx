import {
  Activity,
  Bell,
  CircleQuestionMark,
  Handshake,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageCircleMore,
  Sparkles,
  SquarePen,
  TriangleAlert,
  Users
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar"

import { Link, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { useAdminStore } from "../store/adminStore";


// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Activites",
    url: "/activities",
    icon: Activity,
  },
  {
    title: "Nudges",
    url: "/nudges",
    icon: Sparkles,
  },
  {
    title: "Notes",
    url: "/notes",
    icon: SquarePen,
  },
  {
    title: "Feedbacks",
    url: "/feedback",
    icon: MessageCircleMore,
  },
  {
    title: "Issues",
    url: "/issues",
    icon: TriangleAlert,
  },
  {
    title: "Partners",
    url: "/partners",
    icon: Handshake,
  },
  {
    title: "FAQs",
    url: "/faqs",
    icon: CircleQuestionMark,
  },
  {
    title: "Emails",
    url: "/emails",
    icon: Mail,
  },
]

const AppSidebar = () => {
  const { pathname } = useLocation();
  const { logout } = useAdminStore();

  return (
    <Sidebar className="border-primary/10 m-0 border-r-[0.5px]">
      <SidebarContent className="bg-secondary">
        <SidebarGroupLabel className="py-10 px-12">
          <img
            src="/images/Logo.svg"
            loading="lazy"
          />
        </SidebarGroupLabel>
        <SidebarGroupContent className="px-4 flex-1">
          <SidebarMenu className="space-y-1">
            {items.map((item) => (
              <SidebarMenuItem
                key={item.title}
              >
                <SidebarMenuButton
                  asChild
                  className={
                    cn(
                      "text-white py-6 px-8 rounded-xs hover:bg-transparent hover:text-primary active:bg-transparent",
                      pathname === item.url && "text-primary bg-secondary-foreground border-[0.5px] border-primary/10 active:bg-secondary-foreground"
                    )
                  }
                >
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>

        <SidebarFooter className="px-4">
          <SidebarMenuButton
            className="px-8 text-white hover:bg-transparent hover:text-primary active:bg-transparent"
            onClick={logout}
          >
            <LogOut />
            <span className="text-white">Logout</span>
          </SidebarMenuButton>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}


export default AppSidebar;
