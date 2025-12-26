import { useState, useRef } from 'react'

function PrescriptionUploadView({ goTo }) {
  const [uploadedFile, setUploadedFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  return (
    <>
      <div className="card home-hero-card">
        <h1 className="home-hero-title" style={{ fontSize: '22px' }}>
          Upload Prescription
        </h1>
        <p className="card-subtitle">
          Take a photo or upload an image of your prescription.
        </p>
        <div
          onClick={handleUploadClick}
          style={{
            border: '2px dashed var(--primary-teal)',
            borderRadius: '12px',
            padding: '40px',
            textAlign: 'center',
            color: 'var(--text-soft)',
            cursor: 'pointer',
            marginBottom: '24px',
            backgroundColor: uploadedFile ? '#f0fafb' : 'transparent',
            transition: 'all 0.2s ease',
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginBottom: '12px' }}
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p style={{ margin: 0, fontWeight: 500 }}>
            {uploadedFile ? uploadedFile.name : 'Tap to upload'}
          </p>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px' }}>
            Supports JPG, PNG, PDF
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <button 
          className="cta-button" 
          onClick={() => goTo('rx-analysis')}
          disabled={!uploadedFile}
          style={{ opacity: uploadedFile ? 1 : 0.5, cursor: uploadedFile ? 'pointer' : 'not-allowed' }}
        >
          Analyze
        </button>
      </div>
      <button
        style={{
          color: 'var(--text-soft)',
          background: 'none',
          border: 'none',
          padding: '12px',
          width: '100%',
          cursor: 'pointer',
          marginTop: '12px',
        }}
        onClick={() => goTo('home')}
      >
        Cancel
      </button>
    </>
  )
}

export default PrescriptionUploadView
