function TaxRatesTable({ year, rates }) {
    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(val);
    };

    return (
        <div className="card">
            <h2>Tax Rates - {year}</h2>
            <table className="tax-table">
                <thead>
                    <tr>
                        <th>Taxable Income</th>
                        <th>Tax Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {rates.map((bracket, index) => {
                        const min = formatCurrency(bracket.min);
                        const max = bracket.max === Infinity ? 'and above' : formatCurrency(bracket.max);

                        // Format the rate description text matching the screenshot style or logic
                        let rateText = '';
                        if (bracket.rate === 0) rateText = 'Nil';
                        else {
                            const percentage = (bracket.rate * 100).toFixed(1) + '%';
                            if (bracket.base > 0) {
                                rateText = `${percentage} + ${formatCurrency(bracket.base)}`;
                            } else {
                                rateText = percentage;
                            }
                        }

                        return (
                            <tr key={index}>
                                <td>{min} - {max}</td>
                                <td>{rateText}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TaxRatesTable;
