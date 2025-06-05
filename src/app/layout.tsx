import './globals.css';
import { ReactNode } from 'react';
import Header from "@/app/components/Header";

export const metadata = {
    title: 'GymBeam Fake Store',
    description: 'Jednoduchá React / Next.js aplikácia pre testovanie',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="sk">
        <body className="bg-gray-100 min-h-screen flex flex-col overflow-x-hidden">
        <Header />
        <main className="flex-grow">{children}</main>
        </body>
        </html>
    );
}