import { useState, useEffect } from "react";
import { LayoutDashboard, Package, Heart, MapPin, Wallet, Bell, UserCog, LogOut, Users } from "lucide-react";
import Overview from "@/components/dashboard/Overview";
import Orders from "@/components/dashboard/Orders";
import WalletTab from "@/components/dashboard/Wallet";
import Wishlist from "@/components/dashboard/Wishlist";
import Addresses from "@/components/dashboard/Addresses";
import Notifications from "@/components/dashboard/Notifications";
import AccountSettings from "@/components/dashboard/AccountSettings";
import MyGroupDeals from "@/components/dashboard/MyGroupDeals";
import { useRoute, useLocation } from "wouter";

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
