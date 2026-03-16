import { Search, ShoppingCart, User, Heart, ChevronDown, MapPin, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";

export default function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><PhoneCall className="w-3 h-3" /> +880 1622 222 222</span>
          <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> Store Locator</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/seller" className="hover:text-white transition-colors">Become a Seller</Link>
          <Link href="/track" className="hover:text-white transition-colors">Track Order</Link>
          <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
            English <ChevronDown className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl leading-none">e</div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-slate-900">electropia</span>
            </div>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl relative">
            <Input 
              type="text" 
              placeholder="Search for products, categories..." 
              className="w-full pl-4 pr-12 py-5 rounded-full border-slate-200 focus-visible:ring-primary/20 bg-slate-50"
            />
            <Button size="icon" className="absolute right-1 top-1 rounded-full w-8 h-8 bg-primary hover:bg-primary/90">
              <Search className="w-4 h-4 text-white" />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 shrink-0 ml-auto">
            <Link href="/dashboard">
              <div className="flex items-center gap-2 cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <User className="w-5 h-5 text-slate-700 group-hover:text-primary" />
                </div>
                <div className="hidden md:block text-sm">
                  <p className="text-slate-500 text-xs leading-none mb-1">Welcome</p>
                  <p className="font-semibold text-slate-900 leading-none group-hover:text-primary">John Doe</p>
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <Link href="/wishlist">
                <div className="relative w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors group">
                  <Heart className="w-5 h-5 text-slate-700 group-hover:text-primary" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full">0</span>
                </div>
              </Link>
              <Link href="/cart">
                <div className="relative w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors group">
                  <ShoppingCart className="w-5 h-5 text-slate-700 group-hover:text-primary" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full">3</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 hidden md:block">
        <nav className="flex items-center gap-8 py-3 text-sm font-medium text-slate-700">
          <Link href="/category/air-conditioner" className="hover:text-primary transition-colors py-1 border-b-2 border-transparent hover:border-primary">Air Conditioner</Link>
          <Link href="/category/home-appliances" className="hover:text-primary transition-colors py-1 border-b-2 border-transparent hover:border-primary">Home Appliances</Link>
          <Link href="/category/kitchen-appliances" className="hover:text-primary transition-colors py-1 border-b-2 border-transparent hover:border-primary">Kitchen Appliances</Link>
          <Link href="/category/tv-audio" className="hover:text-primary transition-colors py-1 border-b-2 border-transparent hover:border-primary">TV & Audio/Visual</Link>
          <Link href="/group-deals" className="text-rose-500 hover:text-rose-600 transition-colors py-1 flex items-center gap-1 font-bold ml-auto">
            🔥 Group Deals
          </Link>
        </nav>
      </div>
    </header>
  );
}
