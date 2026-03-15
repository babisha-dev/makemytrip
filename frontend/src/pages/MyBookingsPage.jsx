import { useState } from 'react'
import { api } from '../api/index.js'
import { useNavigate } from 'react-router-dom'

export default function MyBookingsPage() {
  const [email, setEmail] = useState('')
  const [bookings, setBookings] = useState([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  const handleSearch = async () => {
    if (!email.trim()) return
    setLoading(true)
    try {
      const data = await api.getUserBookings(email.trim())
      setBookings(data)
      setSearched(true)
    } catch { setBookings([]); setSearched(true) }
    finally { setLoading(false) }
  }

  return (
    <div style={{ maxWidth: 720, margin: '40px auto', padding: '0 20px 60px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>My Bookings</h1>
      <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 28 }}>Enter your email to view all your bookings</p>

      <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
        <input type="email" placeholder="Enter your email address" value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          style={{ flex: 1 }} />
        <button className="btn-primary" onClick={handleSearch} disabled={loading}
          style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8 }}>
          {loading ? <><div className="spinner" />Searching...</> : 'Search Bookings'}
        </button>
      </div>

      {searched && bookings.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 20px', color: '#9ca3af' }}>
          <p style={{ fontSize: 48, marginBottom: 12 }}>📭</p>
          <p style={{ fontSize: 16, fontWeight: 600, color: '#374151' }}>No bookings found</p>
          <p style={{ fontSize: 14, marginTop: 4 }}>No bookings found for {email}</p>
          <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => nav('/')}>Plan a Trip</button>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {bookings.map(b => (
          <div key={b.id} className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{b.origin} → {b.destination}</div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{b.travelDate} · {b.days} days · {b.travelers} traveler(s)</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ background: '#f0fdf4', color: '#166534', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                  ✓ {b.status}
                </span>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#e63946', marginTop: 4 }}>₹{Number(b.totalCost).toLocaleString('en-IN')}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
              {b.flightDetails && <span style={{ background: '#f3f4f6', padding: '4px 10px', borderRadius: 8, fontSize: 12, color: '#374151' }}>✈ {b.flightDetails}</span>}
              {b.hotelDetails  && <span style={{ background: '#f3f4f6', padding: '4px 10px', borderRadius: 8, fontSize: 12, color: '#374151' }}>🏨 {b.hotelDetails}</span>}
              {b.cabDetails    && <span style={{ background: '#f3f4f6', padding: '4px 10px', borderRadius: 8, fontSize: 12, color: '#374151' }}>🚗 {b.cabDetails}</span>}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: '#9ca3af', fontFamily: 'monospace' }}>Ref: {b.bookingReference}</span>
              <button className="btn-outline" style={{ padding: '6px 16px', fontSize: 12 }}
                onClick={() => nav(`/booking-confirmed/${b.bookingReference}`)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
