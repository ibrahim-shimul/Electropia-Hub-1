import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, Truck } from "lucide-react";
import { Link } from "wouter";

const MOCK_ORDERS = [
  {
    id: "123456",
    date: "Feb 5, 2025",
    total: 47070,
    status: "Delivered",
    itemCount: 3,
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=80&h=80",
      "https://images.unsplash.com/photo-1542728928-1413d1894ed1?auto=format&fit=crop&q=80&w=80&h=80",
    ],
  },
  {
    id: "123455",
    date: "Feb 3, 2025",
    total: 15200,
    status: "Shipped",
    itemCount: 2,
    images: [
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=80&h=80",
    ],
  },
  {
    id: "123454",
    date: "Feb 1, 2025",
    total: 8990,
    status: "Pending",
    itemCount: 1,
    images: [
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=80&h=80",
    ],
  },
];

const STATUS_TABS = ["All", "Pending", "Confirmed", "Shipped", "Delivered", "Cancelled", "Returned"];

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "Delivered": return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "Shipped": return "bg-blue-100 text-blue-700 border-blue-200";
    case "Pending": return "bg-amber-100 text-amber-700 border-amber-200";
    case "Cancelled": return "bg-rose-100 text-rose-700 border-rose-200";
    default: return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

export default function Orders() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = activeTab === "All"
    ? MOCK_ORDERS
    : MOCK_ORDERS.filter(o => o.status === activeTab);

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-heading font-extrabold text-2xl text-slate-900">My Orders</h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 border border-slate-200 bg-white rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Last 30 days <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
          <button className="flex items-center gap-1.5 border border-slate-200 bg-white rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Newest <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>
      <p className="text-sm text-slate-500 mb-6">{MOCK_ORDERS.length} orders</p>

      {/* Status Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto mb-6 border-b border-slate-200">
        {STATUS_TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "border-[#6c2bd9] text-[#6c2bd9] bg-[#6c2bd9]/5"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="font-semibold text-lg">No orders found</p>
          </div>
        ) : (
          filtered.map(order => (
            <div key={order.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
              <div className="flex flex-wrap items-start gap-4">
                {/* Images */}
                <div className="flex gap-2 shrink-0">
                  {order.images.map((img, i) => (
                    <div key={i} className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-lg overflow-hidden">
                      <img src={img} alt="" className="w-full h-full object-contain p-1" />
                    </div>
                  ))}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-bold text-slate-900 text-sm">Order #{order.id}</span>
                    <Badge variant="outline" className={`text-[11px] font-bold px-2 py-0 ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-0.5">{order.itemCount} {order.itemCount === 1 ? "item" : "items"} · Placed {order.date}</p>
                  <p className="font-heading font-extrabold text-lg text-slate-900">৳{order.total.toLocaleString()}</p>
                </div>

                {/* Date + Actions */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-xs text-slate-400 font-medium">{order.date}</span>
                  <div className="flex items-center gap-2">
                    {(order.status === "Shipped" || order.status === "Delivered") && (
                      <Button variant="outline" size="sm" className="h-8 text-xs font-bold border-slate-200 text-slate-700 hover:bg-slate-50 gap-1.5">
                        <Truck className="w-3 h-3" /> Track
                      </Button>
                    )}
                    {order.status === "Delivered" && (
                      <Button variant="outline" size="sm" className="h-8 text-xs font-bold border-slate-200 text-slate-700 hover:bg-slate-50">
                        Return
                      </Button>
                    )}
                    {order.status === "Pending" && (
                      <Button variant="outline" size="sm" className="h-8 text-xs font-bold border-rose-200 text-rose-600 hover:bg-rose-50">
                        Cancel
                      </Button>
                    )}
                    <Link href={`/order/${order.id}`}>
                      <Button size="sm" className="h-8 text-xs font-bold bg-[#6c2bd9] hover:bg-[#5821b0] gap-1">
                        Details <span className="text-purple-200">›</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
