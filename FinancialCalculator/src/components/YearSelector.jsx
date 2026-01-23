function YearSelector({ years, selectedYear }) {
    // Step 2: Static Version - Buttons don't work yet, just display
    return (
        <div className="year-selector">
            <span style={{ alignSelf: 'center', fontWeight: 500, marginRight: '1rem' }}>
                Select Financial Year
            </span>
            {years.map(year => (
                <button
                    key={year}
                    className={`year-btn ${selectedYear === year ? 'active' : ''}`}
                >
                    {year}
                </button>
            ))}
        </div>
    );
}

export default YearSelector;
