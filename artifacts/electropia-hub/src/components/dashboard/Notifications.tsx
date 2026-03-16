import { Package, Tag, Info, BellRing } from "lucide-react";

const NOTIFICATIONS = [
  {
    id: 1,
    title: "Order Shipped!",
    message: "Your order ORD-98236 has been shipped and is on its way. Track your package in the Orders section.",
    time: "2 hours ago",
    icon: Package,
    color: "bg-blue-100 text-blue-600",
    read: false
  },
  {
    id: 2,
    title: "Flash Sale Alert: 20% Off ACs",
    message: "Beat the heat! Get up to 20% extra discount on selected Air Conditioners for the next 24 hours.",
    time: "1 day ago",
    icon: Tag,
    color: "bg-rose-100 text-rose-600",
    read: true
  },
  {
    id: 3,
    title: "Wallet Top-up Successful",
    message: "Your wallet has been credited with ৳ 5,000. Current balance is ৳ 12,450.",
    time: "3 days ago",
    icon: Info,
    color: "bg-emerald-100 text-emerald-600",
    read: true
  },
  {
    id: 4,
    title: "Welcome to Electropia!",
    message: "Thank you for joining our platform. Complete your profile to get a 5% welcome discount.",
    time: "1 week ago",
    icon: BellRing,
    color: "bg-purple-100 text-purple-600",
    read: true
  }
];

export default function Notifications() {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-extrabold text-2xl text-slate-900">Notifications</h2>
        <button className="text-sm font-semibold text-[#6c2bd9] hover:underline">Mark all as read</button>
      </div>

      <div className="space-y-4">
        {NOTIFICATIONS.map((note) => (
          <div 
            key={note.id} 
            className={`flex gap-4 p-4 rounded-xl border transition-colors ${note.read ? 'bg-white border-slate-200' : 'bg-indigo-50/50 border-indigo-100'}`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${note.color}`}>
              <note.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 mb-1">
                <h4 className={`font-bold ${note.read ? 'text-slate-800' : 'text-slate-900'}`}>{note.title}</h4>
                <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">{note.time}</span>
              </div>
              <p className={`text-sm ${note.read ? 'text-slate-500' : 'text-slate-600 font-medium'}`}>
                {note.message}
              </p>
            </div>
            {!note.read && (
              <div className="flex items-center justify-center shrink-0">
                <div className="w-2 h-2 rounded-full bg-[#6c2bd9]"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
