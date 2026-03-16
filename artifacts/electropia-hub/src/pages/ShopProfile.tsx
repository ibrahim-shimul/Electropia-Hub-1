import { useState, useEffect } from "react";
import { CheckCircle2, MapPin, Star, MessageSquare, ShieldCheck, Share2, Grid, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ui/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { useRoute, useLocation, Link } from "wouter";

export default function ShopProfile() {
  const [, params] = useRoute("/shop/:id/:tab?");
  const [, setLocation] = useLocation();
  const shopId = params?.id || "1";
  const urlTab = params?.tab ? decodeURIComponent(params.tab) : "Home Page";
  
  const [activeTab, setActiveTab] = useState(urlTab);

  useEffect(() => {
    setActiveTab(urlTab);
  }, [urlTab]);

  const shopTabs = ["Home Page", "Products", "Profile", "Reviews", "Q&A"];

  const handleTabClick = (tab: string) => {
    setLocation(`/shop/${shopId}/${encodeURIComponent(tab)}`);
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      
      {/* Shop Banner & Header */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm mt-6">
        {/* Top Banner Image */}
        <div className="h-48 md:h-64 w-full bg-gradient-to-r from-blue-900 to-indigo-800 relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=2000')] opacity-30 mix-blend-overlay object-cover"></div>
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white text-slate-800 font-bold backdrop-blur-sm">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
          </div>
        </div>

        {/* Shop Info Container */}
        <div className="px-6 md:px-10 pb-6">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-12 relative z-10">
            {/* Logo */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl border-4 border-white bg-white shadow-md overflow-hidden shrink-0">
               <div className="w-full h-full bg-slate-50 flex items-center justify-center p-4">
                 <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=200&h=200" alt="Store Logo" className="w-full h-full object-cover rounded-lg" />
               </div>
            </div>

            {/* Details */}
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-heading font-black text-2xl md:text-3xl text-slate-900">
                  Electropia Flagship Store
                </h1>
                <CheckCircle2 className="w-6 h-6 text-[#10b981] fill-emerald-50" />
              </div>
              
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-slate-600 mb-3">
                <Badge className="bg-indigo-50 text-indigo-700 hover:bg-indigo-50 border-indigo-100 font-bold">
                  Mall | Flagship Store
                </Badge>
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-slate-400" /> Arambagh, Motijheel, Dhaka-1000.
                </span>
                <span className="flex items-center gap-1.5 font-bold text-slate-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 4.8 <span className="text-slate-500 font-normal">(1.2k Reviews)</span>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full md:w-auto pb-2">
               <Button className="flex-1 md:flex-none bg-[#6c2bd9] hover:bg-[#5821b0] text-white font-bold h-11 px-8 rounded-lg shadow-md shadow-purple-500/20">
                 Follow (12K)
               </Button>
               <Button variant="outline" className="flex-1 md:flex-none h-11 border-slate-200 hover:bg-slate-50 font-bold text-slate-700">
                 <MessageSquare className="w-4 h-4 mr-2" /> Chat
               </Button>
            </div>
          </div>
        </div>

        {/* Tab Menu - The 5 Buttons */}
        <div className="border-t border-slate-100 bg-slate-50/50 px-4 md:px-8 flex overflow-x-auto hide-scrollbar">
          {shopTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`py-4 px-6 font-bold text-[14px] whitespace-nowrap transition-colors border-b-[3px] ${
                activeTab === tab 
                  ? "border-[#6c2bd9] text-[#6c2bd9]" 
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Area */}
      <div className="min-h-[500px]">
        
        {/* Home Page Tab Content */}
        {activeTab === "Home Page" && (
          <div className="space-y-8">
            {/* Search within store */}
            <div className="flex gap-4 items-center bg-white p-4 rounded-xl border border-slate-200">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input placeholder="Search within this store..." className="pl-10 bg-slate-50 border-none focus-visible:ring-[#6c2bd9]/20" />
              </div>
              <Button variant="outline" className="shrink-0 font-bold border-slate-200">
                <Grid className="w-4 h-4 mr-2" /> Categories
              </Button>
            </div>

            {/* Store Highlights / Vouchers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="bg-rose-50 border border-rose-100 rounded-xl p-5 flex items-center justify-between">
                 <div>
                   <p className="text-rose-600 font-extrabold text-lg">৳500 OFF</p>
                   <p className="text-[11px] text-rose-800">Min spend ৳10,000</p>
                 </div>
                 <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-none">Collect</Button>
               </div>
               <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex items-center justify-between">
                 <div>
                   <p className="text-blue-600 font-extrabold text-lg">Free Delivery</p>
                   <p className="text-[11px] text-blue-800">Min spend ৳5,000</p>
                 </div>
                 <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-none">Collect</Button>
               </div>
               <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 flex items-center justify-between">
                 <div>
                   <p className="text-amber-700 font-extrabold text-lg">5% Cashback</p>
                   <p className="text-[11px] text-amber-800">Max cap ৳1,000</p>
                 </div>
                 <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-none">Collect</Button>
               </div>
            </div>

            {/* Store Recommended Products */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-extrabold text-xl text-slate-900">Recommended for You</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {MOCK_PRODUCTS.slice(0, 5).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Products Tab Content */}
        {activeTab === "Products" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-800">All Products (245)</h3>
              <select className="border border-slate-200 rounded-lg text-sm px-3 py-2 font-medium text-slate-700 bg-white focus:outline-none focus:border-[#6c2bd9]">
                <option>Latest Items</option>
                <option>Top Sales</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {MOCK_PRODUCTS.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab Content */}
        {activeTab === "Profile" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 p-6 md:p-8">
                <h3 className="font-heading font-extrabold text-xl text-slate-900 mb-4">About Electropia Flagship Store</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Welcome to the official Electropia Flagship Store. We are committed to providing the highest quality home and kitchen appliances across Bangladesh. With over 10 years of market presence, we guarantee 100% authentic products, official warranties, and dedicated after-sales support.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-slate-100">
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-1">Joined Electropia</p>
                    <p className="text-slate-500">March 2021 (2+ Years)</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-1">Store Response Rate</p>
                    <p className="text-emerald-600 font-bold">98% (Within 1 hour)</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-1">Seller Size</p>
                    <p className="text-slate-500">Enterprise / Corporate</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-1">Main Categories</p>
                    <p className="text-slate-500">Air Conditioners, TVs, Refrigerators</p>
                  </div>
                </div>
             </div>
             <div className="space-y-4">
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#6c2bd9]" /> Official Guarantees
                  </h4>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> 100% Authentic Products</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Brand Official Warranty Included</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> 7 Days Free Return Policy</li>
                  </ul>
                </div>
             </div>
          </div>
        )}

        {/* Reviews Content */}
        {activeTab === "Reviews" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex flex-col md:flex-row gap-8 items-center border-b border-slate-100 pb-8 mb-8">
                <div className="text-center md:text-left flex-shrink-0">
                  <h2 className="text-5xl font-black text-slate-900 mb-2">4.8</h2>
                  <div className="flex text-amber-400 mb-2 justify-center md:justify-start">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < 4 ? 'fill-current' : i === 4 ? 'fill-current text-amber-400/50' : 'fill-amber-400/30'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-slate-500">Based on 1.2k reviews</p>
                </div>
                
                <div className="flex-1 w-full max-w-sm space-y-2">
                  {[5, 4, 3, 2, 1].map((rating, idx) => {
                    const percentages = [80, 15, 3, 1, 1]; // Mock distribution
                    return (
                      <div key={rating} className="flex items-center gap-3 text-sm">
                        <span className="w-12 text-slate-600 flex items-center gap-1 font-medium">{rating} <Star className="w-3 h-3 fill-current text-amber-400" /></span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: `${percentages[idx]}%` }}></div>
                        </div>
                        <span className="w-8 text-right text-slate-500 font-medium">{percentages[idx]}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { name: "Rafiqul Islam", date: "2 days ago", rating: 5, comment: "Excellent seller! The air conditioner was delivered exactly as described and the installation team was very professional. Highly recommended.", product: "SAFE E18KINV Intelligent Inverter Split AC" },
                  { name: "Tania Akter", date: "1 week ago", rating: 5, comment: "Very fast delivery and genuine product. The seller was very responsive to my queries before purchase. Will definitely buy from them again.", product: "Philips Essential Airfryer" },
                  { name: "Mahmud Hasan", date: "2 weeks ago", rating: 4, comment: "Product is good and original, but delivery took 2 days longer than expected due to courier issues. Otherwise a smooth experience.", product: "Samsung 55\" QLED 4K Smart TV" },
                  { name: "Jubayer Rahman", date: "1 month ago", rating: 5, comment: "Got it at a great price during the group deal. The packaging was very secure. 10/10 service.", product: "LG 320L Top Mount Refrigerator" }
                ].map((review, i) => (
                  <div key={i} className="border-b border-slate-100 last:border-0 pb-6 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-heading font-bold text-slate-500">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{review.name}</h4>
                          <p className="text-[11px] text-slate-400">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, starIdx) => (
                          <Star key={starIdx} className={`w-3.5 h-3.5 ${starIdx < review.rating ? 'fill-current' : 'fill-transparent text-slate-300'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mt-3 leading-relaxed">{review.comment}</p>
                    <div className="mt-3 inline-block bg-slate-50 px-3 py-1.5 rounded text-[11px] text-slate-500 border border-slate-100">
                      Purchased: <span className="font-medium text-slate-700">{review.product}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center pt-6 border-t border-slate-100">
                <Button variant="outline" className="font-bold text-slate-600 px-8">Load More Reviews</Button>
              </div>
            </div>
          </div>
        )}

        {/* Q&A Content */}
        {activeTab === "Q&A" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-100 pb-6 gap-4">
                <h2 className="font-heading font-extrabold text-xl text-slate-900">Questions about this seller (45)</h2>
                <Button className="bg-[#6c2bd9] hover:bg-[#5821b0] text-white font-bold h-10">Ask a Question</Button>
              </div>
              
              <div className="space-y-6">
                {[
                  { q: "Do you provide official brand warranty for the Samsung TVs?", a: "Yes, all our Samsung televisions come with the official brand warranty. 1 year for parts and panel, and 5 years for service. You will receive the official warranty card with the product.", date: "3 days ago", user: "Kamrul Hasan" },
                  { q: "Is the AC installation free?", a: "Installation is free for selected areas in Dhaka city. For outside Dhaka, standard installation charges apply. Angle brackets and extra copper pipes (if needed) will be charged separately.", date: "1 week ago", user: "Sadia Afrin" },
                  { q: "Can I pick up the product directly from your physical store?", a: "Yes, you can! Please select the 'Store Pickup' option during checkout. Once your order is ready, we will notify you to come and collect it from our Dhanmondi branch.", date: "2 weeks ago", user: "Faisal Ahmed" },
                  { q: "Do you offer EMI on all credit cards?", a: "We currently support 0% EMI for up to 36 months on credit cards from 25+ partner banks including City Bank, BRAC Bank, EBL, and Standard Chartered. You can see the full list during the checkout payment step.", date: "1 month ago", user: "Nusrat Jahan" }
                ].map((item, i) => (
                  <div key={i} className="border-b border-slate-100 last:border-0 pb-6 last:pb-0">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded bg-purple-100 text-purple-700 flex items-center justify-center font-bold shrink-0">Q</div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 mb-1 leading-snug">{item.q}</h4>
                        <p className="text-[11px] text-slate-400 mb-3">Asked by {item.user} • {item.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-1">
                      <div className="w-8 h-8 rounded bg-slate-100 text-slate-500 flex items-center justify-center font-bold shrink-0">A</div>
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex-1">
                        <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
                        <p className="text-[11px] text-slate-400 mt-3 font-medium flex items-center gap-1.5">
                          <span className="w-4 h-4 bg-[#6c2bd9] rounded-full flex items-center justify-center text-white text-[8px]">E</span>
                          Answered by Electropia Flagship Store
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center pt-6 border-t border-slate-100">
                <Button variant="outline" className="font-bold text-slate-600 px-8">Load More Questions</Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
