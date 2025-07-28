import { render, screen } from "@testing-library/react";
import BookingForm from './components/BookingForm';

test('Renders the BookingForm heading', () => {
    const mockFormData = {
        date: '2025-07-20',
        time: '17:00',
        guests: 1,
        occasion: 'birthday'
    };
    render(<BookingForm availableTimes={[]} formData={mockFormData} onInputChange={() => {}} onSubmit={() => {}} />);
    const buttonElement = screen.getByText("Book Now");
    expect(buttonElement).toBeInTheDocument();
})

