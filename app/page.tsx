import { products } from "@/lib/data";
import Sidebar from "./components/Sidebar";
import ProductCard from "./components/ProductCard";

interface Props {
  searchParams: Promise<{
    category?: string;
    price?: string;
    search?: string;
  }>;
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const category = params.category || 'All';
  const priceParam = params.price || '0-1000';
  const searchQuery = params.search?.toLowerCase() || '';

  // Parse price range
  let maxPrice = 1000;
  if (priceParam) {
    const parts = priceParam.split('-');
    if (parts.length === 2) {
      maxPrice = Number(parts[1]);
    }
  }

  const filteredProducts = products.filter((product) => {
    if (category !== "All" && product.category !== category) return false;
    if (product.price > maxPrice) return false;

    if (searchQuery) {
      return (
        product.title.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery)
      );
    }
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex-shrink-0">
          <Sidebar />
        </aside>

        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-800">Product Listing</h1>
            <p className="text-slate-500 mt-2">
              Found {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-dashed border-slate-300">
              <h3 className="text-xl font-semibold text-slate-700">No products found</h3>
              <p className="text-slate-500 mt-2">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
