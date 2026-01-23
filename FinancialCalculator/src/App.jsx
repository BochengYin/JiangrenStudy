import { taxBrackets } from './data';
import YearSelector from './components/YearSelector';
import TaxRatesTable from './components/TaxRatesTable';
import CalculatorPanel from './components/CalculatorPanel';

function App() {
  // Step 2: Static Version - Hardcode state passed as props
  const years = Object.keys(taxBrackets); // ['FY 2023-24', 'FY 2024-25', ...]
  const selectedYear = 'FY 2024-25';
  const currentRates = taxBrackets[selectedYear];

  return (
    <div className="container">
      <h1>Australian Income Tax Calculator</h1>
      <p className="subtitle">Calculate your income tax based on ATO rates</p>

      <YearSelector
        years={years}
        selectedYear={selectedYear}
      />

      <div className="calculator-grid">
        <TaxRatesTable
          year={selectedYear}
          rates={currentRates}
        />
        <CalculatorPanel />
      </div>
    </div>
  );
}

export default App;
