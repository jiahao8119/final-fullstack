import { useState } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const courts = [
    { id: 1, name: 'Court A' },
    { id: 2, name: 'Court B' },
    { id: 3, name: 'Court C' },
]

const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
]

const API_URL = 'https://51aff819-ce28-471e-99e4-9701444848fa-00-2lgwh8tk10z56.pike.replit.dev:3000/bookings';

function BookingPage() {
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedCourt, setSelectedCourt] = useState('')
    const [selectedTime, setSelectedTime] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')

    const handleBooking = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_URL, {
                title,
                description,
                date: selectedDate,
                time: selectedTime,
                phone_number: phoneNumber,
                email,
                court: selectedCourt,
            });

            console.log('Booking created:', response.data);
            toast.success('Booking successful!');
            clearForm();
        } catch (error) {
            console.error('Error creating booking:', error);
            toast.error('Error creating booking');
        }
    };

    const clearForm = () => {
        setTitle('')
        setDescription('')
        setSelectedDate('')
        setSelectedCourt('')
        setSelectedTime('')
        setPhoneNumber('')
        setEmail('')
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <ToastContainer />
            <h1 className="text-3xl font-bold mb-8 text-center">
                Book a Badminton Court Now
            </h1>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                        alt="Badminton Court"
                        className="w-full h-full object-cover rounded-lg shadow-md"
                    />
                </div>
                <div>
                    <form onSubmit={handleBooking} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                className="input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <input
                                type="text"
                                className="input"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    className="pl-10 input"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Court</label>
                            <select
                                className="pl-10 input"
                                value={selectedCourt}
                                onChange={(e) => setSelectedCourt(e.target.value)}
                                required
                            >
                                <option value="">Choose a court</option>
                                {courts.map((court) => (
                                    <option key={court.id} value={court.name}>
                                        {court.name}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Time</label>
                            <div className="relative">
                                <select
                                    className="pl-10 input"
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                    required
                                >
                                    <option value="">Choose a time slot</option>
                                    {timeSlots.map((slot) => (
                                        <option key={slot} value={slot}>
                                            {slot}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <div className="relative">

                                <input
                                    type="tel"
                                    className="pl-10 input"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <div className="relative">

                                <input
                                    type="email"
                                    className="pl-10 input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full btn btn-primary">
                            Book Now
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BookingPage
