'use client';

import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {doc, setDoc, serverTimestamp} from 'firebase/firestore';
import {auth, db} from '@/firebase';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [validationError, setValidationError] = useState('');

    const router = useRouter();

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (success) {
            timeout = setTimeout(() => {
                router.push('/products');
            }, 2000);
        }
        return () => clearTimeout(timeout);
    }, [success, router]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess('');
        setError('');
        setLoading(true);
        setValidationError('');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setValidationError('Prosím, zadaj platnú emailovú adresu.');
            setLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                createdAt: serverTimestamp(),
            });

            setSuccess('Registrácia bola úspešná!');
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Registrácia zlyhala:', error.message);
                setError(error.message);
            } else {
                console.error('Neznáma chyba pri registrácii:', error);
                setError('Vyskytla sa neznáma chyba.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={handleRegister}
                className="bg-white p-8 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">Registrácia</h2>

                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                {validationError && (
                    <p className="text-red-500 mb-4 text-center font-medium">{validationError}</p>
                )}

                {success && (
                    <div
                        className="fixed bottom-4 right-4 bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg z-50 animate-fadeInOut max-w-xs font-medium"
                        role="alert">
                        {success}
                    </div>
                )}


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
                        loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-orange-600'
                    }`}
                >
                    {loading ? 'Registrujem...' : 'Registrovať sa'}
                </button>

                <p className="mt-6 text-center text-gray-600">
                    Už máte účet?{' '}
                    <Link href="/login" className="text-orange-500 hover:underline">
                        Prihláste sa
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;