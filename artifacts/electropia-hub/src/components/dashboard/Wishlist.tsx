import { ProductCard } from "@/components/ui/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

export default function Wishlist() {
  return (
    <div className="p-6 md:p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-extrabold text-2xl text-slate-900">My Wishlist</h2>
        <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{MOCK_PRODUCTS.length} Items</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 flex-1">
        {MOCK_PRODUCTS.slice(0, 5).map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
