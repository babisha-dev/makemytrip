import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import HomePage from './pages/HomePage.jsx'
import ConfirmationPage from './pages/ConfirmationPage.jsx'
import MyBookingsPage from './pages/MyBookingsPage.jsx'

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking-confirmed/:reference" element={<ConfirmationPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
      </Routes>
    </div>
  )
}
