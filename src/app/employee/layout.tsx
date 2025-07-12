"use client";
import { useState } from "react";
import {
  IconDashboard,
  IconUsers,
  IconUserBolt,
  IconGitBranch,
  IconListDetails,
  IconMoneybag,
  IconMoneybagHeart,
  IconFileDescription,
  IconSettings,
  IconHelp,
  IconSearch
} from "@tabler/icons-react"; // Adjust import path as needed
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Define your sidebar data
  const [sidebarData, setSidebarData] = useState({
    user: {
      name: "Admin", // You can replace with actual user data
      email: "admin@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: IconDashboard,
      },
      {
        title: "Customers",
        url: "/admin/customers",
        icon: IconUsers,
      },
      {
        title: "Employees",
        url: "/admin/employees",
        icon: IconUserBolt,
      },
      {
        title: "Branches",
        url: "/admin/branches",
        icon: IconGitBranch,
      },
      {
        title: "Demand Types",
        url: "/admin/demand-types",
        icon: IconListDetails,
      },
      {
        title: "Payments",
        url: "/admin/payments",
        icon: IconMoneybag,
      },
      {
        title: "Payment Methods",
        url: "/admin/payment-methods",
        icon: IconMoneybagHeart,
      },
      {
        title: "Reports",
        url: "/admin/reports",
        icon: IconFileDescription,
      }
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "/admin/settings",
        icon: IconSettings,
      },
      {
        title: "Get Help",
        url: "/admin/help",
        icon: IconHelp,
      },
      {
        title: "Search",
        url: "/admin/search",
        icon: IconSearch,
      },
    ],
  });
  
  return (
    <div className="flex h-screen">
      <AppSidebar
        variant="inset" 
        data={sidebarData} 
      />
      
      {/* Main content area */}
      <div className="flex-1 overflow-auto p-6 bg-gray-50">
        {children}
      </div>
    </div>
  );
}