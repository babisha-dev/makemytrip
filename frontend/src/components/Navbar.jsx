import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const nav = useNavigate()
  return (
    <nav style={{ background: 'white', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div onClick={() => nav('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg,#e63946,#c1121f)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'white' }}>✈</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#e63946', lineHeight: 1 }}>MakeMyTrip</div>
            <div style={{ fontSize: 10, color: '#9ca3af', letterSpacing: 1 }}>AI TRAVEL BOOKING</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-outline" style={{ padding: '7px 18px', fontSize: 13 }} onClick={() => nav('/')}>Plan Trip</button>
          <button className="btn-outline" style={{ padding: '7px 18px', fontSize: 13 }} onClick={() => nav('/my-bookings')}>My Bookings</button>
        </div>
      </div>
    </nav>
  )
}
