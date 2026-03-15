import { useState } from 'react'
import { api } from '../../api/index.js'
import { useNavigate } from 'react-router-dom'

export default function ReviewBook({ searchData, selections, onBack }) {
  const nav = useNavigate()
  const [user, setUser] = useState({ name: '', email: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setUser(u => ({ ...u, [k]: v }))

  const validate = () => {
    const e = {}
    if (!user.name.trim()) e.name = 'Name is required'
    if (!user.email.trim() || !/\S+@\S+\.\S+/.test(user.email)) e.email = 'Valid email is required'
    if (!user.phone.trim() || !/^\d{10}$/.test(user.phone.replace(/\s/g, ''))) e.phone = 'Enter valid 10-digit phone'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleBook = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      const bookingReq = {
        userName: user.name,
        userEmail: user.email,
        userPhone: user.phone,
        origin: searchData.destination,
        destination: searchData.destination,
        travelDate: searchData.travelDate,
        returnDate: searchData.returnDate,
        travelers: searchData.travelers,
        days: searchData.days,
        totalBudget: searchData.budget,
        flightId: null,
        flightCost: 0,
        hotelId: selections.hotel ? selections.hotel.id : null,
        cabId: selections.cab ? selections.cab.id : null,
        hotelCost: selections.hotelCost || 0,
        cabCost: selections.cabCost || 0,
        totalCost: selections.totalCost
      }
      const booking = await api.createBooking(bookingReq)
      nav(`/booking-confirmed/${booking.bookingReference}`, { state: { booking } })
    } catch (err) {
      alert('Booking failed: ' + (err.response?.data?.error || err.message))
    } finally {
      setLoading(false)
    }
  }

  const { bookingType, hotel, cab, hotelCost, cabCost, totalCost } = selections

  const bookingTypeLabel = bookingType === 'HOTEL' ? '🏨 Hotel Only'
    : bookingType === 'CAB' ? '🚗 Cab Only'
    : '🏨🚗 Hotel + Cab'

  return (
    <div className="fade-in" style={{ maxWidth: 700, margin: '0 auto', padding: '0 20px 40px' }}>

      {/* Booking type badge */}
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <span style={{ background: '#fef2f2', color: '#e63946', padding: '6px 18px', borderRadius: 20, fontSize: 14, fontWeight: 600, border: '1px solid #fca5a5' }}>
          {bookingTypeLabel}
        </span>
      </div>

      {/* Trip Summary */}
      <div className="card" style={{ padding: 24, marginBottom: 16 }}>
        <h3 style={{ fontWeight: 700, fontSize: 16, color: '#e63946', marginBottom: 14 }}>📋 Trip Details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            ['Destination', searchData.destination],
            ['Travel Date', searchData.travelDate],
            ['Return Date', searchData.returnDate],
            ['Travelers', `${searchData.travelers} person(s)`],
            ['Duration', `${searchData.days} days`],
            ['Budget', `₹${Number(searchData.budget).toLocaleString('en-IN')}`],
          ].map(([k, v]) => (
            <div key={k} style={{ padding: '8px 0', borderBottom: '1px solid #f5f5f5', fontSize: 14 }}>
              <div style={{ color: '#9ca3af', fontSize: 12 }}>{k}</div>
              <div style={{ fontWeight: 600, marginTop: 2 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected items — only show what was booked */}
      <div className="card" style={{ padding: 24, marginBottom: 16 }}>
        <h3 style={{ fontWeight: 700, fontSize: 16, color: '#e63946', marginBottom: 14 }}>✅ Your Selection</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

          {hotel && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#f8f9fa', borderRadius: 10 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 22 }}>🏨</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{hotel.name}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{hotel.address} · {searchData.days} nights · ₹{hotel.pricePerNight.toLocaleString('en-IN')}/night</div>
                </div>
              </div>
              <span style={{ fontWeight: 700, color: '#e63946', fontSize: 16 }}>₹{hotelCost.toLocaleString('en-IN')}</span>
            </div>
          )}

          {cab && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#f8f9fa', borderRadius: 10 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 22 }}>🚗</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{cab.provider} — {cab.cabType}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{cab.description} · {searchData.days} days · ₹{cab.pricePerDay.toLocaleString('en-IN')}/day</div>
                </div>
              </div>
              <span style={{ fontWeight: 700, color: '#e63946', fontSize: 16 }}>₹{cabCost.toLocaleString('en-IN')}</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', background: '#fef2f2', borderRadius: 10 }}>
            <span style={{ fontWeight: 700, fontSize: 16 }}>Total Amount</span>
            <span style={{ fontWeight: 800, fontSize: 22, color: '#e63946' }}>₹{totalCost.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* User Details Form */}
      <div className="card" style={{ padding: 24, marginBottom: 16 }}>
        <h3 style={{ fontWeight: 700, fontSize: 16, color: '#e63946', marginBottom: 4 }}>👤 Your Details</h3>
        <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 20 }}>Confirmation email will be sent to your inbox</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label>Full Name *</label>
            <input type="text" placeholder="e.g. Rahul Sharma" value={user.name} onChange={e => set('name', e.target.value)} />
            {errors.name && <p style={{ color: '#e63946', fontSize: 12, marginTop: 4 }}>{errors.name}</p>}
          </div>
          <div>
            <label>Email Address *</label>
            <input type="email" placeholder="e.g. rahul@gmail.com" value={user.email} onChange={e => set('email', e.target.value)} />
            {errors.email && <p style={{ color: '#e63946', fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
          </div>
          <div>
            <label>Phone Number *</label>
            <input type="tel" placeholder="10-digit mobile number" value={user.phone} onChange={e => set('phone', e.target.value)} />
            {errors.phone && <p style={{ color: '#e63946', fontSize: 12, marginTop: 4 }}>{errors.phone}</p>}
          </div>
        </div>
      </div>

      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#166534' }}>
        📧 A confirmation email will be sent to you and the admin will be notified of your booking.
      </div>

      <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between' }}>
        <button className="btn-outline" onClick={onBack} disabled={loading}>← Back</button>
        <button className="btn-primary" onClick={handleBook} disabled={loading}
          style={{ minWidth: 230, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          {loading
            ? <><div className="spinner" />Confirming Booking...</>
            : `✓ Confirm & Book — ₹${totalCost.toLocaleString('en-IN')}`}
        </button>
      </div>
    </div>
  )
}
