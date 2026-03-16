import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Wishlist() {
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
