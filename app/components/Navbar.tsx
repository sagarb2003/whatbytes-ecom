'use client';

import Link from 'next/link';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect } from 'react';
import { getCartTotalItems } from '@/lib/cart';

export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [cartCount, setCartCount] = useState(0);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        setCartCount(getCartTotalItems());
        const handleUpdate = () => {
            setCartCount(getCartTotalItems());
        };
        window.addEventListener('cart-updated', handleUpdate);
        window.addEventListener('storage', handleUpdate); 
        return () => {
            window.removeEventListener('cart-updated', handleUpdate);
            window.removeEventListener('storage', handleUpdate);
        };
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (searchQuery) {
            params.set('search', searchQuery);
        } else {
            params.delete('search');
        }
        router.push(`/?${params.toString()}`);
    };

    return (
        <nav className="bg-blue-700 text-white sticky top-0 z-50 shadow-md">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
                <Link href="/" className="text-2xl font-bold tracking-tight">
                    Logo
                </Link>
                <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl relative">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="w-full py-2 pl-10 pr-4 rounded bg-blue-800 text-white placeholder-blue-200 border border-transparent focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-blue-900/50 transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-200" />
                </form>

                <div className="flex items-center gap-4">
                    <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
                        <ShoppingCart className="w-6 h-6" />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {cartCount}
                        </span>
                        <span className="ml-2 hidden sm:inline font-medium">Cart</span>
                    </div>
                </div>
            </div>

            {/* Mobile Search Bar - Visible only on small screens */}
            <div className="md:hidden px-4 pb-3">
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full py-2 pl-10 pr-4 rounded bg-blue-800 text-white placeholder-blue-300 focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
                </form>
            </div>
        </nav>
    );
}