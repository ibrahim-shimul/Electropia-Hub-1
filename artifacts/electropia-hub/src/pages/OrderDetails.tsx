import { ChevronLeft, MapPin, Package, Truck, CheckCircle, Store, Receipt, AlertCircle, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useRoute } from "wouter";

const MOCK_ORDER = {
  id: "E0803269999900",
  date: "08 Mar 2026, 14:30:45",
  total: 101024,
  status: "Processing",
  paymentMethod: "EMI (City Bank)",
  paymentStatus: "Paid",
  shipping: {
    name: "Joynul Abedin",
    phone: "+88 01911761617",
    address: "District: Gazipur, Upzilla: Kapasia\nVillage/Area: Kamargaon, Moholla: Pashchim\nHouse/Apartment: Moulovi Baari."
  },
  summary: {
    subtotal: 94140,
    shipping: 200,
    discount: 800,
    emiFee: 7484,
  },
  vendors: [
    {
      storeName: "Tech Gadgets BD",
      storeId: "S-1045",
      subOrderId: "E0803269999911",
      status: "Processing",
      courier: "Steadfast, Hub: Golokpur Bazar",
      items: [
        { name: "Samsung Galaxy A54 5G", variant: "Color: Awesome Graphite, Storage: 8GB/128GB", sku: "SM-A546E", qty: 2, price: 42990, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=100&h=100" },
        { name: "Wireless Earbuds Pro", variant: "Color: White, ANC: Yes", sku: "WEP-W-01", qty: 1, price: 2490, image: "https://images.unsplash.com/photo-1542728928-1413d1894ed1?auto=format&fit=crop&q=80&w=100&h=100" }
      ]
    },
    {
      storeName: "ElectroHub",
      storeId: "S-2201",
      subOrderId: "E0803269999912",
      status: "Shipped",
      courier: "Pathao, Hub: Gulshan",
      items: [
        { name: "Power Bank 20000mAh", variant: "Color: Black, Output: 22.5W Fast Charge", sku: "PB-20K-BLK", qty: 3, price: 1890, image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=100&h=100" }
      ]
    }
  ]
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered": return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "Processing": return "bg-amber-100 text-amber-700 border-amber-200";
    case "Shipped": return "bg-blue-100 text-blue-700 border-blue-200";
    default: return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

export default function OrderDetails() {
  const [, params] = useRoute("/order/:id");
  const orderId = params?.id || "E0803269999900";
  
  // In a real app, you would fetch the order data using the orderId
  const order = MOCK_ORDER;

  return (
    <div className="max-w-[1000px] mx-auto pb-12 mt-6">
      {/* Header & Back Button */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="outline" size="icon" className="h-9 w-9 shrink-0 rounded-full border-slate-200 text-slate-600 hover:text-[#6c2bd9] hover:bg-purple-50 hover:border-purple-200 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-heading font-extrabold text-2xl text-slate-900 flex items-center gap-2">
              Order Details
              <Badge variant="outline" className={`ml-2 px-2.5 py-0.5 text-xs font-bold ${getStatusColor(order.status)}`}>{order.status}</Badge>
            </h1>
            <p className="text-sm text-slate-500 font-medium">Order ID: <span className="text-slate-700">{orderId}</span></p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="font-bold border-slate-200 text-slate-700 h-10">
            <Receipt className="w-4 h-4 mr-2" /> Download Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Content: Items by Vendor */}
        <div className="lg:col-span-8 space-y-6">
          
          <h2 className="font-bold text-slate-900 text-lg mb-2">Items Ordered ({order.vendors.reduce((acc, v) => acc + v.items.length, 0)})</h2>
          
          {order.vendors.map((vendor, vIndex) => (
            <div key={vIndex} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              {/* Vendor Header */}
              <div className="bg-slate-50/80 px-5 py-4 border-b border-slate-200 flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center shrink-0">
                    <Store className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{vendor.storeName} <span className="text-slate-400 font-normal text-xs ml-1">({vendor.storeId})</span></p>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500 font-mono">
                      Sub Order: {vendor.subOrderId}
                      <button className="text-slate-400 hover:text-[#6c2bd9]"><Copy className="w-3 h-3" /></button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className={`px-2.5 py-0.5 text-[11px] font-bold mb-1 ${getStatusColor(vendor.status)}`}>{vendor.status}</Badge>
                  <p className="text-[11px] text-slate-500 font-medium">Courier: <span className="text-slate-700">{vendor.courier}</span></p>
                </div>
              </div>

              {/* Vendor Tracking Timeline (Simplified) */}
              <div className="bg-white px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Truck className="w-4 h-4 text-slate-400" /> Package Tracking
                </div>
                <Button variant="link" className="h-auto p-0 text-xs font-bold text-[#6c2bd9] hover:text-[#5821b0]">View Full History</Button>
              </div>

              {/* Vendor Items List */}
              <div className="divide-y divide-slate-100">
                {vendor.items.map((item, i) => (
                  <div key={i} className="p-5 flex gap-4 bg-white">
                    <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-lg p-2 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-slate-900 text-sm mb-0.5">{item.name}</h4>
                      <p className="text-[11px] text-slate-500 mb-1">{item.variant}</p>
                      <p className="text-[10px] text-slate-400 font-mono mb-2">SKU: {item.sku}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <p className="text-xs font-medium text-slate-600">Qty: <span className="font-bold text-slate-900">{item.qty}</span> × ৳{item.price.toLocaleString()}</p>
                        <p className="font-extrabold text-slate-900 text-sm">৳{(item.qty * item.price).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>

        {/* Sidebar: Order Info & Summary */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Order Info Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">Order Summary</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Date & Time</span>
                <span className="font-medium text-slate-900">{order.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Payment Method</span>
                <span className="font-medium text-slate-900">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Payment Status</span>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 px-2 py-0 font-bold text-[10px] shadow-none border-none">Paid</Badge>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Sub Total</span>
                <span className="text-slate-900 font-medium">৳{order.summary.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Total Shipping</span>
                <span className="text-slate-900 font-medium">৳{order.summary.shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-rose-600 font-medium">
                <span>Total Discount</span>
                <span>-৳{order.summary.discount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600 pb-3 border-b border-slate-100">
                <span>EMI Convenience Fee</span>
                <span className="text-slate-900 font-medium">৳{order.summary.emiFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-slate-900 text-base">Grand Total</span>
                <span className="font-heading font-black text-2xl text-[#6c2bd9]">৳{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">
              <MapPin className="w-4 h-4 text-[#6c2bd9]" /> Shipping Details
            </div>
            <div className="text-sm">
              <p className="font-bold text-slate-900 text-[15px] mb-1">{order.shipping.name}</p>
              <p className="text-slate-600 mb-3 font-medium">{order.shipping.phone}</p>
              <p className="text-slate-500 text-[13px] leading-relaxed whitespace-pre-line">
                {order.shipping.address}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}