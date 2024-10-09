import { useState } from 'react'
import { Calendar, Clock, Users } from 'lucide-react'

const courts = [
    { id: 1, name: 'Court A' },
    { id: 2, name: 'Court B' },
    { id: 3, name: 'Court C' },
]

const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
]

function BookingPage() {
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedCourt, setSelectedCourt] = useState('')
    const [selectedTime, setSelectedTime] = useState('')

    const handleBooking = (e) => {
        e.preventDefault()
        // Here you would typically send the booking data to your backend
        console.log('Booking submitted:', { selectedDate, selectedCourt, selectedTime })
        alert('Booking successful!')
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Book a Badminton Court</h1>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                        alt="Badminton Court"
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                </div>
                <div>
                    <form onSubmit={handleBooking} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                            <div className="relative">
                                <Calendar className="absolute top-3 left-3 text-gray-400" />
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
                            <div className="relative">
                                <Users className="absolute top-3 left-3 text-gray-400" />
                                <select
                                    className="pl-10 input"
                                    value={selectedCourt}
                                    onChange={(e) => setSelectedCourt(e.target.value)}
                                    required
                                >
                                    <option value="">Choose a court</option>
                                    {courts.map((court) => (
                                        <option key={court.id} value={court.name}>{court.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Time</label>
                            <div className="relative">
                                <Clock className="absolute top-3 left-3 text-gray-400" />
                                <select
                                    className="pl-10 input"
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                    required
                                >
                                    <option value="">Choose a time slot</option>
                                    {timeSlots.map((slot) => (
                                        <option key={slot} value={slot}>{slot}</option>
                                    ))}
                                </select>
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