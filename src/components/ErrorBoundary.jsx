import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, info: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    this.setState({ error, info })
    // also log to console for developer visibility
    console.error('ErrorBoundary caught error:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{padding:40,display:'flex',alignItems:'center',justifyContent:'center',minHeight:'60vh'}}>
          <div style={{background:'#fff',padding:24,borderRadius:12,boxShadow:'0 8px 30px rgba(0,0,0,0.08)'}}>
            <h2 style={{margin:0,color:'#c026d3'}}>Something went wrong</h2>
            <pre style={{whiteSpace:'pre-wrap',marginTop:12,color:'#333'}}>{String(this.state.error && this.state.error.toString())}</pre>
            <details style={{marginTop:12,whiteSpace:'pre-wrap'}}>
              {this.state.info?.componentStack}
            </details>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
