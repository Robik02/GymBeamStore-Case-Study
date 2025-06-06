'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import { AnimatePresence, motion } from "framer-motion";

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/login');
            } else {
                setLoading(false);
            }
        });

        const fetchProducts = async () => {
            const res = await fetch('https://fakestoreapi.com/products');
            const data = await res.json();
            setProducts(data);
            setLoading(false);
        };

        fetchProducts();

        return () => unsubscribe();
    }, [router]);

    const handleProductClick = (id: number) => {
        setIsLoading(true);
        setTimeout(() => {
            router.push(`/products/${id}`);
        }, 1500);
    };

    if (loading) {
        return <div className="text-center mt-10 text-gray-700">Loading products...</div>;
    }

    return (
        <>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        className="fixed top-0 left-0 right-0 h-1 bg-orange-500 z-50"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                )}
            </AnimatePresence>

            <div className="min-h-screen p-4 sm:p-6 md:p-10 max-w-7xl mx-auto overflow-x-hidden">
                <h1 className="text-4xl font-extrabold mb-10 text-center text-orange-600 drop-shadow-lg">
                    Our Products
                </h1>

                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <AnimatePresence>
                        {products.map((product) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 30 }}
                                whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(251,146,60,0.4)' }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="bg-white rounded-xl shadow-md p-5 flex flex-col cursor-pointer select-none w-full"
                                onClick={() => handleProductClick(product.id)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleProductClick(product.id);
                                }}
                            >
                                <div className="flex justify-center mb-5">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="h-44 w-full object-contain rounded-lg max-w-full"
                                        loading="lazy"
                                    />
                                </div>
                                <h2 className="font-semibold text-lg text-gray-900 mb-2 truncate">{product.title}</h2>
                                <p className="text-orange-600 font-extrabold text-xl mb-4">${product.price.toFixed(2)}</p>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleProductClick(product.id);
                                    }}
                                    className="mt-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition-colors duration-300"
                                    aria-label={`View product details ${product.title}`}
                                >
                                    Detail
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
};

export default ProductsPage;