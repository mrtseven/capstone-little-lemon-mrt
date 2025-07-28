import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Reservations from './Reservations';

// Mocking the API functions
jest.mock('../bookingsAPI', () => ({
    fetchAPI: jest.fn(() => Promise.resolve(['17:00', '18:00', '19:00'])),
    submitAPI: jest.fn(() => Promise.resolve(true)),
}));

// Mocking useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
}));

describe('Reservations Page', () => {
    beforeEach(() => {
        // Clear mocks before each test
        jest.clearAllMocks();
    });

    test('Renders the Reservations heading', () => {
        render(<Reservations />);
        const headingElement = screen.getByText("Reservations");
        expect(headingElement).toBeInTheDocument();
    });

    test('Form submission with valid data shows confirmation', async () => {
        render(<Reservations />);

        fireEvent.change(screen.getByLabelText(/Choose date/i), { target: { value: '2025-12-25' } });
        fireEvent.change(screen.getByLabelText(/Choose time/i), { target: { value: '18:00' } });
        fireEvent.change(screen.getByLabelText(/Number of guests/i), { target: { value: '4' } });
        fireEvent.change(screen.getByLabelText(/Occasion/i), { target: { value: 'Anniversary' } });

        const submitButton = screen.getByRole('button', { name: /Book Now/i });
        fireEvent.click(submitButton);

        await screen.findByText('Booking Confirmed!');
    });

    test('Shows validation error when date is not selected', async () => {
        render(<Reservations />);
        fireEvent.change(screen.getByLabelText(/Choose date/i), { target: { value: '' } });
        const submitButton = screen.getByRole('button', { name: /Book Now/i });
        fireEvent.click(submitButton);
        const errorMessage = await screen.findByText('Date is required.');
        expect(errorMessage).toBeInTheDocument();
    });

    test('Shows validation error for less than 1 guest', async () => {
        render(<Reservations />);
        fireEvent.change(screen.getByLabelText(/Number of guests/i), { target: { value: '0' } });
        const submitButton = screen.getByRole('button', { name: /Book Now/i });
        fireEvent.click(submitButton);
        const errorMessage = await screen.findByText('Must be at least 1 guest.');
        expect(errorMessage).toBeInTheDocument();
    });

    test('Shows validation error for more than 10 guests', async () => {
        render(<Reservations />);
        fireEvent.change(screen.getByLabelText(/Number of guests/i), { target: { value: '11' } });
        const submitButton = screen.getByRole('button', { name: /Book Now/i });
        fireEvent.click(submitButton);
        const errorMessage = await screen.findByText('Cannot exceed 10 guests.');
        expect(errorMessage).toBeInTheDocument();
    });

    test('Submit button is disabled for an invalid form', async () => {
        render(<Reservations />);
        fireEvent.change(screen.getByLabelText(/Choose date/i), { target: { value: '' } });
        const submitButton = screen.getByRole('button', { name: /Book Now/i });
        expect(submitButton).toBeDisabled();
    });

    test('HTML5 validation attributes are present', () => {
        render(<Reservations />);
        const dateInput = screen.getByLabelText(/Choose date/i);
        expect(dateInput).toHaveAttribute('required');
        expect(dateInput).toHaveAttribute('min');

        const guestsInput = screen.getByLabelText(/Number of guests/i);
        expect(guestsInput).toHaveAttribute('required');
        expect(guestsInput).toHaveAttribute('min', '1');
        expect(guestsInput).toHaveAttribute('max', '10');
    });
});
