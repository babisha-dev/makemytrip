import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../api/index.js'

export default function ConfirmationPage() {
  const { reference } = useParams()
  const location = useLocation()
  const nav = useNavigate()
  const [booking, setBooking] = useState(location.state?.booking || null)
  const [loading, setLoading] = useState(!booking)

  useEffect(() => {
    if (!booking) {
      api.getBooking(reference).then(setBooking).catch(console.error).finally(() => setLoading(false))
    }
  }, [reference])

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div style={{ width: 48, height: 48, border: '3px solid #fde8ea', borderTopColor: '#e63946', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
      <p style={{ fontWeight: 600, color: '#374151' }}>Loading booking details...</p>
    </div>
  )

  if (!booking) return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <p style={{ fontSize: 48, marginBottom: 16 }}>😕</p>
      <p style={{ fontWeight: 600, fontSize: 18 }}>Booking not found</p>
      <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => nav('/')}>Go Home</button>
    </div>
  )

  return (
    <div className="fade-in" style={{ maxWidth: 680, margin: '40px auto', padding: '0 20px 60px' }}>

      {/* Success header */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ width: 72, height: 72, background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 16px', border: '3px solid #22c55e' }}>✓</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a1a', marginBottom: 6 }}>Booking Confirmed!</h1>
        <p style={{ color: '#6b7280', fontSize: 15 }}>Your trip to <strong>{booking.destination}</strong> is all set. Confirmation sent to <strong>{booking.userEmail}</strong></p>
      </div>

      {/* Booking reference */}
      <div style={{ background: '#fef2f2', border: '2px dashed #e63946', borderRadius: 12, padding: '20px', textAlign: 'center', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>Booking Reference</p>
        <p style={{ fontSize: 28, fontWeight: 800, color: '#e63946', letterSpacing: 2 }}>{booking.bookingReference}</p>
        <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>Save this for check-in and future reference</p>
      </div>

      {/* Trip details */}
      <div className="card" style={{ padding: 24, marginBottom: 16 }}>
        <h3 style={{ fontWeight: 700, fontSize: 15, color: '#e63946', marginBottom: 14 }}>✈ Trip Details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            ['Traveler', booking.userName],
            ['Email', booking.userEmail],
            ['Phone', booking.userPhone],
            ['From → To', `${booking.origin} → ${booking.destination}`],
            ['Travel Date', booking.travelDate],
            ['Return Date', booking.returnDate],
            ['Travelers', `${booking.travelers} person(s)`],
            ['Duration', `${booking.days} days`],
          ].map(([k, v]) => (
            <div key={k} style={{ padding: '8px 0', borderBottom: '1px solid #f5f5f5', fontSize: 14 }}>
              <div style={{ color: '#9ca3af', fontSize: 12 }}>{k}</div>
              <div style={{ fontWeight: 600, marginTop: 2 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* What's included */}
      <div className="card" style={{ padding: 24, marginBottom: 16 }}>
        <h3 style={{ fontWeight: 700, fontSize: 15, color: '#e63946', marginBottom: 14 }}>🎒 What's Included</h3>
        {[
          ['✈', 'Flight', booking.flightDetails, booking.flightCost],
          ['🏨', 'Hotel', booking.hotelDetails, booking.hotelCost],
          ['🚗', 'Cab', booking.cabDetails, booking.cabCost],
        ].map(([icon, label, detail, cost]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#f8f9fa', borderRadius: 10, marginBottom: 8 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ fontSize: 18 }}>{icon}</span>
              <div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>{label}</div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{detail || '—'}</div>
              </div>
            </div>
            <span style={{ fontWeight: 700, color: '#e63946' }}>₹{Number(cost).toLocaleString('en-IN')}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', background: '#fef2f2', borderRadius: 10, marginTop: 4 }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>Total Paid</span>
          <span style={{ fontWeight: 800, fontSize: 20, color: '#e63946' }}>₹{Number(booking.totalCost).toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Email notice */}
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '14px 18px', marginBottom: 24, fontSize: 14, color: '#166534', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <span style={{ fontSize: 18 }}>📧</span>
        <p>A detailed confirmation email with your complete itinerary has been sent to <strong>{booking.userEmail}</strong>. Check your spam folder if you don't see it.</p>
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button className="btn-outline" onClick={() => nav('/my-bookings')}>View All Bookings</button>
        <button className="btn-primary" onClick={() => nav('/')}>Plan Another Trip</button>
      </div>
    </div>
  )
}
