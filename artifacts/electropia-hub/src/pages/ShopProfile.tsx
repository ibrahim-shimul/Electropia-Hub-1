import { useState, useEffect } from "react";
import { CheckCircle2, MapPin, Star, MessageSquare, ShieldCheck, Share2, Grid, Search, Award, Trophy, TrendingUp, BadgeCheck, Quote, Building2, Globe, Users, Package, Handshake } from "lucide-react";
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
          <div className="space-y-6">

            {/* About + Official Guarantees */}
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

            {/* ── CERTIFICATIONS ── */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
              <h3 className="font-heading font-extrabold text-lg text-slate-900 mb-6 flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-[#6c2bd9]" /> Certifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "ISO 9001:2015", authority: "Bureau Veritas Bangladesh", year: "2022", desc: "Quality Management System — certified for consistent delivery of quality products and services.", color: "bg-blue-50 border-blue-100", badge: "bg-blue-600" },
                  { name: "Bangladesh Standards & Testing Institution", authority: "BSTI", year: "2021", desc: "All products sold meet BSTI's mandatory quality and safety standards for consumer electronics.", color: "bg-emerald-50 border-emerald-100", badge: "bg-emerald-600" },
                  { name: "Authorized Reseller — Samsung", authority: "Samsung Electronics BD", year: "2020", desc: "Officially authorized to sell and service Samsung home appliances and consumer electronics.", color: "bg-amber-50 border-amber-100", badge: "bg-amber-600" },
                  { name: "Authorized Reseller — Philips", authority: "Philips Bangladesh Ltd.", year: "2021", desc: "Certified authorized retailer for Philips home appliances and personal care products.", color: "bg-indigo-50 border-indigo-100", badge: "bg-indigo-600" },
                  { name: "e-Commerce Association of Bangladesh", authority: "e-CAB", year: "2021", desc: "Registered member of e-CAB — ensuring ethical e-commerce practices and consumer protection.", color: "bg-rose-50 border-rose-100", badge: "bg-rose-600" },
                  { name: "NBR VAT Registration", authority: "National Board of Revenue", year: "2019", desc: "Fully VAT-registered business operating under Bangladesh's national revenue guidelines.", color: "bg-slate-50 border-slate-200", badge: "bg-slate-600" },
                ].map((cert, i) => (
                  <div key={i} className={`rounded-xl border p-5 ${cert.color} flex flex-col gap-3`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className={`w-9 h-9 ${cert.badge} rounded-lg flex items-center justify-center shrink-0`}>
                        <BadgeCheck className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 bg-white/70 px-2 py-0.5 rounded-full border border-white">{cert.year}</span>
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-slate-900 leading-tight mb-0.5">{cert.name}</p>
                      <p className="text-[11px] font-semibold text-slate-500 mb-2">Issued by: {cert.authority}</p>
                      <p className="text-[12px] text-slate-600 leading-snug">{cert.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── AWARDS & ACHIEVEMENTS ── */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
              <h3 className="font-heading font-extrabold text-lg text-slate-900 mb-6 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" /> Awards & Achievements
              </h3>
              <div className="space-y-4">
                {[
                  { year: "2024", title: "Top Seller of the Year — Electropia", desc: "Ranked #1 across all home appliance sellers on Electropia platform with the highest GMV, customer satisfaction score, and zero policy violations for the full year.", icon: Trophy, color: "text-amber-500", bg: "bg-amber-50 border-amber-100" },
                  { year: "2023", title: "Best Customer Experience Award", desc: "Awarded by Electropia's Seller Excellence Programme for maintaining a 98%+ response rate, <1 hour reply time, and a 4.9 seller rating throughout 2023.", icon: Award, color: "text-[#6c2bd9]", bg: "bg-purple-50 border-purple-100" },
                  { year: "2023", title: "Samsung Platinum Partner Bangladesh", desc: "Achieved Platinum tier in Samsung's authorized reseller partner programme — the highest tier available — based on annual sales volume and customer service standards.", icon: Award, color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
                  { year: "2022", title: "Fast-Growing E-Commerce Brand — e-CAB Awards", desc: "Recognized by the e-Commerce Association of Bangladesh as one of the 10 fastest-growing online stores in the consumer electronics category.", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
                  { year: "2021", title: "100,000 Orders Milestone", desc: "Successfully completed 100,000 customer orders with a 99.2% fulfillment rate — a first for a dedicated home appliance seller on the platform.", icon: Package, color: "text-rose-500", bg: "bg-rose-50 border-rose-100" },
                ].map((award, i) => {
                  const Icon = award.icon;
                  return (
                    <div key={i} className={`flex gap-4 p-4 rounded-xl border ${award.bg}`}>
                      <div className="shrink-0 flex flex-col items-center gap-2">
                        <div className={`w-10 h-10 rounded-full bg-white border border-current/20 flex items-center justify-center ${award.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-extrabold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">{award.year}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-extrabold text-slate-900 mb-1">{award.title}</p>
                        <p className="text-[12px] text-slate-600 leading-relaxed">{award.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── SUCCESS STORIES ── */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
              <h3 className="font-heading font-extrabold text-lg text-slate-900 mb-2 flex items-center gap-2">
                <Quote className="w-5 h-5 text-[#6c2bd9]" /> Success Stories
              </h3>
              <p className="text-sm text-slate-500 mb-6">Real experiences from our customers and business partners.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { name: "Aminul Islam", role: "Homeowner, Dhaka", story: "আমি Electropia থেকে একটি Samsung 65\" QLED TV কিনেছিলাম। ডেলিভারি ছিল অবিশ্বাস্য দ্রুত — মাত্র ১ দিনে! ইনস্টলেশন টিম প্রফেশনাল এবং পরিষ্কার-পরিচ্ছন্ন ছিল। এখন পর্যন্ত সেরা অনলাইন কেনাকাটার অভিজ্ঞতা।", tag: "Samsung 65\" QLED TV", avatar: "A", rating: 5 },
                  { name: "Rashida Begum", role: "Restaurant Owner, Chittagong", story: "আমার রেস্তোরাঁর জন্য ৮টি এয়ার কন্ডিশনার একসাথে অর্ডার করেছিলাম। Electropia Flagship Store বাল্ক ডিসকাউন্ট অফার করেছিল এবং পুরো ইন্সটলেশন মাত্র ২ দিনে শেষ করেছিল। Business-এর জন্য best partner।", tag: "Bulk Order — 8× ACs", avatar: "R", rating: 5 },
                  { name: "Tanvir Mahmud", role: "IT Professional, Sylhet", story: "Group Deal-এ Philips Airfryer মাত্র ৳৯,৫০০-এ পেয়েছি — regular price ছিল ৳১৩,৫০০। সত্যিই বিশ্বাস হয়নি কিন্তু product একদম genuine এবং original packaging-এ এসেছে। Highly recommended!", tag: "Philips Airfryer — Group Deal", avatar: "T", rating: 5 },
                  { name: "Sumaiya Akter", role: "Interior Designer, Dhaka", story: "আমার clients-দের জন্য নিয়মিত appliance কিনি এই store থেকে। প্রতিটা order-এ consistent quality এবং on-time delivery পাই। After-sales support অসাধারণ — একটা সমস্যায় ২৪ ঘণ্টার মধ্যে replace করে দিয়েছিল।", tag: "Repeat Corporate Buyer", avatar: "S", rating: 5 },
                ].map((story, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-5 flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#6c2bd9] text-white flex items-center justify-center font-extrabold text-sm shrink-0">{story.avatar}</div>
                      <div className="flex-1">
                        <p className="text-sm font-extrabold text-slate-900">{story.name}</p>
                        <p className="text-[11px] text-slate-500">{story.role}</p>
                        <div className="flex gap-0.5 mt-1">
                          {[...Array(story.rating)].map((_, s) => <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                        </div>
                      </div>
                      <Quote className="w-6 h-6 text-[#6c2bd9]/20 shrink-0 mt-1" />
                    </div>
                    <p className="text-[13px] text-slate-700 leading-relaxed italic">"{story.story}"</p>
                    <span className="text-[11px] font-bold text-[#6c2bd9] bg-purple-50 border border-purple-100 px-3 py-1 rounded-full self-start">{story.tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── BUSINESS SCENARIO ── */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
              <h3 className="font-heading font-extrabold text-lg text-slate-900 mb-2 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-slate-700" /> Business Scenario
              </h3>
              <p className="text-sm text-slate-500 mb-8">An overview of our business operations, market presence, and growth across Bangladesh.</p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: Users, label: "Total Customers", value: "1,20,000+", sub: "Across Bangladesh", color: "text-[#6c2bd9] bg-purple-50 border-purple-100" },
                  { icon: Package, label: "Orders Fulfilled", value: "1,40,000+", sub: "Since 2019", color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
                  { icon: Globe, label: "Districts Covered", value: "64 / 64", sub: "Nationwide delivery", color: "text-blue-600 bg-blue-50 border-blue-100" },
                  { icon: Handshake, label: "Brand Partners", value: "35+", sub: "Official partnerships", color: "text-amber-600 bg-amber-50 border-amber-100" },
                ].map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <div key={i} className={`rounded-xl border p-4 ${m.color} flex flex-col gap-2`}>
                      <Icon className={`w-5 h-5 ${m.color.split(" ")[0]}`} />
                      <p className="font-heading font-black text-2xl text-slate-900">{m.value}</p>
                      <div>
                        <p className="text-[12px] font-extrabold text-slate-800">{m.label}</p>
                        <p className="text-[11px] text-slate-500">{m.sub}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Operations overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="w-1 h-5 bg-[#6c2bd9] rounded-full inline-block" /> Business Model
                  </h4>
                  <ul className="space-y-2.5 text-sm text-slate-600">
                    {[
                      "B2C retail via Electropia platform and own website",
                      "B2B bulk supply to corporates, hotels, and hospitals",
                      "Government and institutional procurement contracts",
                      "After-sales service & AMC (Annual Maintenance Contracts)",
                      "Group Deal & Flash Sale partnerships with Electropia",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#6c2bd9] shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="w-1 h-5 bg-emerald-500 rounded-full inline-block" /> Distribution Network
                  </h4>
                  <ul className="space-y-2.5 text-sm text-slate-600">
                    {[
                      "3 central warehouses in Dhaka, Chittagong, and Sylhet",
                      "Same-day delivery available within Dhaka city",
                      "Nationwide delivery within 3–7 business days",
                      "50+ trained installation & service technicians",
                      "Dedicated B2B logistics desk for bulk orders",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Growth timeline */}
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" /> Growth Timeline
                </h4>
                <div className="relative">
                  <div className="absolute left-3.5 top-0 bottom-0 w-px bg-slate-200" />
                  <div className="space-y-5">
                    {[
                      { year: "2019", event: "Founded", detail: "Started as a small electronics retailer in Motijheel, Dhaka with a team of 5." },
                      { year: "2020", event: "Joined Electropia", detail: "Became one of the first verified sellers on the Electropia platform. Crossed 10,000 orders in the first year." },
                      { year: "2021", event: "Nationwide Expansion", detail: "Launched delivery to all 64 districts. Opened second warehouse in Chittagong. Team grew to 80+ members." },
                      { year: "2022", event: "Corporate Division", detail: "Launched dedicated B2B division serving hotels, hospitals, and government institutions. ISO 9001 certified." },
                      { year: "2023", event: "1 Lakh Orders", detail: "Crossed the 100,000 orders milestone. Won Best Customer Experience Award from Electropia." },
                      { year: "2024", event: "Top Seller #1", detail: "Ranked as the #1 home appliance seller on Electropia. Expanded to 35+ brand partnerships and 120+ staff." },
                    ].map((t, i) => (
                      <div key={i} className="flex gap-5 relative pl-10">
                        <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-[#6c2bd9] border-4 border-white shadow flex items-center justify-center z-10">
                          <span className="text-white text-[8px] font-black">{t.year.slice(2)}</span>
                        </div>
                        <div className="flex-1 pb-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[11px] font-bold text-[#6c2bd9]">{t.year}</span>
                            <span className="text-sm font-extrabold text-slate-900">{t.event}</span>
                          </div>
                          <p className="text-[12px] text-slate-600 leading-snug">{t.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
