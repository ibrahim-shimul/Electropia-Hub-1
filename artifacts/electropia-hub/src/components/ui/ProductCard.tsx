import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Truck, Wrench, CheckCircle } from "lucide-react";
import { Link } from "wouter";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    image: string;
    tags: string[];
    isGroupDeal?: boolean;
    groupPrice?: number;
    groupTarget?: number;
    groupCurrent?: number;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const saveAmount = product.originalPrice - product.price;

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-slate-200 bg-white relative flex flex-col h-full rounded-xl">
      {discount > 0 && (
        <Badge className="absolute top-2 left-2 bg-[#6c2bd9] text-white hover:bg-[#6c2bd9] z-10 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
          {discount}% OFF
        </Badge>
      )}
      
      <CardContent className="p-0 flex flex-col h-full">
        <Link href={`/product/${product.id}`}>
          <div className="relative aspect-[4/3] p-4 bg-gradient-to-b from-blue-50/50 to-white overflow-hidden flex items-center justify-center cursor-pointer">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-[85%] h-[85%] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>

        <div className="p-3.5 flex-1 flex flex-col border-t border-slate-100">
          <div className="flex flex-wrap gap-1 mb-3">
             <span className="text-[9px] font-medium px-1.5 py-0.5 rounded flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-100">
                <Users className="w-2.5 h-2.5" /> Group Deal
             </span>
             <span className="text-[9px] font-medium px-1.5 py-0.5 rounded flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-100">
                <Truck className="w-2.5 h-2.5" /> Free Shipping
             </span>
             <span className="text-[9px] font-medium px-1.5 py-0.5 rounded flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-100">
                <Wrench className="w-2.5 h-2.5" /> Free Installation
             </span>
          </div>
          
          <h3 className="font-heading font-semibold text-[13px] leading-snug text-slate-800 line-clamp-2 mb-2 group-hover:text-[#6c2bd9] transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between mb-3 mt-auto border-b border-dashed border-slate-200 pb-2">
            <span className="text-[10px] text-slate-500">1.5 Ton • Inverter • Energy Saving</span>
            <div className="flex items-center gap-1 text-amber-400 bg-amber-50 px-1.5 py-0.5 rounded">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-[10px] font-bold text-slate-700">{product.rating} <span className="text-slate-400 font-normal">({product.reviews})</span></span>
            </div>
          </div>
          
          <div className="flex items-end justify-between gap-2 mb-3">
             <div>
               <div className="flex items-center gap-1.5 mb-0.5">
                 <span className="text-[11px] text-slate-400 line-through">৳ {product.originalPrice.toLocaleString()}</span>
               </div>
               <span className="font-heading font-extrabold text-[17px] text-slate-900 leading-none">৳ {product.price.toLocaleString()}</span>
             </div>
             <div className="text-[11px] font-bold text-rose-500 bg-rose-50 px-1.5 py-1 rounded">
               Save ৳{saveAmount.toLocaleString()}
             </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-auto">
             <Link href={`/product/${product.id}`}>
               <Button variant="outline" className="w-full text-[11px] h-8 border-[#6c2bd9]/30 text-[#6c2bd9] hover:bg-[#6c2bd9]/5 rounded-md font-bold">
                 View Details
               </Button>
             </Link>
             <Button className="w-full text-[11px] h-8 bg-[#10b981] hover:bg-[#059669] text-white shadow-none rounded-md font-bold group-hover:shadow-md transition-shadow">
               <CheckCircle className="w-3 h-3 mr-1.5" /> In Stock Add
             </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
