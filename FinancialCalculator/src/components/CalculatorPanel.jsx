function CalculatorPanel() {
    // Step 2: Static version - Hardcoded values
    const taxableIncome = 0;
    const incomeTax = 0;
    const netIncome = 0;
    const effectiveRate = 0;

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
                    />
                </div>
            </div>

            <button className="calculate-btn">Calculate Tax</button>

            <div className="result-box">
                <h3>Results</h3>
                <div className="result-row">
                    <span>Taxable Income:</span>
                    <span className="result-value">$0.00</span>
                </div>
                <div className="result-row">
                    <span>Income Tax:</span>
                    <span className="result-value highlight">$0.00</span>
                </div>
                <div className="result-row total">
                    <span>Net Income:</span>
                    <span className="result-value">$0.00</span>
                </div>
                <div className="result-row">
                    <span>Effective Tax Rate:</span>
                    <span className="result-value">0.00%</span>
                </div>
            </div>
        </div>
    );
}

export default CalculatorPanel;
