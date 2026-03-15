import { useEffect, useState } from 'react'
import { api } from '../../api/index.js'

function HotelCard({ hotel, selected, onSelect, days }) {
  const total = hotel.pricePerNight * days
  const stars = '★'.repeat(Math.round(hotel.rating)) + '☆'.repeat(5 - Math.round(hotel.rating))
  const amenityList = hotel.amenities?.split(',') || []
  return (
    <div className={`card ${selected ? 'card-selected' : ''}`} onClick={() => onSelect(selected ? null : hotel)}
      style={{ padding: 18, cursor: 'pointer', transition: 'all 0.15s', marginBottom: 10 }}>
      <div style={{ display: 'flex', gap: 14 }}>
        <img src={hotel.imageUrl} alt={hotel.name}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200' }}
          style={{ width: 90, height: 70, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{hotel.name}</div>
              <div style={{ fontSize: 12, color: '#f59e0b' }}>{stars} <span style={{ color: '#9ca3af' }}>{hotel.rating}/5</span></div>
              <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>📍 {hotel.address}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700, fontSize: 18, color: '#e63946' }}>₹{total.toLocaleString('en-IN')}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>₹{hotel.pricePerNight.toLocaleString('en-IN')}/night · {days} nights</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
            {amenityList.slice(0, 5).map((a, i) => (
              <span key={i} style={{ background: '#f3f4f6', color: '#6b7280', padding: '2px 8px', borderRadius: 12, fontSize: 11 }}>{a.trim()}</span>
            ))}
          </div>
          {selected && <div style={{ marginTop: 8, fontSize: 12, color: '#22c55e', fontWeight: 600 }}>✓ Selected — click to deselect</div>}
        </div>
      </div>
    </div>
  )
}

