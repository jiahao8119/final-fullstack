import { useState, useEffect } from 'react'
import { Trash, Edit } from 'lucide-react'
import axios from 'axios';

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
    const [bookings, setBookings] = useState([])
    const [editingBookingId, setEditingBookingId] = useState(null)

    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                console.log('Fetched bookings:', response.data);
                setBookings(response.data);
            })
            .catch(error => console.error('Error fetching bookings:', error));
    }, []);


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
            alert('Booking successful!');
            setBookings([...bookings, response.data]);
            clearForm();
        } catch (error) {
            console.error('Error creating booking:', error);
            alert('Error creating booking');
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

        setEditingBookingId(null)
    };

    const handleDelete = (id) => {
        axios.delete(`${API_URL}/${id}`)
            .then(() => {
                setBookings(bookings.filter((booking) => booking.id !== id));
            })
            .catch(error => console.error('Error deleting booking:', error));
    };

    const handleEdit = (booking) => {
        setEditingBookingId(booking.id)
        setTitle(booking.title)
        setDescription(booking.description)
        setSelectedDate(booking.date)
        setSelectedCourt(booking.court)
        setSelectedTime(booking.time)
        setPhoneNumber(booking.phone_number)
        setEmail(booking.email)

    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedBooking = {
            title,
            description,
            date: selectedDate,
            time: selectedTime,
            phone_number: phoneNumber,
            email,
            court: selectedCourt,
        };

        axios.put(`${API_URL}/${editingBookingId}`, updatedBooking)
            .then(response => {
                const updatedBookings = bookings.map(booking =>
                    booking.id === editingBookingId ? response.data : booking
                );
                setBookings(updatedBookings);
                clearForm();
                alert('Booking updated!');
            })
            .catch(error => console.error('Error updating booking:', error));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">
                {editingBookingId ? 'Update Booking' : 'Book a Badminton Court Now'}
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
                    <form onSubmit={editingBookingId ? handleUpdate : handleBooking} className="space-y-4">
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
                            {editingBookingId ? 'Update Booking' : 'Book Now'}
                        </button>
                    </form>
                </div>
            </div >


            < div className="mt-8" >
                <h2 className="text-2xl font-bold mb-4">Bookings</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="border rounded-lg p-4 shadow-md">
                            <h3 className="text-lg font-bold">{booking.title}</h3>
                            <p>{booking.description}</p>
                            <p>Date: {booking.date}</p>
                            <p>Time: {booking.time}</p>
                            <p>Court: {booking.court}</p>
                            <p>Phone: {booking.phone_number}</p>
                            <p>Email: {booking.email}</p>
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => handleEdit(booking)}
                                    className="btn btn-secondary"
                                >
                                    <Edit className="inline mr-2" /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(booking.id)}
                                    className="btn btn-danger"
                                >
                                    <Trash className="inline mr-2" /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </div >
    )
}

export default BookingPage
