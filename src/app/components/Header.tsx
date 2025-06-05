'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/firebase';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
    const [user, setUser] = useState<User | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        setMenuOpen(false);
        router.push('/login');
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="text-3xl font-extrabold text-orange-600 tracking-wide cursor-pointer select-none">
                    GymBeam Store
                </div>

                <nav className="hidden md:flex items-center gap-6">
                    {user ? (
                        <>
                            <span
                                className="text-gray-800 font-semibold truncate max-w-xs"
                                title={user.email ?? ''}
                            >
                                {user.email}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-orange-500 hover:bg-orange-600 transition-colors duration-300 text-white py-2 px-5 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-orange-500 hover:text-orange-600 font-semibold"
                            >
                                Prihlásenie
                            </Link>
                            <Link
                                href="/register"
                                className="text-orange-500 hover:text-orange-600 font-semibold"
                            >
                                Registrácia
                            </Link>
                        </>
                    )}
                </nav>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-orange-600 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded"
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                >
                    {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-white shadow-md border-t border-gray-200 px-6 py-4 flex flex-col gap-4">
                    {user ? (
                        <>
                            <span
                                className="text-gray-800 font-semibold truncate max-w-full"
                                title={user.email ?? ''}
                            >
                                {user.email}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-orange-500 hover:bg-orange-600 transition-colors duration-300 text-white py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-orange-500 hover:text-orange-600 font-semibold"
                                onClick={() => setMenuOpen(false)}
                            >
                                Prihlásenie
                            </Link>
                            <Link
                                href="/register"
                                className="text-orange-500 hover:text-orange-600 font-semibold"
                                onClick={() => setMenuOpen(false)}
                            >
                                Registrácia
                            </Link>
                        </>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;