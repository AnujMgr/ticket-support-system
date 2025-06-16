import './App.css'
import { createRoutes } from '@/routes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const router = createBrowserRouter(createRoutes());

  return (
    <>
      {<RouterProvider router={router} />}
      {/* <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
        </Route>
      </Routes> */}
    </>
  )
}

export default App
