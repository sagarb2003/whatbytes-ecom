'use client';

import { Product } from '@/types';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { addToCart, getItemQuantity, updateCartQuantity } from '@/lib/cart';
import { useState, useEffect } from 'react';

interface AddToCartProps {
    product: Product;
}

export default function AddToCart({ product}: AddToCartProps) {
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        setQuantity(getItemQuantity(product.id));

        const handleUpdate = () => {
            setQuantity(getItemQuantity(product.id));
        };

        window.addEventListener('cart-updated', handleUpdate);
        return () => window.removeEventListener('cart-updated', handleUpdate);
    }, [product.id]);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
    };

    const handleUpdateQuantity = (e: React.MouseEvent, newQty: number) => {
        e.preventDefault();
        e.stopPropagation();
        updateCartQuantity(product.id, newQty);
    };

    if (quantity > 0) {
        return (
            <div className={`flex items-center justify-between gap-2`}>
                <div className="flex items-center border border-slate-200 rounded overflow-hidden bg-white shadow-sm">
                    <button
                        onClick={(e) => handleUpdateQuantity(e, quantity - 1)}
                        className="p-2 hover:bg-slate-100 transition-colors text-slate-600 border-r border-slate-100"
                        aria-label="Decrease quantity"
                    >
                        <Minus size={16} />
                    </button>
                    <span className="w-10 text-center font-bold text-slate-800">{quantity}</span>
                    <button
                        onClick={(e) => handleUpdateQuantity(e, quantity + 1)}
                        className="p-2 hover:bg-slate-100 transition-colors text-slate-600 border-l border-slate-100"
                        aria-label="Increase quantity"
                    >
                        <Plus size={16} />
                    </button>
                </div>
                <div className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 animate-in fade-in zoom-in duration-300">
                    In Cart
                </div>
            </div>
        );
    }

    return (
        <button
            onClick={handleAddToCart}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm hover:shadow-md`}
        >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
        </button>
    );
}