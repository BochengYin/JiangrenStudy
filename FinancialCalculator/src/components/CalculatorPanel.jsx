import { useState } from 'react';

function CalculatorPanel({ currentRates }) {
    const [inputIncome, setInputIncome] = useState('');
    const [result, setResult] = useState({
        taxableIncome: 0,
        incomeTax: 0,
        netIncome: 0,
        effectiveRate: 0
    });

    const handleInputChange = (e) => {
        setInputIncome(e.target.value);
    };

    const calculateTax = () => {
        const income = parseFloat(inputIncome);
        if (isNaN(income) || income < 0) {
            alert("Please enter a valid income");
            return;
        }

        let tax = 0;
        for (const bracket of currentRates) {
            if (income >= bracket.min && income <= bracket.max) {
                const excessAmount = income - (bracket.min - 1);
                tax = bracket.base + (excessAmount * bracket.rate);
                break;
            }
        }

        const net = income - tax;
        const rate = income > 0 ? tax / income : 0;

        setResult({
            taxableIncome: income,
            incomeTax: tax,
            netIncome: net,
            effectiveRate: rate
        });
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(val);
    };

    const formatPercentage = (val) => {
        return (val * 100).toFixed(2) + '%';
    };

    return (
        <div className="card">
            <h2>Calculate Tax</h2>

            <div className="input-group">
                <label>Annual Taxable Income</label>
                <div className="input-wrapper">
                    <span className="currency-symbol">$</span>
                    <input
                        type="number"
                        className="money-input"
                        placeholder="0"
                        value={inputIncome}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <button className="calculate-btn" onClick={calculateTax}>Calculate Tax</button>

            <div className="result-box">
                <h3>Results</h3>
                <div className="result-row">
                    <span>Taxable Income:</span>
                    <span className="result-value">{formatCurrency(result.taxableIncome)}</span>
                </div>
                <div className="result-row">
                    <span>Income Tax:</span>
                    <span className="result-value highlight">{formatCurrency(result.incomeTax)}</span>
                </div>
                <div className="result-row total">
                    <span>Net Income:</span>
                    <span className="result-value">{formatCurrency(result.netIncome)}</span>
                </div>
                <div className="result-row">
                    <span>Effective Tax Rate:</span>
                    <span className="result-value">{formatPercentage(result.effectiveRate)}</span>
                </div>
            </div>
        </div>
    );
}

export default CalculatorPanel;
