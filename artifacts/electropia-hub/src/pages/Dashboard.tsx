import { useState, useEffect } from "react";
import { LayoutDashboard, Package, Heart, MapPin, Wallet, Bell, UserCog, LogOut, Users, Clock, Flame } from "lucide-react";
import Overview from "@/components/dashboard/Overview";
import Orders from "@/components/dashboard/Orders";
import WalletTab from "@/components/dashboard/Wallet";
import Wishlist from "@/components/dashboard/Wishlist";
import Addresses from "@/components/dashboard/Addresses";
import Notifications from "@/components/dashboard/Notifications";
import AccountSettings from "@/components/dashboard/AccountSettings";
import MyGroupDeals from "@/components/dashboard/MyGroupDeals";
import { Progress } from "@/components/ui/progress";
import { useRoute, useLocation } from "wouter";

const ACTIVE_GROUP_DEAL = {
  id: "GD-001",
  product: {
    name: "SAFE E18KINV Inverter Split AC - 1.5 Ton",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=100&h=100",
    dealPrice: 45000,
    originalPrice: 47999,
  },
  targetCustomers: 50,
  currentCustomers: 45,
  endsIn: "14h 20m",
};

export default function Dashboard() {
  const [, params] = useRoute("/dashboard/:tab?");
  const [, setLocation] = useLocation();
  const urlTab = params?.tab ? decodeURIComponent(params.tab) : "overview";

  const [activeTab, setActiveTab] = useState(urlTab);

  useEffect(() => {
    setActiveTab(urlTab);
  }, [urlTab]);

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "orders", label: "Orders", icon: Package },
    { id: "group_deals", label: "My Group Deals", icon: Users, badge: "1 Active" },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "account", label: "Account", icon: UserCog },
  ];

  const handleTabClick = (tabId: string) => {
    setLocation(`/dashboard/${encodeURIComponent(tabId)}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-0 pb-12 mt-0 -mx-4 sm:-mx-6 lg:-mx-8">
      {/* Sidebar */}
      <aside className="w-full md:w-56 shrink-0 border-r border-slate-200 md:min-h-[calc(100vh-120px)]">
        <nav className="py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <div key={item.id} className="px-3 my-0.5">
                <button
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold transition-all rounded-lg ${
                    isActive
                      ? "bg-[#6c2bd9] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                  {item.label}
                  {item.badge && (
                    <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isActive ? "bg-white/20 text-white" : "bg-purple-100 text-purple-700"}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              </div>
            );
          })}

          <div className="mt-4 pt-4 border-t border-slate-100 mx-4">
            <button className="w-full flex items-center gap-3 px-1 py-3 text-sm font-semibold text-slate-500 hover:text-rose-500 transition-colors rounded-lg">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Active Group Deal Widget */}
          <div className="mx-3 mt-2 mb-4">
            <div className="rounded-xl border border-purple-200 bg-gradient-to-b from-purple-50 to-white p-3 shadow-sm">
              {/* Header */}
              <div className="flex items-center gap-1.5 mb-2">
                <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-400" />
                <span className="text-[10px] font-extrabold text-orange-500 uppercase tracking-wide">Active Group Deal</span>
              </div>

              {/* Product row */}
              <div className="flex gap-2 items-start mb-2.5">
                <img
                  src={ACTIVE_GROUP_DEAL.product.image}
                  alt={ACTIVE_GROUP_DEAL.product.name}
                  className="w-11 h-11 rounded-lg object-cover border border-slate-100 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[11px] font-bold text-slate-800 leading-tight line-clamp-2 mb-1">
                    {ACTIVE_GROUP_DEAL.product.name}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[13px] font-extrabold text-[#6c2bd9]">
                      ৳ {ACTIVE_GROUP_DEAL.product.dealPrice.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400 line-through">
                      ৳ {ACTIVE_GROUP_DEAL.product.originalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {ACTIVE_GROUP_DEAL.currentCustomers}/{ACTIVE_GROUP_DEAL.targetCustomers} joined
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600">
                    {Math.round((ACTIVE_GROUP_DEAL.currentCustomers / ACTIVE_GROUP_DEAL.targetCustomers) * 100)}%
                  </span>
                </div>
                <Progress
                  value={(ACTIVE_GROUP_DEAL.currentCustomers / ACTIVE_GROUP_DEAL.targetCustomers) * 100}
                  className="h-1.5 bg-purple-100 [&>div]:bg-gradient-to-r [&>div]:from-[#6c2bd9] [&>div]:to-purple-400"
                />
              </div>

              {/* Countdown */}
              <div className="flex items-center gap-1 mb-2.5">
                <Clock className="w-3 h-3 text-slate-400" />
                <span className="text-[10px] text-slate-500">Ends in</span>
                <span className="text-[11px] font-extrabold text-rose-500">{ACTIVE_GROUP_DEAL.endsIn}</span>
              </div>

              {/* CTA */}
              <button
                onClick={() => handleTabClick("group_deals")}
                className="w-full py-1.5 rounded-lg bg-[#6c2bd9] hover:bg-[#5821b0] text-white text-[11px] font-bold transition-colors"
              >
                View My Deal →
              </button>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#F8F9FA] min-h-[calc(100vh-120px)]">
        {activeTab === "overview" && <Overview onNavigate={handleTabClick} />}
        {activeTab === "orders" && <Orders />}
        {activeTab === "group_deals" && <MyGroupDeals />}
        {activeTab === "wishlist" && <Wishlist />}
        {activeTab === "addresses" && <Addresses />}
        {activeTab === "wallet" && <WalletTab />}
        {activeTab === "notifications" && <Notifications />}
        {activeTab === "account" && <AccountSettings />}
      </main>
    </div>
  );
}
