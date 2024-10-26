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
            <h1 className="text-3xl font-bold mb-8 ">Shop</h1>
            <ToastContainer />
            <ProductList addToCart={addToCart} />
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





