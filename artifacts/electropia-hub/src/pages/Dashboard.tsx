import { useState, useEffect } from "react";
import { User, Package, Wallet, Heart, Bell, Users, LogOut, Settings } from "lucide-react";
import Profile from "@/components/dashboard/Profile";
import Orders from "@/components/dashboard/Orders";
import WalletTab from "@/components/dashboard/Wallet";
import Wishlist from "@/components/dashboard/Wishlist";
import Notifications from "@/components/dashboard/Notifications";
import MyGroupDeals from "@/components/dashboard/MyGroupDeals";
import { useRoute, useLocation } from "wouter";

export default function Dashboard() {
  const [, params] = useRoute("/dashboard/:tab?");
  const [, setLocation] = useLocation();
  const urlTab = params?.tab ? decodeURIComponent(params.tab) : "profile";

  const [activeTab, setActiveTab] = useState(urlTab);

  useEffect(() => {
    setActiveTab(urlTab);
  }, [urlTab]);

  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "group_deals", label: "My Group Deals", icon: Users },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleTabClick = (tabId: string) => {
    setLocation(`/dashboard/${encodeURIComponent(tabId)}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 pb-12 mt-6">
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-white rounded-xl border border-slate-200 p-4 sticky top-24">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-heading font-bold text-xl">
              JD
            </div>
            <div>
              <h3 className="font-bold text-slate-900">John Doe</h3>
              <p className="text-xs text-slate-500">+880 1711-000000</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                    isActive 
                      ? "bg-primary text-white shadow-md shadow-primary/20" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  {item.label}
                  {item.id === "group_deals" && <span className="ml-auto bg-purple-100 text-purple-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">1 Active</span>}
                </button>
              );
            })}
          </nav>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[600px]">
        {activeTab === "profile" && <Profile />}
        {activeTab === "orders" && <Orders />}
        {activeTab === "group_deals" && <MyGroupDeals />}
        {activeTab === "wallet" && <WalletTab />}
        {activeTab === "wishlist" && <Wishlist />}
        {activeTab === "notifications" && <Notifications />}
        {activeTab === "settings" && (
          <div className="p-6 md:p-8">
            <h2 className="font-heading font-extrabold text-2xl text-slate-900 mb-6">Account Settings</h2>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500">
              Settings options will be available here soon.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
