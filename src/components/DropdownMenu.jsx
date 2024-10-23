import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react'

const DropdownMenu = ({ onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block text-left">

            <button
                onClick={toggleDropdown}
                className="inline-flex justify-center w-full px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            >
                <Menu className="text-gray-400 mr-2" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <Link
                            to="/shop"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-black-800"
                            role="menuitem"
                            onClick={() => setIsOpen(false)}
                        >
                            Shop
                        </Link>
                        <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-black-800"
                            role="menuitem"
                            onClick={() => setIsOpen(false)}
                        >
                            Profile
                        </Link>
                        <Link
                            to="/showbookings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-black-800"
                            role="menuitem"
                            onClick={() => setIsOpen(false)}
                        >
                            My Bookings
                        </Link>
                        <Link
                            to="/CheckoutPage"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-black-800"
                            role="menuitem"
                            onClick={() => setIsOpen(false)}
                        >
                            Checkout
                        </Link>
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                onLogout();
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-black-800"
                            role="menuitem"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
