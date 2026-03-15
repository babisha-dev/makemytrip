import { useEffect, useState } from 'react'
import { api } from '../../api/index.js'

export default function AISuggestion({ searchData, onNext, onBack }) {
  const [suggestion, setSuggestion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    api.suggestTrip(searchData)
      .then(data => {
        try {
          const parsed = typeof data.suggestion === 'string'
            ? JSON.parse(data.suggestion) : data.suggestion
          setSuggestion(parsed)
        } catch {
          setError('Could not parse AI suggestion. Continuing with search results.')
        }
      })
      .catch(() => setError('AI suggestion unavailable. Continuing with search results.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div style={{ width: 56, height: 56, border: '3px solid #fde8ea', borderTopColor: '#e63946', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }} />
      <p style={{ fontSize: 18, fontWeight: 600, color: '#374151' }}>Gemini AI is planning your trip...</p>
      <p style={{ color: '#9ca3af', fontSize: 14, marginTop: 8 }}>Crafting a personalised itinerary for {searchData.destination}</p>
    </div>
  )

  return (
    <div className="fade-in" style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px 40px' }}>
      {error ? (
        <div style={{ background: '#fef9c3', border: '1px solid #fde047', borderRadius: 10, padding: 16, marginBottom: 20, fontSize: 14, color: '#854d0e' }}>
          ⚠ {error}
        </div>
      ) : suggestion && (
        <>
          {/* Header */}
          <div className="card" style={{ padding: 28, marginBottom: 16, background: 'linear-gradient(135deg,#fef2f2,#fff5f5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#e63946', marginBottom: 8 }}>
                  ✈ Your AI-Planned Trip to {searchData.destination}
                </h2>
                <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6, maxWidth: 520 }}>{suggestion.tripSummary}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>Total Budget</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#e63946' }}>₹{Number(searchData.budget).toLocaleString('en-IN')}</div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>{searchData.days} days · {searchData.travelers} traveler(s)</div>
              </div>
            </div>

            {/* Highlights */}
            {suggestion.highlights && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
                {suggestion.highlights.map((h, i) => (
                  <span key={i} style={{ background: '#fde8ea', color: '#c1121f', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500 }}>
                    ★ {h}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Budget Breakdown */}
          {suggestion.budgetBreakdown && (
            <div className="card" style={{ padding: 24, marginBottom: 16 }}>
              <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>💰 Estimated Budget Breakdown</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 12 }}>
                {Object.entries(suggestion.budgetBreakdown).map(([key, val]) => (
                  <div key={key} style={{ background: '#f8f9fa', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#e63946' }}>₹{Number(val).toLocaleString('en-IN')}</div>
                    <div style={{ fontSize: 12, color: '#6b7280', textTransform: 'capitalize', marginTop: 2 }}>{key}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Itinerary */}
          {suggestion.itinerary && (
            <div className="card" style={{ padding: 24, marginBottom: 16 }}>
              <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>🗓 Day-by-Day Itinerary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {suggestion.itinerary.map((day, i) => (
                  <div key={i} style={{ border: '1px solid #f0f0f0', borderRadius: 10, padding: 16, borderLeft: '4px solid #e63946' }}>
                    <div style={{ fontWeight: 700, color: '#e63946', marginBottom: 8 }}>Day {day.day}: {day.title}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {day.activities?.map((a, j) => (
                        <div key={j} style={{ fontSize: 13, color: '#374151', display: 'flex', gap: 8 }}>
                          <span style={{ color: '#e63946' }}>•</span>{a}
                        </div>
                      ))}
                    </div>
                    {day.meals && <p style={{ fontSize: 12, color: '#6b7280', marginTop: 8 }}>🍽 {day.meals}</p>}
                    {day.tips && <p style={{ fontSize: 12, color: '#059669', marginTop: 4, background: '#f0fdf4', padding: '4px 8px', borderRadius: 6 }}>💡 {day.tips}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Local food + Packing */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            {suggestion.localFood && (
              <div className="card" style={{ padding: 20 }}>
                <h4 style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>🍜 Must-Try Food</h4>
                {suggestion.localFood.map((f, i) => <p key={i} style={{ fontSize: 13, color: '#374151', padding: '3px 0' }}>• {f}</p>)}
              </div>
            )}
            {suggestion.packingTips && (
              <div className="card" style={{ padding: 20 }}>
                <h4 style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>🎒 Packing Tips</h4>
                {suggestion.packingTips.map((t, i) => <p key={i} style={{ fontSize: 13, color: '#374151', padding: '3px 0' }}>• {t}</p>)}
              </div>
            )}
          </div>
        </>
      )}

      <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between' }}>
        <button className="btn-outline" onClick={onBack}>← Back</button>
        <button className="btn-primary" onClick={onNext}>Choose Flights, Hotels & Cabs →</button>
      </div>
    </div>
  )
}
