import { Package, Wallet, Heart, Bell, ShoppingBag, Bell as BellIcon, MapPin } from "lucide-react";

interface OverviewProps {
  onNavigate: (tab: string) => void;
}

const QUICK_LINKS = [
  { label: "My Orders", icon: Package, tab: "orders" },
  { label: "Wishlist", icon: Heart, tab: "wishlist" },
  { label: "Addresses", icon: MapPin, tab: "addresses" },
  { label: "Wallet", icon: Wallet, tab: "wallet" },
  { label: "Notifications", icon: BellIcon, tab: "notifications" },
  { label: "Account settings", icon: ShoppingBag, tab: "account" },
];

export default function Overview({ onNavigate }: OverviewProps) {
  return (
    <div className="p-6 md:p-8">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="font-heading font-extrabold text-2xl text-slate-900 mb-1">Welcome back</h1>
        <p className="text-sm text-slate-500">Manage your orders, wishlist, addresses, wallet, and account from here.</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {/* Orders */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#6c2bd9]/30 hover:shadow-md transition-all cursor-pointer" onClick={() => onNavigate("orders")}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
              <Package className="w-4 h-4 text-slate-600" />
            </div>
            <span className="text-sm font-semibold text-slate-500">Orders</span>
          </div>
          <p className="font-heading font-black text-3xl text-slate-900 mb-3">3</p>
          <button className="text-[#6c2bd9] text-xs font-bold hover:underline">View orders</button>
        </div>

        {/* Wallet */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#6c2bd9]/30 hover:shadow-md transition-all cursor-pointer" onClick={() => onNavigate("wallet")}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-slate-600" />
            </div>
            <span className="text-sm font-semibold text-slate-500">Wallet balance</span>
          </div>
          <p className="font-heading font-black text-3xl text-slate-900 mb-3">৳5,420</p>
          <button className="text-[#6c2bd9] text-xs font-bold hover:underline">Top up</button>
        </div>

        {/* Wishlist */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#6c2bd9]/30 hover:shadow-md transition-all cursor-pointer" onClick={() => onNavigate("wishlist")}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
              <Heart className="w-4 h-4 text-slate-600" />
            </div>
            <span className="text-sm font-semibold text-slate-500">Wishlist</span>
          </div>
          <p className="font-heading font-black text-3xl text-slate-900 mb-3">3 <span className="text-xl text-slate-400 font-semibold">items</span></p>
          <button className="text-[#6c2bd9] text-xs font-bold hover:underline">View wishlist</button>
        </div>

        {/* Notifications */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#6c2bd9]/30 hover:shadow-md transition-all cursor-pointer" onClick={() => onNavigate("notifications")}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
              <Bell className="w-4 h-4 text-slate-600" />
            </div>
            <span className="text-sm font-semibold text-slate-500">Notifications</span>
          </div>
          <p className="font-heading font-black text-3xl text-slate-900 mb-3">2 <span className="text-xl text-slate-400 font-semibold">unread</span></p>
          <button className="text-[#6c2bd9] text-xs font-bold hover:underline">View all</button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="font-heading font-bold text-lg text-slate-900 mb-5">Quick links</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {QUICK_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.tab}
                onClick={() => onNavigate(link.tab)}
                className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg hover:border-[#6c2bd9]/30 hover:bg-[#6c2bd9]/5 transition-all text-left group"
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-[#6c2bd9]/10 transition-colors">
                  <Icon className="w-4 h-4 text-slate-500 group-hover:text-[#6c2bd9]" />
                </div>
                <span className="text-sm font-semibold text-slate-700 group-hover:text-[#6c2bd9] transition-colors">{link.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
