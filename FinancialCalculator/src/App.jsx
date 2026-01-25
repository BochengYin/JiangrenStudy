import { useState } from 'react';
import { taxBrackets } from './data';
import YearSelector from './components/YearSelector';
import TaxRatesTable from './components/TaxRatesTable';
import CalculatorPanel from './components/CalculatorPanel';

function App() {
  const years = Object.keys(taxBrackets);
  const [selectedYear, setSelectedYear] = useState('FY 2024-25');
  const currentRates = taxBrackets[selectedYear];

  return (
    <div className="container">
      <h1>Australian Income Tax Calculator</h1>
      <p className="subtitle">Calculate your income tax based on ATO rates</p>

      <YearSelector
        years={years}
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
      />

      <div className="calculator-grid">
        <TaxRatesTable
          year={selectedYear}
          rates={currentRates}
        />
        <CalculatorPanel currentRates={currentRates} />
      </div>
    </div>
  );
}
export default App;
