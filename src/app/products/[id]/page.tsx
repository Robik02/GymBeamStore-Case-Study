'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import { motion } from 'framer-motion';

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    category: string;
}

const ProductDetailPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/login');
            } else {
                fetchProduct();
            }
        });

        const fetchProduct = async () => {
            try {
                const res = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        return () => unsubscribe();
    }, [id, router]);


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <motion.div
                    className="text-gray-600 text-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                >
                    Loading product details...
                </motion.div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center mt-10 text-red-600 text-lg font-semibold">
                Product not found!
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="min-h-screen bg-gray-100 px-6 py-10 md:px-16"
        >
            <button
                onClick={() => router.back()}
                className="mb-6 text-orange-600 font-medium hover:underline transition-colors"
            >
                ← Back to our products
            </button>

            <div className="bg-white rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <div className="flex justify-center items-center">
                    <motion.img
                        src={product.image}
                        alt={product.title}
                        className="max-h-[400px] w-full object-contain rounded-lg shadow-md"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4 }}
                    />
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-bold mb-4 text-gray-900">{product.title}</h1>
                        <p className="text-gray-700 text-base leading-relaxed mb-6">{product.description}</p>
                        <p className="text-sm text-gray-500 mb-4">
                            Category:{' '}
                            <span className="capitalize font-medium text-orange-600">{product.category}</span>
                        </p>
                    </div>

                    <div>
                        <p className="text-3xl font-bold text-orange-600 mb-6">${product.price.toFixed(2)}</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => alert('Added to cart!')}
                            className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded shadow-lg transition duration-300"
                        >
                            Add to cart
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductDetailPage;