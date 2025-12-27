import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 16 }}>
          <div
            style={{
              background: '#fff5f5',
              border: '1px solid #fecaca',
              color: '#7f1d1d',
              padding: '12px 16px',
              borderRadius: 12,
            }}
          >
            <strong>Something went wrong rendering this section.</strong>
            <div style={{ fontSize: 13, opacity: 0.8, marginTop: 6 }}>
              Please refresh the page. If this persists, share the console error.
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
