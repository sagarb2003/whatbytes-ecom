import { products } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
    const { id } = await params;
    const product = products.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium">
                <ChevronLeft size={20} />
                Back to Products
            </Link>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                    <div className="relative aspect-square md:h-[500px] w-full bg-gray-50 rounded-lg flex items-center justify-center p-8">
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="mb-2">
                            <span className="text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full text-xs uppercase">
                                {product.category}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{product.title}</h1>

                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={20}
                                        className={`fill-current ${i < Math.floor(product.rating || 0) ? "text-yellow-400" : "text-gray-300"}`}
                                    />
                                ))}
                            </div>
                            <span className="text-slate-500 font-medium">({product.rating} Rating)</span>
                        </div>

                        <div className="text-3xl font-bold text-slate-900 mb-6">${product.price}</div>

                        <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                            {product.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
