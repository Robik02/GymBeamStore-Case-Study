'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
            <h1 className="text-6xl font-bold mb-4 text-orange-600">404</h1>
            <p className="text-xl mb-6">Stránka nebola nájdená.</p>
            <button
                onClick={() => router.push('/')}
                className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded text-lg"
            >
                Späť na domovskú stránku
            </button>
        </div>
    );
}