import { useState } from "react";
import { View, X, ShoppingCart } from "lucide-react";

const products = [

    { id: 1, name: 'YONEX NANOFLARE 700 PRO MIDNIGHT PURPLE', price: 769.90, description: '2NF-700P', image: "https://i.ibb.co/zZfLgVQ/racket2.png" },
    { id: 2, name: 'YONEX NANOFLARE 700 TOUR MIDNIGHT PURPLE', price: 599.90, description: '2NF-700T', image: "https://i.ibb.co/WznDdjX/racket1.png" },
    { id: 3, name: 'YONEX NANOFLARE 1000Z LIGHTNING YELLOW', price: 879.90, description: 'NF-1000Z', image: "https://i.ibb.co/nfBkKvJ/racket3.png" },
    { id: 4, name: 'POWER CUSHION STRIDER RAY UNISEX WHITE', price: 264.90, description: 'Power Cushion, Ergoshape, Round Sole, Radial Blade Sole, Semi One-Piece Sole', image: "https://i.ibb.co/FX0w7W9/badmintonshoe1.png" },
    { id: 5, name: 'POWER CUSHION STRIDER RAY WIDE UNISEX WHITE YELLOW', price: 264.90, description: 'Power Cushion, Ergoshape, Round Sole, Radial Blade Sole, Semi One-Piece Sole', image: "https://i.ibb.co/b14K9Jj/badmintonshoe2.png" },
    { id: 6, name: 'POWER CUSHION STRIDER RAY WIDE UNISEX BLACK ORANGE', price: 264.90, description: 'Power Cushion, Ergoshape, Round Sole, Radial Blade Sole, Semi One-Piece Sole', image: "https://i.ibb.co/djVBKhw/badmitonshoe3.png" },
    { id: 7, name: 'YONEX PRO TOURNAMENT BAG  SAND BEIGE', price: 459.90, description: 'YONEX PRO TOURNAMENT BAG 92431WEX', image: "https://i.ibb.co/0B4jS60/racketbag2.png" },
    { id: 8, name: 'YONEX TOURNAMENT BAG  DARK FLOWER GREY/YELLOW', price: 259.90, description: 'YONEX PRO RACQUET BAG 22931WT', image: "https://i.ibb.co/N219p8h/racketbag1.png" },
    { id: 9, name: 'YONEX SPORT LOW-CUT SOCKS (3 PAIRS)', price: 62.90, description: 'YONEX SPORT LOW-CUT SOCKS 19223EX (3 PAIRS)', image: "https://i.ibb.co/nrWH43g/socks1.png" },
    { id: 10, name: 'YONEX SPORT QUARTER SOCKS (3 PAIRS)', price: 62.90, description: 'YONEX SPORT LOW-CUT SOCKS 19222EX (3 PAIRS)', image: "https://i.ibb.co/v4XyNQQ/socks2.png" },
    { id: 11, name: 'YONEX OVERGRIP 12IN1 MIX COLOR', price: 99.00, description: 'White (4pcs), Yellow (4pcs), Pink (4pcs)', image: "https://i.ibb.co/5L5tyjh/badmintongrip1.png" },
    { id: 12, name: 'YONEX SHUTTLECOCK AEROSENSA 50', price: 135.00, description: '100% solid cork, goose feathers', image: "https://i.ibb.co/jwR3wYy/shuttlecock1.png" },
];

const ProductList = ({ addToCart }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const showProductDetails = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        setIsModalOpen(false);
    };


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
                <div key={product.id} className="bg-white p-4 rounded-lg shadow flex flex-col h-full">
                    <div className="flex justify-center mb-6 flex-grow">
                        <img src={product.image} alt={product.name} className="h-35 w-48 object-cover" />
                    </div>
                    <div className="flex flex-col mt-auto">

                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-600 mb-2">{product.description}</p>
                        <p className="text-lg font-bold mb-4">RM{product.price.toFixed(2)}</p>
                        <button
                            onClick={() => showProductDetails(product, product.image)}
                            className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center"
                        >
                            <View className="top-8 left-16" />
                            Click me
                        </button>

                    </div>
                </div>
            ))}

            {isModalOpen && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex justify-center mb-6 flex-grow">
                            <img src={selectedProduct.image} alt={selectedProduct.name} className="h-35 w-48 object-cover" />
                        </div>
                        Description

                        <p>{selectedProduct.description}</p>
                        <p className="mt-2 font-bold">RM{selectedProduct.price}</p>
                        <button
                            onClick={() => handleAddToCart(selectedProduct)}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center"
                        >
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Add to Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