function CabCard({ cab, selected, onSelect, days }) {
  const total = cab.pricePerDay * days
  return (
    <div className={`card ${selected ? 'card-selected' : ''}`} onClick={() => onSelect(selected ? null : cab)}
      style={{ padding: 18, cursor: 'pointer', transition: 'all 0.15s', marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ width: 44, height: 44, background: '#f0fdf4', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🚗</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{cab.provider} — {cab.cabType}</div>
            <div style={{ fontSize: 12, color: '#6b7280' }}>{cab.description}</div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>👥 {cab.capacity} seats · {cab.ac ? '❄ AC' : 'No AC'}</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#e63946' }}>₹{total.toLocaleString('en-IN')}</div>
          <div style={{ fontSize: 11, color: '#9ca3af' }}>₹{cab.pricePerDay.toLocaleString('en-IN')}/day · {days} days</div>
        </div>
      </div>
      {selected && <div style={{ marginTop: 8, textAlign: 'right', fontSize: 12, color: '#22c55e', fontWeight: 600 }}>✓ Selected — click to deselect</div>}
    </div>
  )
}

const BOOKING_TYPES = [
  { value: 'HOTEL', label: '🏨 Hotel Only', desc: 'Just accommodation' },
  { value: 'CAB',   label: '🚗 Cab Only',   desc: 'Just transportation' },
  { value: 'BOTH',  label: '🏨🚗 Hotel + Cab', desc: 'Accommodation & transport' },
]

export default function ChooseOptions({ searchData, onNext, onBack }) {
  const [hotels, setHotels] = useState([])
  const [cabs, setCabs] = useState([])
  const [bookingType, setBookingType] = useState(null)
  const [selectedHotel, setSelectedHotel] = useState(null)
  const [selectedCab, setSelectedCab] = useState(null)
  const [activeTab, setActiveTab] = useState('hotels')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.searchHotels(searchData.destination),
      api.searchCabs(searchData.destination)
    ]).then(([h, c]) => {
      setHotels(h)
      setCabs(c)
    }).catch(console.error).finally(() => setLoading(false))
  }, [])

  // Reset selections when booking type changes
  const handleTypeSelect = (type) => {
    setBookingType(type)
    setSelectedHotel(null)
    setSelectedCab(null)
    if (type === 'HOTEL') setActiveTab('hotels')
    if (type === 'CAB')   setActiveTab('cabs')
    if (type === 'BOTH')  setActiveTab('hotels')
  }

  const totalCost = () => {
    const hc = selectedHotel ? selectedHotel.pricePerNight * searchData.days : 0
    const cc = selectedCab   ? selectedCab.pricePerDay * searchData.days : 0
    return hc + cc
  }

  const canProceed = () => {
    if (!bookingType) return false
    if (bookingType === 'HOTEL') return !!selectedHotel
    if (bookingType === 'CAB')   return !!selectedCab
    if (bookingType === 'BOTH')  return !!selectedHotel && !!selectedCab
    return false
  }

  const handleNext = () => {
    if (!canProceed()) return
    const hc = selectedHotel ? selectedHotel.pricePerNight * searchData.days : 0
    const cc = selectedCab   ? selectedCab.pricePerDay   * searchData.days : 0
    onNext({
      bookingType,
      hotel: selectedHotel,
      cab: selectedCab,
      hotelCost: hc,
      cabCost: cc,
      totalCost: hc + cc
    })
  }

  const nextButtonLabel = () => {
    if (!bookingType) return 'Select what you need first'
    if (bookingType === 'HOTEL' && !selectedHotel) return 'Select a Hotel to Continue'
    if (bookingType === 'CAB'   && !selectedCab)   return 'Select a Cab to Continue'
    if (bookingType === 'BOTH'  && !selectedHotel) return 'Select a Hotel to Continue'
    if (bookingType === 'BOTH'  && !selectedCab)   return 'Select a Cab to Continue'
    return `Review Booking →`
  }

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ width: 48, height: 48, border: '3px solid #fde8ea', borderTopColor: '#e63946', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
      <p style={{ fontWeight: 600, color: '#374151' }}>Finding options in {searchData.destination}...</p>
    </div>
  )

  return (
    <div className="fade-in" style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px 40px' }}>

      {/* Step A — Choose what to book */}
      <div className="card" style={{ padding: 24, marginBottom: 16 }}>
        <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>What do you want to book?</h3>
        <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16 }}>Select one option — each creates a separate booking</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          {BOOKING_TYPES.map(t => (
            <div key={t.value} onClick={() => handleTypeSelect(t.value)}
              style={{
                padding: '16px 14px', borderRadius: 10, cursor: 'pointer', textAlign: 'center',
                border: `2px solid ${bookingType === t.value ? '#e63946' : '#e5e7eb'}`,
                background: bookingType === t.value ? '#fef2f2' : 'white',
                transition: 'all 0.15s'
              }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{t.label.split(' ')[0]}</div>
              <div style={{ fontWeight: 600, fontSize: 13, color: bookingType === t.value ? '#e63946' : '#374151' }}>
                {t.label.replace(t.label.split(' ')[0], '').trim()}
              </div>
              <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>{t.desc}</div>
              {bookingType === t.value && <div style={{ fontSize: 11, color: '#e63946', fontWeight: 600, marginTop: 6 }}>✓ Selected</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Step B — Show tabs based on type */}
      {bookingType && (
        <>
          {/* Budget bar */}
          <div className="card" style={{ padding: '12px 20px', marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: 14, color: '#6b7280' }}>
              Budget: <strong style={{ color: '#374151' }}>₹{Number(searchData.budget).toLocaleString('en-IN')}</strong>
            </span>
            <span style={{ fontSize: 14 }}>
              Selected: <strong style={{ color: totalCost() > searchData.budget ? '#e63946' : '#059669', fontSize: 16 }}>
                ₹{totalCost().toLocaleString('en-IN')}
              </strong>
            </span>
            <span style={{ fontSize: 12, color: '#9ca3af' }}>
              {[selectedHotel ? '✓ Hotel' : null, selectedCab ? '✓ Cab' : null].filter(Boolean).join(' · ') || 'Nothing selected yet'}
            </span>
          </div>

          {/* Tabs — show only relevant ones */}
          <div style={{ display: 'flex', marginBottom: 14, background: 'white', borderRadius: 10, border: '1px solid #f0f0f0', overflow: 'hidden' }}>
            {(bookingType === 'HOTEL' || bookingType === 'BOTH') && (
              <button onClick={() => setActiveTab('hotels')}
                style={{ flex: 1, padding: '13px 0', fontWeight: 600, fontSize: 15, border: 'none', cursor: 'pointer',
                  background: activeTab === 'hotels' ? '#e63946' : 'white',
                  color: activeTab === 'hotels' ? 'white' : '#6b7280', transition: 'all 0.15s' }}>
                🏨 Hotels {selectedHotel ? '✓' : ''}
              </button>
            )}
            {(bookingType === 'CAB' || bookingType === 'BOTH') && (
              <button onClick={() => setActiveTab('cabs')}
                style={{ flex: 1, padding: '13px 0', fontWeight: 600, fontSize: 15, border: 'none', cursor: 'pointer',
                  background: activeTab === 'cabs' ? '#e63946' : 'white',
                  color: activeTab === 'cabs' ? 'white' : '#6b7280', transition: 'all 0.15s' }}>
                🚗 Cabs {selectedCab ? '✓' : ''}
              </button>
            )}
          </div>

          {/* Hotel list */}
          {activeTab === 'hotels' && (
            <div>
              {hotels.length === 0
                ? <div className="card" style={{ padding: 24, textAlign: 'center', color: '#6b7280' }}>No hotels found in {searchData.destination}.</div>
                : hotels.map(h => <HotelCard key={h.id} hotel={h}
                    selected={selectedHotel?.id === h.id}
                    onSelect={setSelectedHotel}
                    days={searchData.days} />)
              }
            </div>
          )}

          {/* Cab list */}
          {activeTab === 'cabs' && (
            <div>
              {cabs.length === 0
                ? <div className="card" style={{ padding: 24, textAlign: 'center', color: '#6b7280' }}>No cabs found in {searchData.destination}.</div>
                : cabs.map(c => <CabCard key={c.id} cab={c}
                    selected={selectedCab?.id === c.id}
                    onSelect={setSelectedCab}
                    days={searchData.days} />)
              }
            </div>
          )}
        </>
      )}

      <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', marginTop: 20 }}>
        <button className="btn-outline" onClick={onBack}>← Back</button>
        <button className="btn-primary" onClick={handleNext} disabled={!canProceed()}>
          {nextButtonLabel()}
        </button>
      </div>
    </div>
  )
}
