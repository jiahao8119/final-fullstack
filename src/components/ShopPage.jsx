import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from './ProductList'; // Import the ProductList component

const ShopPage = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const addToCart = (product) => {
        setCart([...cart, product]); // Add product to the cart
    };

    const handleCheckout = () => {
        navigate('/checkout', { state: { cart } }); // Navigate to CheckoutPage with cart items
    };

    return (
        <div className="shop-page">
            <h1 className="text-3xl font-bold mb-8">Shop Page</h1>
            <ProductList addToCart={addToCart} /> {/* Render the ProductList */}
            <div className="cart-summary mt-8">
                <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
                {cart.length > 0 ? (
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index}>
                                {item.name} - ${item.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Your cart is empty.</p>
                )}
                {cart.length > 0 && (
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors mt-4"
                        onClick={handleCheckout}
                    >
                        Proceed to Checkout
                    </button>
                )}
            </div>
        </div>
    );
};

export default ShopPage;


