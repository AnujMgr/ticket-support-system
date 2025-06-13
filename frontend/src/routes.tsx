import DashboardLayout from "./components/layouts/dashboard.layout";
import DashboardPage from "./pages/dashboard/dashboard.page";
import LoginPage from "./pages/login/login.page";
import CreateTicket from "./pages/tickets/create-ticket.page";
import TicketsPage from "./pages/tickets/tickets.page";

export function createRoutes() {
  return [
    {
      path: "/",
      index: true,
      element: <LoginPage />
    },
    {
      path: "/",
      element: <DashboardLayout />,
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
              element: <TicketsPage />,
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