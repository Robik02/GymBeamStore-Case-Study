'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);

            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
                setLoading(false);
                router.push('/products');
            }, 1500);
        } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('Prihlásenie zlyhalo:', err.message);
            setError('Nesprávny email alebo heslo.');
        } else {
            console.error('Neznáma chyba pri prihlasovaní:', err);
            setError('Vyskytla sa neznáma chyba.');
        }
        setLoading(false);
    }

};

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md relative">
                <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">Prihlásenie</h2>

                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                    disabled={loading}
                />

                <input
                    type="password"
                    placeholder="Heslo"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 p-3 mb-6 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                    disabled={loading}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-orange-500 text-white font-semibold py-3 rounded transition-colors duration-300 ${
                        loading ? 'opacity-60 cursor-not-allowed flex justify-center items-center gap-3' : 'hover:bg-orange-600'
                    }`}
                >
                    {loading && (
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                    )}
                    {loading ? 'Prihlasujem...' : 'Prihlásiť sa'}
                </button>


                {showSuccess && (
                    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg z-50 animate-fadeInOut max-w-xs font-medium"  role="alert">
                        Úspešne prihlásený!
                    </div>
                )}

                <p className="mt-6 text-center text-gray-600 text-sm">
                    Nemáš účet?{' '}
                    <Link href="/register" className="text-orange-500 hover:underline">
                        Zaregistruj sa
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;