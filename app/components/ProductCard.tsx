'use client';

import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {

    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col border border-slate-100">
            <Link href={`/product/${product.id}`} className="block relative aspect-square w-full bg-gray-50 group">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </Link>

            <div className="p-4 flex flex-col flex-grow">
                <Link href={`/product/${product.id}`}>
                    <h3 className="font-semibold text-lg text-slate-800 mb-1 line-clamp-1 hover:text-blue-600 transition-colors">
                        {product.title}
                    </h3>
                </Link>
                <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={14}
                            className={`fill-current ${i < Math.floor(product.rating || 0) ? "text-yellow-400" : "text-gray-300"}`}
                        />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                </div>

                <div className="mt-auto">
                    <div className="text-xl font-bold text-slate-900 mb-3">${product.price}</div>
                    <button
                        // onClick={() => addItem(product)}
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded transition-colors active:scale-95"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
