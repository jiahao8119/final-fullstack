import { useState, useEffect } from 'react'
import { Trash, Edit } from 'lucide-react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'https://51aff819-ce28-471e-99e4-9701444848fa-00-2lgwh8tk10z56.pike.replit.dev:3000/bookings';

function ShowsBookings() {
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                console.log('Fetched bookings:', response.data);
                setBookings(response.data);
            })
            .catch(error => console.error('Error fetching bookings:', error));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`${API_URL}/${id}`)
            .then(() => {
                setBookings(bookings.filter((booking) => booking.id !== id));
                toast.success('Booking deleted');
            })
            .catch(error => {
                console.error('Error deleting booking:', error);
                toast.error('Error deleting booking');
            });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <ToastContainer />
            <h1 className="text-3xl font-bold mb-8 text-center">My Bookings</h1>
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
                                onClick={() => {/* Handle edit */ }}
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
        </div>
    )
}

export default ShowsBookings
