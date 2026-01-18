import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from './App'

// Mock fetch
global.fetch = vi.fn()

describe('App', () => {
    it('renders income tax calculator title', () => {
        render(<App />)
        expect(screen.getByText('Income Tax Calculator')).toBeInTheDocument()
    })

    it('renders input field and button', () => {
        render(<App />)
        expect(screen.getByPlaceholderText('Enter Annual Income')).toBeInTheDocument()
        expect(screen.getByText('Calculate Tax')).toBeInTheDocument()
    })

    it('calls API and displays result on form submission', async () => {
        const mockResult = {
            income: 100000,
            taxPayable: 22967,
            brackets: [
                { min: 0, max: 18200, rate: 0, base: 0 },
                { min: 18200, max: 45000, rate: 0.19, base: 0 },
                { min: 45000, max: 120000, rate: 0.325, base: 5092 },
                { min: 120000, max: 180000, rate: 0.37, base: 29467 },
                { min: 180000, max: Infinity, rate: 0.45, base: 51667 }
            ]
        }

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResult,
        })

        render(<App />)

        const input = screen.getByPlaceholderText('Enter Annual Income')
        fireEvent.change(input, { target: { value: '100000' } })

        const button = screen.getByText('Calculate Tax')
        fireEvent.click(button)

        expect(screen.getByText('Calculating...')).toBeInTheDocument()

        await waitFor(() => {
            // 22,967 formatted is $22,967.00
            expect(screen.getByText('Tax Payable: $22,967.00')).toBeInTheDocument()
            // Net income: 100000 - 22967 = 77033 -> $77,033.00
            expect(screen.getByText('Net Income: $77,033.00')).toBeInTheDocument()
        })
    })

    it('displays error message on API failure', async () => {
        fetch.mockRejectedValueOnce(new Error('API Error'))

        render(<App />)

        const input = screen.getByPlaceholderText('Enter Annual Income')
        fireEvent.change(input, { target: { value: '50000' } })

        const button = screen.getByText('Calculate Tax')
        fireEvent.click(button)

        await waitFor(() => {
            expect(screen.getByText('API Error')).toBeInTheDocument()
        })
    })
})
