import { Feather, Package, Footprints } from 'lucide-react'; // Assuming you're using lucide-react for icons
import React from 'react';

// No need for interface in JavaScript, just use a plain array of objects
const products = [
    { id: 1, name: 'Pro Racket', price: 129.99, description: 'High-performance badminton racket', icon: <Feather /> },
    { id: 2, name: 'Shuttlecocks (12-pack)', price: 19.99, description: 'Tournament-grade shuttlecocks', icon: <Package /> },
    { id: 3, name: 'Court Shoes', price: 89.99, description: 'Lightweight and comfortable court shoes', icon: <Footprints /> },
];

const ProductList = ({ addToCart }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
                <div key={product.id} className="bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-center mb-4">
                        {React.cloneElement(product.icon, { size: 48 })} {/* No need for casting types */}
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                    <p className="text-gray-600 mb-2">{product.description}</p>
                    <p className="text-lg font-bold mb-4">${product.price.toFixed(2)}</p>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        onClick={() => addToCart(product)}
                    >
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
