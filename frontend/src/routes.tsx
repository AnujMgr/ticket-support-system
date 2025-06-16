import HomePage from "@/pages/home/page";
import LoginPage from "@/pages/login/login.page";
import TicketsPage from "@/pages/tickets/tickets.page";
import GuestRoute from "@/components/common/GuestRoute";
import DashboardPage from "@/pages/dashboard/dashboard.page";
import CreateTicket from "@/pages/tickets/create-ticket.page";
import TicketDetailPage from "@/pages/tickets/ticket-detail.page";
import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import DashboardLayout from "@/components/layouts/dashboard.layout";

export function createRoutes() {
  return [
    {
      path: "/",
      index: true,
      element: <HomePage />
    },
    {
      path: "/login",
      index: true,
      element: <GuestRoute>
        <LoginPage />
      </GuestRoute>
    },
    {
      path: "/",
      element: <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>,
      children: [
        {
          index: true,
          path: "dashboard",
          element: <DashboardPage />,
        },
        {
          path: "tickets",
          children: [
            {
              index: true,
              element: <TicketsPage />,
            },
            {
              path: ":id",
              element: <TicketDetailPage />,
            },
            {
              path: "create",
              element: <CreateTicket />,
            },
          ]
        },
      ],
    }
  ]
}