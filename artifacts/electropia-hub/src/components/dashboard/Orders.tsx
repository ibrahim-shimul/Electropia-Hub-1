import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Package, Truck, CheckCircle, RotateCcw, AlertCircle, Store } from "lucide-react";
import { Link } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MOCK_ORDERS = [
  {
    id: "ORD-98234",
    date: "12 Oct, 2023",
    total: 101024,
    status: "Processing",
    vendors: [
      {
        storeName: "Tech Gadgets BD",
        status: "Processing",
        items: [
          { name: "Samsung Galaxy A54 5G", qty: 2, price: 42990, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=100&h=100" },
          { name: "Wireless Earbuds Pro", qty: 1, price: 2490, image: "https://images.unsplash.com/photo-1542728928-1413d1894ed1?auto=format&fit=crop&q=80&w=100&h=100" }
        ]
      },
      {
        storeName: "ElectroHub",
        status: "Shipped",
        items: [
          { name: "Power Bank 20000mAh", qty: 3, price: 1890, image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=100&h=100" }
        ]
      }
    ]
  },
  {
    id: "ORD-98235",
    date: "15 Nov, 2023",
    total: 12500,
    status: "Delivered",
    vendors: [
      {
        storeName: "Home Appliances BD",
        status: "Delivered",
        items: [
          { name: "Philips Essential Airfryer", qty: 1, price: 12500, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=100&h=100" }
        ]
      }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered": return "bg-emerald-100 text-emerald-700";
    case "Processing": return "bg-amber-100 text-amber-700";
    case "Shipped": return "bg-blue-100 text-blue-700";
    default: return "bg-slate-100 text-slate-700";
  }
};

export default function Orders() {
  return (
    <div className="p-6 md:p-8">
      <h2 className="font-heading font-extrabold text-2xl text-slate-900 mb-6">Orders & Returns</h2>

      <div className="space-y-6">
        {MOCK_ORDERS.map((order) => (
          <div key={order.id} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            {/* Master Order Header */}
            <div className="bg-slate-50 border-b border-slate-200 p-4 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">Order ID</p>
                  <p className="font-bold text-slate-900">{order.id}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">Date placed</p>
                  <p className="font-semibold text-slate-900">{order.date}</p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">Total amount</p>
                  <p className="font-bold text-[#6c2bd9]">৳ {order.total.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge className={`${getStatusColor(order.status)} border-none font-bold px-3 py-1 shadow-none`}>
                  {order.status}
                </Badge>
                <Link href={`/order/${order.id}`}>
                  <Button variant="outline" className="h-8 text-xs font-bold border-[#6c2bd9] text-[#6c2bd9] hover:bg-purple-50">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>

            {/* Vendor Sub-Orders */}
            <div className="bg-white">
              {order.vendors.map((vendor, vIndex) => (
                <div key={vIndex} className={`${vIndex > 0 ? 'border-t-4 border-slate-100' : ''}`}>
                  {/* Vendor Header */}
                  <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Store className="w-4 h-4 text-slate-400" />
                      <span className="font-bold text-sm text-slate-800">{vendor.storeName}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${getStatusColor(vendor.status)}`}>
                      Package Status: {vendor.status}
                    </span>
                  </div>

                  {/* Vendor Items */}
                  <div className="p-4 space-y-4">
                    {vendor.items.map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-lg p-2 shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <h4 className="font-bold text-slate-900 mb-1 text-sm">{item.name}</h4>
                          <p className="text-xs text-slate-500">Qty: {item.qty} × ৳{item.price.toLocaleString()}</p>
                        </div>
                        <div className="flex flex-col gap-2 shrink-0 justify-center">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" className="h-8 text-xs font-bold border-[#6c2bd9]/30 text-[#6c2bd9] hover:bg-[#6c2bd9]/5">
                                <MapPin className="w-3 h-3 mr-1.5" /> Track Package
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Track Package from {vendor.storeName}</DialogTitle>
                                <DialogDescription>
                                  Order {order.id} • Real-time tracking.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-6 relative">
                                 {/* Tracking Timeline */}
                                 <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-slate-200"></div>
                                 
                                 <div className="space-y-6">
                                   <div className="flex gap-4 relative z-10">
                                     <div className="w-6 h-6 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 shadow-[0_0_0_4px_rgba(255,255,255,1)]">
                                       <CheckCircle className="w-3.5 h-3.5" />
                                     </div>
                                     <div>
                                       <p className="font-bold text-slate-900 text-sm">Order Placed</p>
                                       <p className="text-xs text-slate-500">15 Nov 2023, 10:30 AM</p>
                                     </div>
                                   </div>
                                   
                                   <div className="flex gap-4 relative z-10">
                                     <div className={`w-6 h-6 rounded-full ${vendor.status !== 'Processing' ? 'bg-[#10b981]' : 'bg-[#6c2bd9]'} text-white flex items-center justify-center shrink-0 shadow-[0_0_0_4px_rgba(255,255,255,1)]`}>
                                       {vendor.status !== 'Processing' ? <CheckCircle className="w-3.5 h-3.5" /> : <Package className="w-3.5 h-3.5" />}
                                     </div>
                                     <div>
                                       <p className="font-bold text-slate-900 text-sm">Processing</p>
                                       <p className="text-xs text-slate-500">16 Nov 2023, 09:15 AM</p>
                                     </div>
                                   </div>

                                   <div className="flex gap-4 relative z-10">
                                     <div className={`w-6 h-6 rounded-full ${vendor.status === 'Delivered' ? 'bg-[#10b981]' : vendor.status === 'Shipped' ? 'bg-[#6c2bd9]' : 'bg-slate-200'} text-white flex items-center justify-center shrink-0 shadow-[0_0_0_4px_rgba(255,255,255,1)]`}>
                                       {vendor.status === 'Delivered' ? <CheckCircle className="w-3.5 h-3.5" /> : <Truck className="w-3.5 h-3.5" />}
                                     </div>
                                     <div>
                                       <p className={`font-bold text-sm ${vendor.status === 'Delivered' || vendor.status === 'Shipped' ? 'text-slate-900' : 'text-slate-400'}`}>Shipped</p>
                                       {vendor.status === 'Shipped' && <p className="text-xs text-slate-500">Expected delivery: 22 Nov</p>}
                                     </div>
                                   </div>
                                 </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          {vendor.status === "Delivered" && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" className="h-8 text-xs font-bold text-rose-500 hover:bg-rose-50 hover:text-rose-600">
                                  <RotateCcw className="w-3 h-3 mr-1.5" /> Return / Refund
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Request Return</DialogTitle>
                                  <DialogDescription>Please specify the reason for returning this item.</DialogDescription>
                                </DialogHeader>
                                <div className="py-4 space-y-4">
                                   <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex gap-3 text-amber-800 text-sm">
                                     <AlertCircle className="w-5 h-5 shrink-0" />
                                     <p>You are eligible to return this item within 7 days of delivery.</p>
                                   </div>
                                   <textarea 
                                     placeholder="Describe the issue with the product..."
                                     className="w-full min-h-[100px] border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#6c2bd9] focus:ring-1 focus:ring-[#6c2bd9]"
                                   ></textarea>
                                   <Button className="w-full bg-[#6c2bd9] hover:bg-[#5821b0]">Submit Request</Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
