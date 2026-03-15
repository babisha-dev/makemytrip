const STEPS = ['Trip Details', 'AI Suggestion', 'Choose Options', 'Review & Book']

export default function StepBar({ current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 20px', gap: 0 }}>
      {STEPS.map((label, i) => {
        const idx = i + 1
        const done = current > idx
        const active = current === idx
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div className={done ? 'step-done' : active ? 'step-active' : 'step-pending'}
                style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, transition: 'all 0.3s' }}>
                {done ? '✓' : idx}
              </div>
              <span style={{ fontSize: 11, fontWeight: active ? 600 : 400, color: active ? '#e63946' : done ? '#22c55e' : '#9ca3af', whiteSpace: 'nowrap' }}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ width: 60, height: 2, background: current > idx ? '#22c55e' : '#e5e7eb', margin: '0 8px', marginBottom: 22, transition: 'background 0.3s' }} />
            )}
          </div>
        )
      })}
    </div>
  )
}
