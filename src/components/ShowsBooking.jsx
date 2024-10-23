import { useState, useEffect } from 'react';
import { Trash, Edit } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = import.meta.env.VITE_API_URL;

function ShowsBookings() {
    const [bookings, setBookings] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

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

    const handleEdit = (booking) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    const handleSaveChanges = () => {
        axios.put(`${API_URL}/${selectedBooking.id}`, selectedBooking)
            .then(() => {
                setBookings(bookings.map(booking =>
                    booking.id === selectedBooking.id ? selectedBooking : booking
                ));
                toast.success('Booking updated');
                setIsModalOpen(false);
            })
            .catch(error => {
                console.error('Error updating booking:', error);
                toast.error('Error updating booking');
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

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                        <h2 className="text-2xl mb-4">Edit Booking</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block mb-2">Title</label>
                                <input
                                    type="text"
                                    value={selectedBooking.title}
                                    onChange={(e) => setSelectedBooking({ ...selectedBooking, title: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Description</label>
                                <textarea
                                    value={selectedBooking.description}
                                    onChange={(e) => setSelectedBooking({ ...selectedBooking, description: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Date</label>
                                <input
                                    type="date"
                                    value={selectedBooking.date}
                                    onChange={(e) => setSelectedBooking({ ...selectedBooking, date: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Time</label>
                                <input
                                    type="time"
                                    value={selectedBooking.time}
                                    onChange={(e) => setSelectedBooking({ ...selectedBooking, time: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn btn-secondary mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSaveChanges}
                                    className="btn btn-primary"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShowsBookings;

