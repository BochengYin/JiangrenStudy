import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Vite \+ React/);
    await expect(page.getByText('Income Tax Calculator')).toBeVisible();
});

test('calculates tax correctly', async ({ page }) => {
    await page.goto('/');

    // Fill in income
    await page.getByPlaceholder('Enter Annual Income').fill('200000');

    // Click calculate
    await page.getByRole('button', { name: 'Calculate Tax' }).click();

    // Check results
    await expect(page.getByText('Tax Payable: $60,667.00')).toBeVisible();
    await expect(page.getByText('Net Income: $139,333.00')).toBeVisible();

    // Check breakdown table visibility
    await expect(page.getByText('Tax Brackets Used (2024-2025)')).toBeVisible();
});
