export const taxBrackets = {
    'FY 2023-24': [
        { min: 0, max: 18200, rate: 0, base: 0 },
        { min: 18201, max: 45000, rate: 0.19, base: 0 },
        { min: 45001, max: 120000, rate: 0.325, base: 5092 },
        { min: 120001, max: 180000, rate: 0.37, base: 29467 },
        { min: 180001, max: Infinity, rate: 0.45, base: 51667 },
    ],
    'FY 2024-25': [
        { min: 0, max: 18200, rate: 0, base: 0 },
        { min: 18201, max: 45000, rate: 0.16, base: 0 },
        { min: 45001, max: 135000, rate: 0.30, base: 4288 },
        { min: 135001, max: 190000, rate: 0.37, base: 31288 },
        { min: 190001, max: Infinity, rate: 0.45, base: 51638 },
    ],
    'FY 2025-26': [
        { min: 0, max: 18200, rate: 0, base: 0 },
        { min: 18201, max: 45000, rate: 0.16, base: 0 },
        { min: 45001, max: 135000, rate: 0.30, base: 4288 },
        { min: 135001, max: 190000, rate: 0.37, base: 31288 },
        { min: 190001, max: Infinity, rate: 0.45, base: 51638 },
    ]
};
