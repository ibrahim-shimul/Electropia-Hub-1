import { useState } from "react";
import { Wallet as WalletIcon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const TRANSACTIONS = [
  { date: "2/5/25, 11:20 AM", type: "Credit", desc: "Top up via bkash", amount: "+৳2,000", balanceAfter: "৳5,420", status: "Completed" },
  { date: "2/4/25, 2:30 PM",  type: "Debit",  desc: "Order payment #ORD-8821", amount: "-৳3,420", balanceAfter: "৳3,420", status: "Completed" },
  { date: "2/3/25, 9:15 AM",  type: "Refund", desc: "Refund received for #ORD-8805", amount: "+৳1,200", balanceAfter: "৳6,840", status: "Completed" },
  { date: "2/2/25, 4:00 PM",  type: "Debit",  desc: "Order payment #ORD-8799", amount: "-৳5,640", balanceAfter: "৳5,640", status: "Completed" },
  { date: "2/1/25, 10:30 AM", type: "Credit", desc: "Top up via Nagad", amount: "+৳5,000", balanceAfter: "৳11,280", status: "Completed" },
  { date: "1/28/25, 1:45 PM", type: "Debit",  desc: "Order payment #ORD-8780", amount: "-৳6,280", balanceAfter: "৳6,280", status: "Completed" },
];

const TYPE_TABS = ["All", "Credit", "Debit", "Refunds"];

const getTypeClass = (type: string) => {
  switch (type) {
    case "Credit": return "text-emerald-600 bg-emerald-50 border-emerald-100";
    case "Debit": return "text-rose-600 bg-rose-50 border-rose-100";
    case "Refund": return "text-blue-600 bg-blue-50 border-blue-100";
    default: return "text-slate-600 bg-slate-50 border-slate-100";
  }
};

const getAmountClass = (amount: string) => amount.startsWith("+") ? "text-emerald-600" : "text-rose-600";

export default function WalletTab() {
  const [activeType, setActiveType] = useState("All");

  const filtered = activeType === "All"
    ? TRANSACTIONS
    : TRANSACTIONS.filter(t => t.type === activeType || (activeType === "Refunds" && t.type === "Refund"));

  return (
    <div className="p-6 md:p-8">
      <h1 className="font-heading font-extrabold text-2xl text-slate-900 mb-1">Wallet</h1>
      <p className="text-sm text-slate-500 mb-6">Top up, view balance, and track transactions.</p>

      {/* Balance Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
            <WalletIcon className="w-6 h-6 text-slate-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-0.5">Available Balance</p>
            <p className="font-heading font-black text-3xl text-slate-900">৳5,420</p>
          </div>
        </div>
        <Button className="bg-[#6c2bd9] hover:bg-[#5821b0] font-bold h-10 px-6">Top Up</Button>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-semibold mb-1">Available</p>
          <p className="font-bold text-slate-900">৳5,420</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-semibold mb-1">Pending</p>
          <p className="font-bold text-amber-600">৳200</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-semibold mb-1">Locked</p>
          <p className="font-bold text-slate-900">৳0</p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="font-heading font-bold text-lg text-slate-900 mb-0.5">Transaction History</h2>
          <p className="text-xs text-slate-500">Filter by type, date range, or search by description.</p>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 flex-wrap gap-3">
          <div className="flex items-center gap-1">
            {TYPE_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveType(tab)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${
                  activeType === tab
                    ? "bg-[#6c2bd9] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="date"
              className="border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-600 bg-white focus:outline-none focus:border-[#6c2bd9]"
            />
            <input
              type="date"
              className="border border-slate-200 rounded-md px-2 py-1.5 text-xs text-slate-600 bg-white focus:outline-none focus:border-[#6c2bd9]"
            />
            <input
              type="text"
              placeholder="Search transactions"
              className="border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-600 bg-white focus:outline-none focus:border-[#6c2bd9] w-36"
            />
            <Button variant="outline" size="sm" className="h-7 text-xs font-bold border-slate-200 gap-1.5">
              <Download className="w-3 h-3" /> Export CSV
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">Date & time</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">Type</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">Description</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide text-right">Amount</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide text-right">Balance after</th>
                <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((trx, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4 text-slate-600 text-xs whitespace-nowrap">{trx.date}</td>
                  <td className="px-5 py-4">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${getTypeClass(trx.type)}`}>
                      {trx.type}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-700 text-sm">{trx.desc}</td>
                  <td className={`px-5 py-4 text-right font-bold text-sm ${getAmountClass(trx.amount)}`}>{trx.amount}</td>
                  <td className="px-5 py-4 text-right text-sm font-semibold text-slate-700">{trx.balanceAfter}</td>
                  <td className="px-5 py-4 text-right">
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">{trx.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
