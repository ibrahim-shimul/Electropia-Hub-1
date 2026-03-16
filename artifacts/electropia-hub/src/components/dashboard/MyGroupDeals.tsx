import { Users, Clock, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";

const MOCK_GROUP_DEALS = [
  {
    id: "GD-001",
    product: {
      name: "SAFE E18KINV Intelligent Inverter Split AC - 1.5 Ton",
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=100&h=100",
      dealPrice: 45000,
      originalPrice: 47999,
    },
    status: "active", // active, success, failed
    joinedAt: "15 Nov 2023, 10:30 AM",
    depositPaid: 500,
    targetCustomers: 50,
    currentCustomers: 45,
    endsIn: "14h 20m 45s"
  },
  {
    id: "GD-002",
    product: {
      name: "Philips Essential Airfryer HD9252/90",
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=100&h=100",
      dealPrice: 10500,
      originalPrice: 12500,
    },
    status: "success", 
    joinedAt: "10 Nov 2023, 02:15 PM",
    depositPaid: 200,
    targetCustomers: 20,
    currentCustomers: 20,
    endsIn: "Ended"
  },
  {
    id: "GD-003",
    product: {
      name: "LG 320L Top Mount Refrigerator",
      image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&q=80&w=100&h=100",
      dealPrice: 40000,
      originalPrice: 45000,
    },
    status: "failed", 
    joinedAt: "05 Nov 2023, 09:00 AM",
    depositPaid: 500,
    targetCustomers: 30,
    currentCustomers: 12,
    endsIn: "Ended"
  }
];

export default function MyGroupDeals() {
  return (
    <div className="p-6 md:p-8">
      <h2 className="font-heading font-extrabold text-2xl text-slate-900 mb-6">My Group Deals</h2>

      <div className="space-y-6">
        {MOCK_GROUP_DEALS.map((deal) => {
          const progress = (deal.currentCustomers / deal.targetCustomers) * 100;
          const isSuccess = deal.status === "success";
          const isFailed = deal.status === "failed";
          const isActive = deal.status === "active";

          return (
            <div key={deal.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
              {/* Header Status Bar */}
              <div className={`px-4 py-3 flex items-center justify-between border-b ${
                isActive ? 'bg-purple-50 border-purple-100' : 
                isSuccess ? 'bg-emerald-50 border-emerald-100' : 
                'bg-rose-50 border-rose-100'
              }`}>
                <div className="flex items-center gap-2">
                  <Badge className={`font-bold ${
                    isActive ? 'bg-purple-600 hover:bg-purple-600 text-white' : 
                    isSuccess ? 'bg-emerald-600 hover:bg-emerald-600 text-white' : 
                    'bg-rose-600 hover:bg-rose-600 text-white'
                  }`}>
                    {isActive ? 'IN PROGRESS' : isSuccess ? 'DEAL SUCCESSFUL' : 'DEAL FAILED'}
                  </Badge>
                  <span className="text-xs font-semibold text-slate-600 ml-2">Deal ID: {deal.id}</span>
                </div>
                {isActive && (
                  <div className="text-sm font-bold text-purple-700 flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> Ends in {deal.endsIn}
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col md:flex-row gap-6">
                {/* Product Info */}
                <div className="flex gap-4 md:w-1/2">
                  <div className="w-20 h-20 bg-slate-50 rounded-lg p-2 shrink-0 border border-slate-100">
                    <img src={deal.product.image} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-bold text-slate-900 mb-1 leading-tight line-clamp-2">{deal.product.name}</h4>
                    <div className="flex items-end gap-2 mb-1">
                      <span className="font-extrabold text-[#6c2bd9]">৳{deal.product.dealPrice.toLocaleString()}</span>
                      <span className="text-xs text-slate-400 line-through">৳{deal.product.originalPrice.toLocaleString()}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Deposit Paid: <strong className="text-slate-700">৳{deal.depositPaid}</strong></p>
                  </div>
                </div>

                {/* Tracking & Actions */}
                <div className="md:w-1/2 flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                  
                  {isActive && (
                    <>
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span className="text-slate-700 flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {deal.currentCustomers} / {deal.targetCustomers} Joined</span>
                        <span className="text-purple-600">{deal.targetCustomers - deal.currentCustomers} more needed</span>
                      </div>
                      <Progress value={progress} className="h-2 mb-4 bg-slate-100 [&>div]:bg-purple-600" />
                      <div className="flex gap-2">
                        <Button className="flex-1 bg-white border border-[#6c2bd9] text-[#6c2bd9] hover:bg-purple-50 h-9 text-xs">
                          Share with friends
                        </Button>
                      </div>
                    </>
                  )}

                  {isSuccess && (
                    <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100 text-emerald-800">
                      <div className="flex items-center gap-2 font-bold mb-1">
                        <CheckCircle2 className="w-5 h-5" /> Target Reached!
                      </div>
                      <p className="text-xs mb-3">Congratulations! The group deal was successful. You can now complete the remaining payment to confirm your order.</p>
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-9 text-xs font-bold">
                        Pay Remaining ৳{(deal.product.dealPrice - deal.depositPaid).toLocaleString()} <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  )}

                  {isFailed && (
                    <div className="bg-rose-50 rounded-lg p-4 border border-rose-100 text-rose-800">
                      <div className="flex items-center gap-2 font-bold mb-1">
                        <AlertCircle className="w-5 h-5" /> Deal Expired
                      </div>
                      <p className="text-xs mb-3">Unfortunately, the target of {deal.targetCustomers} members was not reached before the deadline.</p>
                      <div className="bg-white border border-rose-200 rounded p-2 text-xs font-semibold flex items-center justify-between">
                        <span>Deposit Refund Status:</span>
                        <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Refunded to Wallet</span>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
