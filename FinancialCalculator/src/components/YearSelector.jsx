function YearSelector({ years, selectedYear, onSelectYear }) {
    // Step 5: Add Inverse Data Flow - onSelectYear callback
    return (
        <div className="year-selector">
            <span style={{ alignSelf: 'center', fontWeight: 500, marginRight: '1rem' }}>
                Select Financial Year
            </span>
            {years.map(year => (
                <button
                    key={year}
                    className={`year-btn ${selectedYear === year ? 'active' : ''}`}
                    onClick={() => onSelectYear(year)}
                >
                    {year}
                </button>
            ))}
        </div>
    );
}

export default YearSelector;
