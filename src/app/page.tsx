'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    const email = localStorage.getItem('userEmail');
    setIsAuthenticated(auth === 'true');
    setUserEmail(email);
  }, []);

  return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
        <h1 className="text-4xl font-bold mb-6 text-orange-600">Vitaj v GymBeam Store!</h1>

        {isAuthenticated ? (
            <>
              <p className="mb-4 text-gray-700">Prihlásený ako: <strong>{userEmail}</strong></p>
              <button
                  onClick={() => router.push('/products')}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded text-lg"
              >
                Prejsť na produkty
              </button>
            </>
        ) : (
            <>
              <p className="mb-4 text-gray-700">Nie si prihlásený.</p>
              <button
                  onClick={() => router.push('/login')}
                  className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded text-lg"
              >
                Prihlásiť sa
              </button>
            </>
        )}
      </div>
  );
}