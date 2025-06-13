import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/login/login.page'
import DashboardPage from './pages/dashboard/dashboard.page'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </>
  )
}

export default App
