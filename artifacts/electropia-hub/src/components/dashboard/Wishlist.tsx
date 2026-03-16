import { useState } from "react";
import { Heart, ShoppingCart, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const DEMO_WISHLIST = [
  {
    id: 1,
    name: "SAFE E18KINV Intelligent Inverter Split AC - 1.5 Ton",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300",
    price: 47999,
    originalPrice: 76000,
    rating: 4.6,
    reviews: 128,
    inStock: true,
    category: "Air Conditioner",
  },
  {
    id: 2,
    name: "Samsung 55\" Crystal 4K UHD Smart TV (CU7700)",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=300&h=300",
    price: 65000,
    originalPrice: 80000,
    rating: 4.8,
    reviews: 214,
    inStock: true,
    category: "TV & Audio/Visual",
  },
  {
    id: 3,
    name: "LG 320L Top Mount Refrigerator with Smart Inverter",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=300&h=300",
    price: 45000,
    originalPrice: 52000,
    rating: 4.5,
    reviews: 87,
    inStock: false,
    category: "Home Appliances",
  },
  {
    id: 4,
    name: "Philips Essential Airfryer HD9252/90 - 4.1L",
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&q=80&w=300&h=300",
    price: 12500,
    originalPrice: 15000,
    rating: 4.7,
    reviews: 345,
    inStock: true,
    category: "Kitchen Appliances",
  },
];

export default function Wishlist() {
  const [items, setItems] = useState(DEMO_WISHLIST);

  const remove = (id: number) => setItems(prev => prev.filter(i => i.id !== id));

  if (items.length === 0) {
    return (
      <div className="p-6 md:p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
          <Heart className="w-10 h-10 text-slate-300" strokeWidth={1.5} />
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-slate-800 mb-2">Your wishlist is empty</h2>
        <p className="text-slate-500 text-sm mb-8 max-w-xs">Save items you like to buy them later.</p>
        <Link href="/">
          <Button className="bg-[#6c2bd9] hover:bg-[#5821b0] font-bold px-8 h-11">
            Start Adding Items
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-heading font-extrabold text-2xl text-slate-900">My Wishlist</h1>
      </div>
      <p className="text-sm text-slate-500 mb-6">{items.length} saved items</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {items.map(item => {
          const discountPct = Math.round((1 - item.price / item.originalPrice) * 100);
          return (
            <div key={item.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
              {/* Image */}
              <div className="relative bg-slate-50 aspect-square overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-2.5 left-2.5 bg-rose-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded">
                  {discountPct}% OFF
                </span>
                <button
                  onClick={() => remove(item.id)}
                  className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{item.category}</p>
                <Link href={`/product/${item.id}`}>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug mb-2 hover:text-[#6c2bd9] transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-3 h-3 ${s <= Math.round(item.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">{item.rating} ({item.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4 mt-auto">
                  <span className="font-heading font-black text-lg text-[#6c2bd9]">৳{item.price.toLocaleString()}</span>
                  <span className="text-xs text-slate-400 line-through">৳{item.originalPrice.toLocaleString()}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-[#6c2bd9] hover:bg-[#5821b0] text-white font-bold text-xs h-9 gap-1.5"
                    disabled={!item.inStock}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    {item.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
