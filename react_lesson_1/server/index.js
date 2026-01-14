const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const TAX_BRACKETS_2024_2025 = [
    { min: 0, max: 18200, rate: 0, base: 0 },
    { min: 18200, max: 45000, rate: 0.19, base: 0 },
    { min: 45000, max: 120000, rate: 0.325, base: 5092 },
    { min: 120000, max: 180000, rate: 0.37, base: 29467 },
    { min: 180000, max: Infinity, rate: 0.45, base: 51667 },
];

const calculateTax = (income) => {
    let taxPayable = 0;

    for (const bracket of TAX_BRACKETS_2024_2025) {
        if (income > bracket.min) {
            if (income <= bracket.max) {
                // Income falls within this bracket
                taxPayable = bracket.base + (income - bracket.min) * bracket.rate;
                break; // Found the top bracket
            }
            // If income exceeds this bracket, we check the next one.
            // Wait, the 'base' logic in the provided image/standard usually implies:
            // validation:
            // Base for 45000-120000: (45000-18200)*0.19 = 26800*0.19=5092. Correct.
            // Base for 120000-180000: 5092 + (120000-45000)*0.325 = 5092 + 75000*0.325 = 5092 + 24375 = 29467. Correct.
            // Base for 180000+: 29467 + (180000-120000)*0.37 = 29467 + 60000*0.37 = 29467 + 22200 = 51667. Correct.

            // So the logic is: find the single bracket where income falls (between min and max), 
            // then calculation is: base + (income - min) * rate.
            // If income > max of a bracket, we just continue to the next because
            // the 'base' of the *next* bracket already accounts for the tax of *this* full bracket.
        }
    }

    return taxPayable;
};

app.post('/api/calculate-tax', (req, res) => {
    const { income } = req.body;

    if (income === undefined || income === null || income < 0) {
        return res.status(400).json({ error: 'Invalid income' });
    }

    const tax = calculateTax(Number(income));

    res.json({
        income: Number(income),
        taxPayable: tax,
        brackets: TAX_BRACKETS_2024_2025
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
