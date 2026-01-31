import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import AddToCart from './AddToCart';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-slate-100 group">
            <Link href={`/product/${product.id}`} className="block relative aspect-square w-full bg-gray-50 overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                />
            </Link>

            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {product.category}
                    </span>
                </div>
                <Link href={`/product/${product.id}`}>
                    <h3 className="font-bold text-lg text-slate-800 mb-1 line-clamp-1 hover:text-blue-600 transition-colors">
                        {product.title}
                    </h3>
                </Link>
                <div className="flex items-center gap-1.5 mb-4">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                className={`fill-current ${i < Math.floor(product.rating || 0) ? "text-amber-400" : "text-slate-200"}`}
                            />
                        ))}
                    </div>
                    <span className="text-xs font-semibold text-slate-400">({product.rating})</span>
                </div>

                <div className="mt-auto">
                    <div className="text-2xl font-black text-slate-900 mb-4">${product.price}</div>
                    <AddToCart product={product} />
                </div>
            </div>
        </div>
    );
}

