'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/firebase';

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
          <p className="text-lg text-gray-600 animate-pulse">Načítavam používateľa...</p>
        </div>
    );
  }

  return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6 text-center">
        <h1 className="text-4xl font-bold mb-6 text-orange-600">Vitaj v GymBeam Store!</h1>

        {user ? (
            <>
              <p className="mb-4 text-gray-700">
                Prihlásený ako: <strong>{user.email}</strong>
              </p>
              <button
                  onClick={() => router.push('/products')}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg text-lg shadow transition-transform hover:scale-105"
              >
                Prejsť na produkty
              </button>
            </>
        ) : (
            <>
              <p className="mb-4 text-gray-700">Nie si prihlásený.</p>
              <button
                  onClick={() => router.push('/login')}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg text-lg shadow transition-transform hover:scale-105"
              >
                Prihlásiť sa
              </button>
            </>
        )}
      </div>
  );
}