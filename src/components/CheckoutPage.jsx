import { useLocation } from 'react-router-dom';
import { Lock, Package } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';

const CheckoutPage = () => {
    const location = useLocation();
    const { cart } = location.state || { cart: [] };

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 12.99;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    const handlePurchase = () => {
        toast.success('Purchase completed successfully!');

    };

    return (
        <div className="min-h-screen bg-gray-50">
            <ToastContainer />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                    <Package className="w-8 h-8" />
                    Checkout
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Package className="w-5 h-5" />
                                Order Summary
                            </h2>
                            <div className="space-y-4">
                                {cart.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 py-4 border-b">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                                            <p className="text-gray-500">Quantity: {item.quantity}</p>
                                            <p className="font-medium">${item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                                <div className="space-y-2 pt-4">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span>${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold text-lg pt-4 border-t">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                            onClick={handlePurchase}
                        >
                            <Lock className="w-5 h-5" />
                            Complete Purchase
                        </button>

                        <p className="text-sm text-gray-500 text-center">
                            Your payment information is encrypted and secure. We never store your credit card details.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
