'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Category } from '@/types';

const CATEGORIES: Category[] = ['All', 'Electronics', 'Clothing', 'Accessories'];

export default function Sidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [maxPrice, setMaxPrice] = useState<number>(1000);

    useEffect(() => {
        const cat = searchParams.get('category');
        const price = searchParams.get('price');

        if (cat) setSelectedCategory(cat);
        else setSelectedCategory('All');

        if (price) {
            const parts = price.split('-');
            if (parts.length === 2) {
                setMaxPrice(Number(parts[1]));
            }
        }
    }, [searchParams]);

    const updateFilters = (category: string, price: number) => {
        const params = new URLSearchParams(searchParams.toString());

        // Category
        if (category && category !== 'All') {
            params.set('category', category);
        } else {
            params.delete('category');
        }
        params.set('price', `0-${price}`);
        router.push(`/?${params.toString()}`);
    };

    const handleCategoryChange = (cat: string) => {
        setSelectedCategory(cat);
        updateFilters(cat, maxPrice);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const price = Number(e.target.value);
        setMaxPrice(price);
    };

    const handlePriceCommit = () => {
        updateFilters(selectedCategory, maxPrice);
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm w-full md:w-64 border border-slate-100 h-fit">
            <div className="mb-8">
                <h3 className="font-bold text-lg mb-4 text-slate-800">Category</h3>
                <div className="space-y-3">
                    {CATEGORIES.map((cat) => (
                        <label key={cat} className="flex items-center cursor-pointer group">
                            <input
                                type="radio"
                                name="category"
                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                checked={selectedCategory === cat}
                                onChange={() => handleCategoryChange(cat)}
                            />
                            <span className={`ml-3 text-slate-600 group-hover:text-blue-600 ${selectedCategory === cat ? 'font-medium text-blue-700' : ''}`}>
                                {cat}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-bold text-lg mb-4 text-slate-800">Price</h3>
                <div className="px-1">
                    <input
                        type="range"
                        min="0"
                        max="2000"
                        step="10"
                        value={maxPrice}
                        onChange={handlePriceChange}
                        onMouseUp={handlePriceCommit}
                        onTouchEnd={handlePriceCommit}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between mt-2 text-sm text-slate-500 font-medium">
                        <span>$0</span>
                        <span>${maxPrice}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
