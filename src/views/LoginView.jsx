import { useState } from 'react'

export default function LoginView({ goTo }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('patient')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // TODO: Replace with actual API call
      console.log('Login attempt:', { email, password, userType })
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false)
        // Navigate based on user type
        if (userType === 'patient') {
          goTo('home')
        } else if (userType === 'doctor') {
          goTo('doctor')
        }
      }, 1000)
    } catch (error) {
      console.error('Login failed:', error)
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p className="login-subtitle">Sign in to your DocAI account</p>
        
        <div className="user-type-section">
          <p className="user-type-label">I am a:</p>
          <div className="user-type-options">
            <label className="user-type-option">
              <input
                type="radio"
                name="userType"
                value="patient"
                checked={userType === 'patient'}
                onChange={(e) => setUserType(e.target.value)}
              />
              <span className="user-type-text">Patient</span>
            </label>
            <label className="user-type-option">
              <input
                type="radio"
                name="userType"
                value="doctor"
                checked={userType === 'doctor'}
                onChange={(e) => setUserType(e.target.value)}
              />
              <span className="user-type-text">Doctor</span>
            </label>
          </div>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <a onClick={() => goTo('signup')} className="signup-link">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
