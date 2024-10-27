import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ShopPage = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {

                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {

                return [...prevCart, { ...product, quantity: 1 }];
            }
        });

        toast.success(`${product.name} added to cart!`);
    };

    const handleCheckout = () => {
        toast.success('Proceeding to checkout...');
        navigate('/CheckoutPage', { state: { cart } });
    };

    return (
        <div className="shop-page">
            <h1 className="text-3xl font-bold mb-8 "> Badminton Shop</h1>
            <ToastContainer />
            <ProductList addToCart={addToCart} />


            <div className="cart-summary mt-8 max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Cart Summary</h2>
                {cart.length > 0 ? (
                    <ul className="space-y-4 mb-4">
                        {cart.map((item, index) => (
                            <li
                                key={index}
                                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg shadow-sm"
                            >
                                <span className="text-gray-700 font-medium">{item.name}</span>
                                <span className="text-gray-600 font-semibold">RM{item.price.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">Your cart is empty.</p>
                )}
                {cart.length > 0 && (
                    <button
                        className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors mt-4 font-semibold"
                        onClick={handleCheckout}
                    >
                        Proceed to Checkout
                    </button>
                )}
            </div>
        </div>
    )
}

export default ShopPage;





