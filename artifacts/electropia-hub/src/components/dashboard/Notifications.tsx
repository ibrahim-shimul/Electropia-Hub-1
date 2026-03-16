import { useState } from "react";
import { Package, CreditCard, Tag, Bell, X } from "lucide-react";

const NOTIFICATIONS = [
  {
    id: 1,
    title: "Order shipped",
    message: "Your order #123456 has been shipped.",
    time: "2 hours ago",
    link: "View Order",
    icon: Package,
    category: "Orders",
    unread: true,
  },
  {
    id: 2,
    title: "Payment received",
    message: "We received your payment of ৳47,070.",
    time: "1 day ago",
    link: null,
    icon: CreditCard,
    category: "Payments",
    unread: false,
  },
  {
    id: 3,
    title: "Flash deal",
    message: "Up to 30% off on selected electronics. Ends tonight.",
    time: "2 days ago",
    link: "View Deal",
    icon: Tag,
    category: "Deals",
    unread: true,
  },
  {
    id: 4,
    title: "New promo code",
    message: "Use SAVE10 for 10% off your next order.",
    time: "3 days ago",
    link: null,
    icon: Bell,
    category: "Promotions",
    unread: false,
  },
];

const TABS = ["All", "Unread", "Orders", "Payments", "Deals", "Promotions", "System"];

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("All");
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const filtered = notifications.filter(n => {
    if (activeTab === "All") return true;
    if (activeTab === "Unread") return n.unread;
    return n.category === activeTab;
  });

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const dismiss = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-heading font-extrabold text-2xl text-slate-900">Notifications</h1>
        <button
          onClick={markAllRead}
          className="text-sm font-semibold text-[#6c2bd9] hover:underline"
        >
          Mark all as read
        </button>
      </div>
      <p className="text-sm text-slate-500 mb-6">{unreadCount} unread</p>

      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto mb-6 border-b border-slate-200">
        {TABS.map(tab => (
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

      {/* Notification list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Bell className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No notifications here</p>
          </div>
        ) : (
          filtered.map(note => {
            const Icon = note.icon;
            return (
              <div
                key={note.id}
                className={`flex gap-4 p-5 rounded-xl border transition-colors ${
                  note.unread ? "bg-white border-slate-200" : "bg-white border-slate-100"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-1">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      {note.title}
                      {note.unread && <span className="w-2 h-2 rounded-full bg-blue-500 inline-block shrink-0"></span>}
                    </h4>
                  </div>
                  <p className="text-sm text-slate-500 mb-1">{note.message}</p>
                  <p className="text-xs text-slate-400 mb-1">{note.time}</p>
                  {note.link && (
                    <button className="text-xs font-bold text-[#6c2bd9] hover:underline">{note.link}</button>
                  )}
                </div>
                <button
                  onClick={() => dismiss(note.id)}
                  className="text-slate-300 hover:text-slate-500 transition-colors shrink-0 mt-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
