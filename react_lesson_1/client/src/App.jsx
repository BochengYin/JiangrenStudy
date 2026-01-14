import { useState } from 'react'
import './App.css'

function App() {
  const [income, setIncome] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleCalculate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('http://localhost:3000/api/calculate-tax', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ income: Number(income) }),
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
      <div className="card">
        <form onSubmit={handleCalculate}>
          <div className="input-group">
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Enter Annual Income"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Calculating...' : 'Calculate Tax'}
            </button>
          </div>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {result && (
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
        )}
      </div>
    </>
  )
}

export default App
