import { Facebook, Twitter, Instagram, Github } from 'lucide-react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-xl font-bold mb-2">BadmintonBooker</h3>
                        <p className="text-gray-400">Book your court anytime, anywhere.</p>
                    </div>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                            <li><Link to="/locate-us" className="text-gray-400 hover:text-white">Locate Us</Link></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white">
                                <Facebook />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <Twitter />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white">
                                <Instagram />
                            </a>
                            <a href="https://github.com/jiahao8119" target="_blank" className="text-gray-400 hover:text-white">
                                <Github />
                            </a>
                        </div>


                    </div>

                </div>
                <div className="mt-8 text-center text-gray-400">
                    <p>&copy; 2024 BadmintonBooker. </p>
                </div>
            </div>
        </footer >
    )
}



export default Footer