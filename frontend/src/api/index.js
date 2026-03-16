import axios from 'axios'

const BASE = `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api`

export const api = {
  // Cities
  getCities: () => axios.get(`${BASE}/cities`).then(r => r.data),

  // Search
  searchFlights: (origin, destination, maxPrice) =>
    axios.get(`${BASE}/flights/search`, { params: { origin, destination, maxPrice } }).then(r => r.data),

  searchHotels: (city, maxPrice) =>
    axios.get(`${BASE}/hotels/search`, { params: { city, maxPrice } }).then(r => r.data),

  searchCabs: (city, maxPrice) =>
    axios.get(`${BASE}/cabs/search`, { params: { city, maxPrice } }).then(r => r.data),

  // AI suggestion
  suggestTrip: (searchData) =>
    axios.post(`${BASE}/trips/suggest`, searchData).then(r => r.data),

  // Booking
  createBooking: (bookingData) =>
    axios.post(`${BASE}/bookings`, bookingData).then(r => r.data),

  getBooking: (reference) =>
    axios.get(`${BASE}/bookings/${reference}`).then(r => r.data),

  getUserBookings: (email) =>
    axios.get(`${BASE}/bookings/user/${email}`).then(r => r.data),

  // Health
  health: () => axios.get(`${BASE}/health`).then(r => r.data),
}