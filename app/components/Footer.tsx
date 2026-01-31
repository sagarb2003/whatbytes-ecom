import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-2">
            <div className="mx-auto px-4 grid grid-cols-1 gap-4 text-center">
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
                    <div className="flex gap-4 justify-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-blue-500">
                            <Facebook size={18} />
                        </div>
                        <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-blue-300">
                            <Twitter size={18} />
                        </div>
                        <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-pink-500">
                            <Instagram size={18} />
                        </div>
                    </div>
                </div>
                <div>
                    <p className="mt-2 text-md text-slate-500">© 2026 WhatByesEcom</p>
                </div>
            </div>
        </footer>
    );
}