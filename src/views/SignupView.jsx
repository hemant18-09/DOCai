function SignupView({ goTo }) {
  return (
    <>
      <div className="card home-hero-card">
        <h1 className="home-hero-title">Create Account</h1>
        <p className="card-subtitle">
          Sign up to get personalized healthcare assistance.
        </p>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            type="text"
            placeholder="Full Name"
            className="symptom-input-box"
            style={{ minHeight: 'auto', padding: '12px', marginBottom: 0 }}
          />
          <input
            type="email"
            placeholder="Email Address"
            className="symptom-input-box"
            style={{ minHeight: 'auto', padding: '12px', marginBottom: 0 }}
          />
          <input
            type="password"
            placeholder="Password"
            className="symptom-input-box"
            style={{ minHeight: 'auto', padding: '12px', marginBottom: 0 }}
          />
          <button
            type="button"
            className="cta-button"
            onClick={() => goTo('home')}
          >
            Sign Up
          </button>
        </form>
        <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-soft)', marginTop: '16px' }}>
          Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); goTo('login'); }} style={{ color: 'var(--primary-teal)', textDecoration: 'none', fontWeight: 600, cursor: 'pointer' }}>Log In</a>
        </p>
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
        Back
      </button>
    </>
  )
}

export default SignupView
