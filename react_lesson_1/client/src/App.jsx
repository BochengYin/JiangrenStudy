import { useState } from 'react'
import './App.css'

// Child Component: TaxForm
// Demonstrates use of Props: receives 'onCalculate' and 'loading' as props
function TaxForm({ onCalculate, loading }) {
  const [income, setIncome] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onCalculate(income)
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Enter Annual Income"
            required
            aria-label="Annual Income"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Calculating...' : 'Calculate Tax'}
          </button>
        </div>
      </form>
    </div>
  )
}

// Child Component: ResultDisplay
// Demonstrates use of Props: receives 'result' object as prop
function ResultDisplay({ result }) {
  if (!result) return null;

  return (
    <div className="card result-card">
      <div className="result">
        <h2>Tax Payable: ${result.taxPayable.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
        <p>Net Income: ${(result.income - result.taxPayable).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>

        <div className="breakdown">
          <h3>Tax Brackets Used (2024-2025)</h3>
          <table>
            <thead>
              <tr>
                <th>Min</th>
                <th>Max</th>
                <th>Rate</th>
                <th>Base</th>
              </tr>
            </thead>
            <tbody>
              {result.brackets.map((bracket, index) => (
                <tr key={index} style={{ backgroundColor: result.income > bracket.min ? '#e6ffe6' : 'transparent' }}>
                  <td>${bracket.min.toLocaleString()}</td>
                  <td>{bracket.max === null || bracket.max === 'Infinity' || bracket.max > 1000000000 ? 'Infinity' : '$' + bracket.max.toLocaleString()}</td>
                  <td>{(bracket.rate * 100).toFixed(1)}%</td>
                  <td>${bracket.base.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleCalculate = async (incomeValue) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('http://localhost:3000/api/calculate-tax', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ income: Number(incomeValue) }),
      })

      if (!response.ok) {
        throw new Error('Failed to calculate tax')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h1>Income Tax Calculator</h1>
      <TaxForm onCalculate={handleCalculate} loading={loading} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ResultDisplay result={result} />
    </>
  )
}

export default App
