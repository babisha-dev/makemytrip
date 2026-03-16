import { useState } from 'react'
import StepBar from '../components/StepBar.jsx'
import TripForm from '../components/form/TripForm.jsx'
import AISuggestion from '../components/form/AISuggestion.jsx'
import ChooseOptions from '../components/form/ChooseOptions.jsx'
import ReviewBook from '../components/form/ReviewBook.jsx'

export default function HomePage() {
  const [step, setStep] = useState(1)
  const [searchData, setSearchData] = useState(null)
  const [selections, setSelections] = useState(null)

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Hero banner */}
      <div style={{ background: 'linear-gradient(135deg, #e63946 0%, #9d0208 100%)', padding: '32px 20px 0', textAlign: 'center' }}>
        <h1 style={{ color: 'white', fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>
          Where do you want to go?
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, margin: '0 0 24px' }}>
          AI-powered trip planning  · Hotels · Cabs · All in one place
        </p>
        <div style={{ background: 'white', borderRadius: '12px 12px 0 0', maxWidth: 860, margin: '0 auto', padding: '0' }}>
          <StepBar current={step} />
        </div>
      </div>

      {/* Step content */}
      <div style={{ maxWidth: 860, margin: '0 auto', paddingTop: 24 }}>
        {step === 1 && (
          <TripForm onNext={data => { setSearchData(data); setStep(2) }} />
        )}
        {step === 2 && searchData && (
          <AISuggestion
            searchData={searchData}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && searchData && (
          <ChooseOptions
            searchData={searchData}
            onNext={sel => { setSelections(sel); setStep(4) }}
            onBack={() => setStep(2)}
          />
        )}
        {step === 4 && searchData && selections && (
          <ReviewBook
            searchData={searchData}
            selections={selections}
            onBack={() => setStep(3)}
          />
        )}
      </div>
    </div>
  )
}
