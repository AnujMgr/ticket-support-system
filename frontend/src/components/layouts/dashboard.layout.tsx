import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

import { Toaster } from "@/components/ui/sonner"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { selectCurrentTheme } from "@/redux/features/site/siteSlice"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout() {
  const theme = useSelector(selectCurrentTheme);
  return (
    <SidebarProvider style={{ "--sidebar-width": "calc(var(--spacing) * 72)", "--header-height": "calc(var(--spacing) * 12)" } as React.CSSProperties}>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 p-4 md:gap-6 md:px-6 md:py-6">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
      <Toaster theme={theme} />
    </SidebarProvider>
  )
}
