import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownRight, Plus, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const TRANSACTIONS = [
  { id: "TRX-001", date: "15 Nov 2023", desc: "Top up via bKash", amount: 5000, type: "credit" },
  { id: "TRX-002", date: "12 Nov 2023", desc: "Payment for Order ORD-98234", amount: -58900, type: "debit" },
  { id: "TRX-003", date: "10 Nov 2023", desc: "Refund for ORD-98111", amount: 1250, type: "credit" },
  { id: "TRX-004", date: "01 Nov 2023", desc: "Top up via Visa Card", amount: 60000, type: "credit" },
];

export default function WalletTab() {
  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="font-heading font-extrabold text-2xl text-slate-900">My Wallet</h2>
        <Button variant="outline" className="h-9 text-sm font-bold border-slate-200 hover:bg-slate-50">
          <Download className="w-4 h-4 mr-2" /> Download Statement
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="md:col-span-2 rounded-2xl bg-gradient-to-r from-[#312e81] to-[#6c2bd9] p-8 text-white relative overflow-hidden shadow-lg shadow-[#6c2bd9]/20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 flex flex-col h-full justify-between gap-6">
            <div className="flex items-center gap-2 text-indigo-100">
              <WalletIcon className="w-5 h-5" />
              <span className="font-semibold tracking-wide uppercase text-sm">Available Balance</span>
            </div>
            <div>
              <span className="text-4xl md:text-5xl font-heading font-black tracking-tight">৳ 12,450<span className="text-2xl text-indigo-200 font-bold">.00</span></span>
            </div>
            <div className="pt-4 border-t border-white/20 flex gap-4">
               <Dialog>
                 <DialogTrigger asChild>
                   <Button className="bg-white text-[#6c2bd9] hover:bg-slate-100 font-bold px-6">
                     <Plus className="w-4 h-4 mr-1.5" /> Top Up Balance
                   </Button>
                 </DialogTrigger>
                 <DialogContent>
                   <DialogHeader>
                     <DialogTitle>Top Up Wallet</DialogTitle>
                     <DialogDescription>Add funds to your Electropia wallet using MFS or Cards.</DialogDescription>
                   </DialogHeader>
                   <div className="py-4 space-y-4">
                     <div>
                       <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Amount (৳)</label>
                       <Input type="number" placeholder="Enter amount" className="text-lg font-bold" />
                     </div>
                     <div>
                       <label className="text-sm font-semibold text-slate-700 mb-1.5 block">Payment Method</label>
                       <div className="grid grid-cols-3 gap-2">
                         <div className="border border-[#6c2bd9] bg-[#6c2bd9]/5 rounded-lg p-2 text-center cursor-pointer font-bold text-sm text-[#6c2bd9]">bKash</div>
                         <div className="border border-slate-200 hover:border-[#6c2bd9]/50 rounded-lg p-2 text-center cursor-pointer font-bold text-sm text-slate-600 transition-colors">Nagad</div>
                         <div className="border border-slate-200 hover:border-[#6c2bd9]/50 rounded-lg p-2 text-center cursor-pointer font-bold text-sm text-slate-600 transition-colors">Card</div>
                       </div>
                     </div>
                     <Button className="w-full bg-[#6c2bd9] hover:bg-[#5821b0] mt-4 h-11 text-base">Proceed to Pay</Button>
                   </div>
                 </DialogContent>
               </Dialog>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-col gap-4">
           <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 flex-1 flex flex-col justify-center">
             <div className="flex items-center gap-2 text-emerald-700 mb-2">
               <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center"><ArrowUpRight className="w-4 h-4" /></div>
               <span className="font-semibold text-sm">Total Received</span>
             </div>
             <p className="text-2xl font-bold text-slate-900">৳ 66,250</p>
           </div>
           <div className="bg-rose-50 rounded-xl p-5 border border-rose-100 flex-1 flex flex-col justify-center">
             <div className="flex items-center gap-2 text-rose-700 mb-2">
               <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center"><ArrowDownRight className="w-4 h-4" /></div>
               <span className="font-semibold text-sm">Total Spent</span>
             </div>
             <p className="text-2xl font-bold text-slate-900">৳ 58,900</p>
           </div>
        </div>
      </div>

      <h3 className="font-bold text-lg text-slate-800 mb-4">Recent Transactions</h3>
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
            <tr>
              <th className="px-4 py-3">Transaction ID</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {TRANSACTIONS.map((trx) => (
              <tr key={trx.id} className="hover:bg-slate-50/50">
                <td className="px-4 py-4 font-medium text-slate-900">{trx.id}</td>
                <td className="px-4 py-4 text-slate-500">{trx.date}</td>
                <td className="px-4 py-4 text-slate-700">{trx.desc}</td>
                <td className={`px-4 py-4 text-right font-bold ${trx.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                  {trx.type === 'credit' ? '+' : ''}{trx.amount.toLocaleString()} ৳
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
