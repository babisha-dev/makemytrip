import { useState, useEffect } from 'react'
import { api } from '../../api/index.js'

const TRIP_TYPES = [
  { value: 'BUDGET', label: '💰 Budget', desc: 'Best value for money' },
  { value: 'COMFORT', label: '✨ Comfort', desc: 'Balanced experience' },
  { value: 'LUXURY', label: '👑 Luxury', desc: 'Premium everything' },
]

export default function TripForm({ onNext }) {
  const [cities, setCities] = useState([])
  const [form, setForm] = useState({
    origin: '', destination: '', travelDate: '', returnDate: '',
    travelers: 1, days: 3, budget: 20000, tripType: 'COMFORT'
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    api.getCities().then(setCities).catch(() => {})
  }, [])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e = {}
    if (!form.origin) e.origin = 'Select origin city'
    if (!form.destination) e.destination = 'Select destination city'
    if (form.origin === form.destination) e.destination = 'Origin and destination must be different'
    if (!form.travelDate) e.travelDate = 'Select travel date'
    if (!form.returnDate) e.returnDate = 'Select return date'
    if (form.travelDate && form.returnDate && form.returnDate <= form.travelDate)
      e.returnDate = 'Return date must be after travel date'
    if (form.budget < 5000) e.budget = 'Minimum budget is ₹5,000'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (validate()) onNext(form)
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="fade-in" style={{ maxWidth: 700, margin: '0 auto', padding: '0 20px 40px' }}>
      <div className="card" style={{ padding: 32 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>Plan your perfect trip</h2>
        <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 28 }}>Tell us where you want to go and we'll handle the rest</p>

        {/* Origin + Destination */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label>From (Origin)</label>
            <select value={form.origin} onChange={e => set('origin', e.target.value)}>
              <option value="">Select city</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.origin && <p style={{ color: '#e63946', fontSize: 12, marginTop: 4 }}>{errors.origin}</p>}
          </div>
          <div>
            <label>To (Destination)</label>
            <select value={form.destination} onChange={e => set('destination', e.target.value)}>
              <option value="">Select city</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.destination && <p style={{ color: '#e63946', fontSize: 12, marginTop: 4 }}>{errors.destination}</p>}
          </div>
        </div>

        {/* Dates */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label>Travel Date</label>
            <input type="date" min={today} value={form.travelDate} onChange={e => set('travelDate', e.target.value)} />
            {errors.travelDate && <p style={{ color: '#e63946', fontSize: 12, marginTop: 4 }}>{errors.travelDate}</p>}
          </div>
          <div>
            <label>Return Date</label>
            <input type="date" min={form.travelDate || today} value={form.returnDate} onChange={e => set('returnDate', e.target.value)} />
            {errors.returnDate && <p style={{ color: '#e63946', fontSize: 12, marginTop: 4 }}>{errors.returnDate}</p>}
          </div>
        </div>

        {/* Travelers + Days + Budget */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div>
            <label>Travelers</label>
            <select value={form.travelers} onChange={e => set('travelers', parseInt(e.target.value))}>
              {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Person{n > 1 ? 's' : ''}</option>)}
            </select>
          </div>
          <div>
            <label>Number of Days</label>
            <select value={form.days} onChange={e => set('days', parseInt(e.target.value))}>
              {[1,2,3,4,5,6,7,8,9,10,14].map(n => <option key={n} value={n}>{n} Day{n > 1 ? 's' : ''}</option>)}
            </select>
          </div>
          <div>
            <label>Total Budget (₹)</label>
            <input type="number" min={5000} step={1000} value={form.budget}
              onChange={e => set('budget', parseFloat(e.target.value))} placeholder="e.g. 25000" />
            {errors.budget && <p style={{ color: '#e63946', fontSize: 12, marginTop: 4 }}>{errors.budget}</p>}
          </div>
        </div>

        {/* Trip Type */}
        <div style={{ marginBottom: 28 }}>
          <label>Trip Preference</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 8 }}>
            {TRIP_TYPES.map(t => (
              <div key={t.value} onClick={() => set('tripType', t.value)}
                style={{ padding: '12px 16px', borderRadius: 10, border: `2px solid ${form.tripType === t.value ? '#e63946' : '#e5e7eb'}`,
                  background: form.tripType === t.value ? '#fef2f2' : 'white', cursor: 'pointer', transition: 'all 0.15s' }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: form.tripType === t.value ? '#e63946' : '#374151' }}>{t.label}</div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget slider */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ margin: 0 }}>Budget Slider</label>
            <span style={{ fontWeight: 700, color: '#e63946', fontSize: 16 }}>₹{Number(form.budget).toLocaleString('en-IN')}</span>
          </div>
          <input type="range" min={5000} max={500000} step={1000} value={form.budget}
            onChange={e => set('budget', parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#e63946' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9ca3af', marginTop: 4 }}>
            <span>₹5,000</span><span>₹2,50,000</span><span>₹5,00,000</span>
          </div>
        </div>

        <button className="btn-primary" style={{ width: '100%', fontSize: 16, padding: '14px' }} onClick={handleSubmit}>
          Search & Get AI Suggestions →
        </button>
      </div>
    </div>
  )
}
