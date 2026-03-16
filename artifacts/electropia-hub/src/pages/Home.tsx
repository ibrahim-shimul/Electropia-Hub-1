import { MOCK_PRODUCTS, CATEGORIES } from "@/lib/mock-data";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, RotateCcw, Tag, Wrench, ShieldCheck, ChevronRight, TrendingUp, ChevronLeft, Star } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

// Mock Brands Data
const MOCK_BRANDS = [
  { id: 1, name: "WALTON", rating: 4.3, reviews: 153, followers: "12K", tag: "Top Rated Local Brand", desc: "A trusted local brand known for durable, energy-efficient appliances that cater to everyday needs with modern technology and reliable service." },
  { id: 2, name: "SAMSUNG", rating: 4.8, reviews: 892, followers: "45K", tag: "Global Premium Brand", desc: "World-class electronics offering innovative technology, stunning designs, and unparalleled durability for modern smart homes." },
  { id: 3, name: "LG", rating: 4.7, reviews: 654, followers: "38K", tag: "Innovation Leader", desc: "Bringing you the latest in home appliance technology with a focus on smart features, energy efficiency, and sleek aesthetics." },
  { id: 4, name: "GREE", rating: 4.5, reviews: 421, followers: "22K", tag: "Cooling Expert", desc: "Specializing in high-performance air conditioning systems designed for ultimate comfort and significant energy savings." },
  { id: 5, name: "PHILIPS", rating: 4.6, reviews: 512, followers: "28K", tag: "Lifestyle & Kitchen", desc: "Enhancing your daily life with innovative kitchen appliances and personal care products built on European engineering standards." },
  { id: 6, name: "SONY", rating: 4.9, reviews: 756, followers: "50K", tag: "Entertainment Master", desc: "Experience pure entertainment with industry-leading audio and visual technology that brings movies and music to life." },
  { id: 7, name: "HAIER", rating: 4.2, reviews: 310, followers: "18K", tag: "Value for Money", desc: "Affordable and reliable home appliances designed to provide excellent performance without breaking the bank." },
  { id: 8, name: "PANASONIC", rating: 4.6, reviews: 480, followers: "30K", tag: "Japanese Quality", desc: "Dependable Japanese engineering delivering durable home and kitchen appliances you can trust for years." }
];

// Mock Stores Data
const MOCK_STORES = [
  { id: 1, name: "Electropia Flagship Store", type: "Mall | Flagship Store", location: "Arambagh, Motijheel, Dhaka-1000.", rating: 4.3, reviews: 153, sold: "12K", inStock: "13K", b2bMoq: 10, tags: ["Group Deal", "Retail", "B2B", "Flash Sale", "Free Installation", "Free Shipping"], followers: "12K", logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=100&h=100" },
  { id: 2, name: "Electropia Flagship Store", type: "Mall | Flagship Store", location: "Arambagh, Motijheel, Dhaka-1000.", rating: 4.3, reviews: 153, sold: "12K", inStock: "13K", b2bMoq: 10, tags: ["Group Deal", "Retail", "B2B", "Flash Sale", "Free Installation", "Free Shipping"], followers: "12K", logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=100&h=100" },
  { id: 3, name: "Electropia Flagship Store", type: "Mall | Flagship Store", location: "Arambagh, Motijheel, Dhaka-1000.", rating: 4.3, reviews: 153, sold: "12K", inStock: "13K", b2bMoq: 10, tags: ["Group Deal", "Retail", "B2B", "Flash Sale", "Free Installation", "Free Shipping"], followers: "12K", logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=100&h=100" },
  { id: 4, name: "Electropia Flagship Store", type: "Mall | Flagship Store", location: "Arambagh, Motijheel, Dhaka-1000.", rating: 4.3, reviews: 153, sold: "12K", inStock: "13K", b2bMoq: 10, tags: ["Group Deal", "Retail", "B2B", "Flash Sale", "Free Installation", "Free Shipping"], followers: "12K", logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=100&h=100" },
  { id: 5, name: "Electropia Flagship Store", type: "Mall | Flagship Store", location: "Arambagh, Motijheel, Dhaka-1000.", rating: 4.3, reviews: 153, sold: "12K", inStock: "13K", b2bMoq: 10, tags: ["Group Deal", "Retail", "B2B", "Flash Sale", "Free Installation", "Free Shipping"], followers: "12K", logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=100&h=100" },
  { id: 6, name: "Electropia Flagship Store", type: "Mall | Flagship Store", location: "Arambagh, Motijheel, Dhaka-1000.", rating: 4.3, reviews: 153, sold: "12K", inStock: "13K", b2bMoq: 10, tags: ["Group Deal", "Retail", "B2B", "Flash Sale", "Free Installation", "Free Shipping"], followers: "12K", logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=100&h=100" },
  { id: 7, name: "Electropia Flagship Store", type: "Mall | Flagship Store", location: "Arambagh, Motijheel, Dhaka-1000.", rating: 4.3, reviews: 153, sold: "12K", inStock: "13K", b2bMoq: 10, tags: ["Group Deal", "Retail", "B2B", "Flash Sale", "Free Installation", "Free Shipping"], followers: "12K", logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=100&h=100" },
  { id: 8, name: "Electropia Flagship Store", type: "Mall | Flagship Store", location: "Arambagh, Motijheel, Dhaka-1000.", rating: 4.3, reviews: 153, sold: "12K", inStock: "13K", b2bMoq: 10, tags: ["Group Deal", "Retail", "B2B", "Flash Sale", "Free Installation", "Free Shipping"], followers: "12K", logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=100&h=100" }
];

export default function Home() {
  const [activeGroupDealTab, setActiveGroupDealTab] = useState("PRODUCTS");

  return (
    <div className="flex flex-col gap-10 pb-12">
      
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Banner - Left */}
        <div className="lg:col-span-8 relative rounded-xl overflow-hidden bg-gradient-to-r from-[#1e3a8a] via-[#312e81] to-[#4c1d95] flex items-center min-h-[420px]">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
           <div className="p-8 md:p-12 relative z-10 w-full md:w-[55%]">
              <h1 className="text-4xl md:text-[3.5rem] font-heading font-black text-white leading-[1.1] mb-6 drop-shadow-md">
                VIOMI AIR<br />CONDITIONER
              </h1>
              <p className="text-indigo-100 mb-8 text-sm md:text-base border-l-2 border-amber-400 pl-4">
                Cooler and save electricity. Experience the next generation of smart cooling with AI technology.
              </p>
              <Button className="bg-amber-400 hover:bg-amber-500 text-indigo-950 font-extrabold px-10 py-6 rounded text-sm shadow-[0_4px_14px_rgba(251,191,36,0.4)] transition-transform hover:-translate-y-1">
                SHOP NOW
              </Button>
           </div>
           {/* Mock AC Image */}
           <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 md:w-[60%] flex justify-end">
             <img src="https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=800" className="w-full object-cover drop-shadow-2xl mix-blend-screen max-w-[550px] translate-x-8" alt="Air Conditioner" />
           </div>
        </div>

        {/* Side Banners - Right */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex-1 rounded-xl overflow-hidden bg-gradient-to-br from-pink-100 via-fuchsia-100 to-indigo-100 relative p-6 flex flex-col justify-start min-h-[220px]">
            <h3 className="font-heading font-black text-[#6c2bd9] text-3xl leading-tight mb-2 z-10 relative">
              Vivid crystal colors<br/>come to life
            </h3>
            <div className="absolute right-[-10%] bottom-[-5%] w-[85%] mix-blend-multiply drop-shadow-xl">
              <img src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=400" alt="TV" />
            </div>
            <Button variant="link" className="p-0 h-auto justify-start text-[#6c2bd9] font-bold group w-fit mt-auto z-10 relative">
              Shop Now <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          {/* Trending Mini Carousel */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col gap-2">
             <div className="flex items-center justify-between mb-1">
               <div className="flex items-center gap-2">
                 <span className="bg-slate-100 p-1.5 rounded-md"><TrendingUp className="w-4 h-4 text-[#6c2bd9]" /></span>
                 <span className="font-bold text-xs uppercase tracking-wider text-slate-700">Trending Now</span>
               </div>
               <div className="flex gap-1">
                 <button className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#6c2bd9] hover:text-white transition-colors"><ChevronLeft className="w-3 h-3" /></button>
                 <button className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-[#6c2bd9] hover:text-white transition-colors"><ChevronRight className="w-3 h-3" /></button>
               </div>
             </div>
             <div className="flex gap-3 overflow-hidden">
               {[MOCK_PRODUCTS[0], MOCK_PRODUCTS[1]].map((product, i) => (
                 <div key={i} className="border border-slate-100 rounded-lg p-2 flex items-center gap-3 flex-1 bg-slate-50 hover:bg-white hover:border-[#6c2bd9]/30 transition-colors cursor-pointer group">
                   <div className="w-12 h-12 bg-white rounded p-1 shrink-0 group-hover:scale-105 transition-transform">
                     <img src={product.image} className="w-full h-full object-contain mix-blend-multiply" />
                   </div>
                   <div>
                     <p className="text-[11px] font-bold text-slate-900 line-clamp-1 mb-1">{product.name}</p>
                     <div className="flex items-center gap-2">
                       <p className="text-[13px] text-[#6c2bd9] font-extrabold">৳{product.price.toLocaleString()}</p>
                       <p className="text-[9px] text-slate-400 line-through">৳{product.originalPrice.toLocaleString()}</p>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-extrabold text-xl text-slate-900">Shop By Categories</h2>
          <Button variant="outline" className="text-[#6c2bd9] font-bold text-xs hover:bg-[#6c2bd9] hover:text-white transition-colors h-8 border-[#6c2bd9]/20">All Categories</Button>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {CATEGORIES.map((cat, i) => {
             const Icon = (LucideIcons as any)[cat.icon] || LucideIcons.LayoutGrid;
             return (
              <div key={i} className="flex flex-col items-center justify-center py-5 px-2 bg-white rounded-xl border border-slate-200 hover:border-[#6c2bd9] hover:shadow-md transition-all cursor-pointer group">
                <div className="w-12 h-12 flex items-center justify-center mb-3 text-[#6c2bd9]/70 group-hover:text-[#6c2bd9] group-hover:-translate-y-1 transition-transform">
                  <Icon className="w-8 h-8 stroke-[1.5]" />
                </div>
                <span className="text-[11px] text-center font-bold text-slate-600 group-hover:text-[#6c2bd9] leading-tight">
                  {cat.name}
                </span>
              </div>
             )
          })}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-xl p-5 grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { icon: Truck, title: "Cash On Delivery", subtitle: "All over Bangladesh" },
          { icon: RotateCcw, title: "7 Days Return", subtitle: "If goods have problems" },
          { icon: Tag, title: "5% Extra Discounts", subtitle: "Pay advance full payment" },
          { icon: Wrench, title: "Expert Service", subtitle: "Installation & Repair" },
          { icon: ShieldCheck, title: "Exclusive Brands", subtitle: "100% Original Product" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white text-[#6c2bd9] flex items-center justify-center shrink-0 shadow-sm border border-purple-100">
              <item.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[13px] font-extrabold text-slate-900 leading-tight">{item.title}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Product Sections (Tabs style) */}
      <section>
        <div className="flex border-b border-slate-200 mb-6 overflow-x-auto hide-scrollbar">
          {["FEATURED", "RECOMMENDED", "TOP SELLING", "NEW ARRIVAL", "DISCOUNTS"].map((tab, i) => (
            <button 
              key={tab} 
              className={`px-8 py-3 font-heading font-extrabold text-[13px] whitespace-nowrap transition-colors border-b-2 ${i === 1 ? 'border-[#6c2bd9] text-[#6c2bd9]' : 'border-transparent text-slate-500 hover:text-slate-900'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Promo Box embedded in grid (Takes up 1 column on large screens) */}
          <div className="hidden lg:flex col-span-1 rounded-xl bg-gradient-to-b from-purple-200 via-fuchsia-100 to-white p-6 flex-col relative overflow-hidden group cursor-pointer border border-purple-200">
            <div className="relative z-10 text-center mb-6 mt-4">
              <h3 className="font-heading font-black text-[#6c2bd9] text-3xl leading-none mb-3">
                CRYSTAL<br/>QLED
              </h3>
              <p className="text-purple-800 text-xs font-bold tracking-widest uppercase">For Display Smart TV</p>
            </div>
            <div className="relative z-10 w-full mt-auto flex items-end justify-center">
              <img src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=400" alt="TV" className="w-[130%] max-w-none ml-8 drop-shadow-xl group-hover:scale-110 transition-transform duration-700 mix-blend-multiply" />
            </div>
          </div>

          <div className="col-span-2 lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {MOCK_PRODUCTS.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner Strip */}
      <section className="bg-[#6c2bd9] rounded-xl overflow-hidden flex flex-col md:flex-row items-center justify-between p-6 relative shadow-lg gap-6">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="relative z-10 md:w-1/3 shrink-0 flex flex-col items-start pl-4">
           <Badge className="bg-amber-400 text-indigo-950 border-none mb-3 font-bold uppercase tracking-wider">Exclusive Offer</Badge>
           <h2 className="text-3xl lg:text-4xl font-heading font-black text-white leading-tight">Air Conditioner</h2>
           <div className="mt-4 flex items-center gap-2">
             <div className="w-12 h-1 bg-amber-400 rounded-full"></div>
             <div className="w-4 h-1 bg-white/30 rounded-full"></div>
             <div className="w-4 h-1 bg-white/30 rounded-full"></div>
           </div>
         </div>
         
         <div className="relative z-10 flex gap-4 overflow-x-auto w-full md:w-2/3 pb-2 hide-scrollbar">
            {MOCK_PRODUCTS.slice(0, 3).map(product => (
              <div key={product.id} className="bg-white rounded-xl p-4 flex gap-4 min-w-[300px] shadow-md border border-white/20">
                <div className="w-24 h-24 bg-slate-50 rounded-lg p-2 shrink-0">
                  <img src={product.image} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 text-[9px] w-fit mb-2">28% OFF</Badge>
                  <h4 className="text-[12px] font-bold text-slate-800 line-clamp-2 mb-2">{product.name}</h4>
                  <div className="flex items-end gap-2">
                    <span className="text-lg font-extrabold text-[#6c2bd9] leading-none">৳{product.price.toLocaleString()}</span>
                    <span className="text-[11px] text-slate-400 line-through">৳{product.originalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
         </div>
      </section>

      {/* TOP SELLING */}
      <section>
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-200 mb-6 gap-4">
          <h2 className="font-heading font-extrabold text-xl text-slate-900 pb-2 md:pb-3 w-full md:w-auto text-center md:text-left">TOP SELLING</h2>
          <div className="flex gap-4 md:gap-8 text-[13px] font-bold text-slate-500 overflow-x-auto w-full md:w-auto hide-scrollbar">
            <span className="text-[#6c2bd9] border-b-2 border-[#6c2bd9] pb-2 md:pb-3 px-2 whitespace-nowrap">PRODUCTS</span>
            <span className="hover:text-slate-900 cursor-pointer pb-2 md:pb-3 px-2 whitespace-nowrap">CATEGORIES</span>
            <span className="hover:text-slate-900 cursor-pointer pb-2 md:pb-3 px-2 whitespace-nowrap">BRANDS</span>
            <span className="hover:text-slate-900 cursor-pointer pb-2 md:pb-3 px-2 whitespace-nowrap">SHOPS</span>
          </div>
          <Button variant="outline" className="text-xs h-8 border-slate-200 hidden md:flex shrink-0">View All</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           {MOCK_PRODUCTS.slice(0, 8).map((product, idx) => (
             <div key={idx} className="flex gap-4 bg-white p-3.5 rounded-xl border border-slate-200 hover:border-[#6c2bd9]/40 hover:shadow-md transition-all group cursor-pointer">
                <div className="w-24 h-24 bg-slate-50 rounded-lg p-2 shrink-0 relative overflow-hidden">
                  <img src={product.image} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" />
                  {idx < 3 && (
                    <div className="absolute top-0 left-0 bg-amber-400 text-amber-950 text-[10px] font-bold px-1.5 py-0.5 rounded-br-lg z-10">
                      #{idx + 1}
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center flex-1">
                  <h4 className="text-[13px] font-bold text-slate-800 line-clamp-2 mb-1.5 group-hover:text-[#6c2bd9] transition-colors">{product.name}</h4>
                  <div className="flex items-center text-amber-400 mb-2">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-[11px] font-bold ml-1 text-slate-600">{product.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-extrabold text-[#6c2bd9]">৳{product.price.toLocaleString()}</span>
                  </div>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="bg-slate-50 rounded-2xl p-6 md:p-10 border border-slate-200">
        <div className="text-center mb-8">
          <h2 className="font-heading font-black text-2xl text-slate-900 mb-4 uppercase tracking-wider">Popular Categories</h2>
          <div className="flex justify-center gap-4 md:gap-8 text-[13px] font-bold text-slate-500 border-b border-slate-200 overflow-x-auto hide-scrollbar">
            <span className="text-[#6c2bd9] border-b-2 border-[#6c2bd9] pb-3 px-2 whitespace-nowrap">AIR CONDITIONER</span>
            <span className="hover:text-slate-900 cursor-pointer pb-3 px-2 whitespace-nowrap">TV & AUDIO</span>
            <span className="hover:text-slate-900 cursor-pointer pb-3 px-2 whitespace-nowrap">REFRIGERATOR</span>
            <span className="hover:text-slate-900 cursor-pointer pb-3 px-2 whitespace-nowrap">WASHING MACHINE</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {MOCK_PRODUCTS.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button className="rounded-md px-8 bg-[#6c2bd9] hover:bg-[#5821b0] text-white font-bold h-11">
            VIEW ALL PRODUCTS
          </Button>
        </div>
      </section>

      {/* ACTIVE GROUP DEAL / BRANDS / STORES */}
      <section className="bg-slate-50/50 rounded-2xl border border-slate-100 overflow-hidden pb-8">
        {/* Dynamic Header Section based on Active Tab */}
        <div className="p-6 md:px-8 pt-8 flex items-end justify-between border-b border-slate-200 mb-6">
          <div className="flex gap-6 md:gap-10 text-[14px] font-bold text-slate-500">
            {["PRODUCTS", "CATEGORIES", "BRANDS", "STORES"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveGroupDealTab(tab)}
                className={`pb-4 px-1 transition-colors border-b-[3px] uppercase tracking-wide ${
                  activeGroupDealTab === tab 
                    ? "border-[#6c2bd9] text-[#6c2bd9]" 
                    : "border-transparent hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {activeGroupDealTab === "BRANDS" && (
            <Button className="bg-[#6c2bd9] hover:bg-[#5821b0] text-white font-bold h-10 mb-2">
              ALL BRAND
            </Button>
          )}
        </div>
        
        {/* Tab Content Area */}
        <div className="px-6 md:px-8">
          
          {/* BRANDS TAB CONTENT */}
          {activeGroupDealTab === "BRANDS" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {MOCK_BRANDS.map((brand) => (
                <div key={brand.id} className="bg-white rounded-xl border border-slate-100 p-5 hover:shadow-lg hover:border-[#6c2bd9]/20 transition-all flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                     <div className="flex items-center gap-3">
                       {/* Brand Logo Placeholder */}
                       <div className="w-12 h-12 rounded-full border border-slate-100 bg-white flex items-center justify-center shrink-0 shadow-sm">
                         <span className="font-black text-[#1e3a8a] text-xl leading-none">{brand.name.charAt(0)}</span>
                       </div>
                       <div>
                         <h3 className="font-extrabold text-slate-900 uppercase tracking-tight leading-none mb-1">
                           {brand.name}
                         </h3>
                         <div className="flex items-center gap-1">
                           <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                           <span className="text-[11px] font-bold text-slate-700">{brand.rating}</span>
                           <span className="text-[10px] text-slate-400">({brand.reviews})</span>
                         </div>
                       </div>
                     </div>
                  </div>
                  
                  <div className="mb-3">
                    <Badge variant="secondary" className="bg-purple-50 text-[#6c2bd9] hover:bg-purple-50 text-[10px] font-semibold">
                      {brand.tag}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-slate-500 leading-relaxed mb-6 flex-1">
                    {brand.desc}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                    <span className="text-[13px] font-extrabold text-slate-900">{brand.followers} Followers</span>
                    <Button variant="outline" className="h-8 px-5 rounded-full border-[#6c2bd9] text-[#6c2bd9] hover:bg-[#6c2bd9]/5 font-bold text-xs">
                      Follow
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STORES TAB CONTENT */}
          {activeGroupDealTab === "STORES" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {MOCK_STORES.map((store) => (
                <div key={store.id} className="bg-white rounded-xl border border-slate-100 p-5 hover:shadow-lg hover:border-[#6c2bd9]/20 transition-all flex flex-col h-full group cursor-pointer">
                  <Link href={`/shop/${store.id}`}>
                    <div className="flex items-start justify-between mb-3">
                       <div className="flex gap-3">
                         <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-sm border border-slate-100 group-hover:scale-105 transition-transform">
                           <img src={store.logo} alt={store.name} className="w-full h-full object-cover" />
                         </div>
                         <div>
                           <h3 className="font-extrabold text-[13px] text-slate-900 leading-tight mb-1 group-hover:text-[#6c2bd9] transition-colors">
                             {store.name}
                           </h3>
                           <div className="flex items-center gap-1.5 mb-1 text-[10px]">
                             <span className="text-indigo-600 font-bold bg-indigo-50 px-1.5 rounded">{store.type}</span>
                           </div>
                           <p className="text-[10px] text-slate-500">{store.location}</p>
                         </div>
                       </div>
                       <div className="flex items-center gap-1 shrink-0 mt-0.5">
                         <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                         <span className="text-[11px] font-bold text-slate-700">{store.rating}</span>
                         <span className="text-[10px] text-slate-400">({store.reviews})</span>
                       </div>
                    </div>
                  </Link>

                  <div className="grid grid-cols-3 gap-2 text-center mb-3">
                    <div className="bg-emerald-50 rounded-md py-1.5 px-1 border border-emerald-100/50">
                      <p className="text-[10px] text-emerald-600 font-semibold mb-0.5">Sold</p>
                      <p className="text-xs font-bold text-emerald-700">({store.sold})</p>
                    </div>
                    <div className="bg-blue-50 rounded-md py-1.5 px-1 border border-blue-100/50">
                      <p className="text-[10px] text-blue-600 font-semibold mb-0.5">In Stock</p>
                      <p className="text-xs font-bold text-blue-700">({store.inStock})</p>
                    </div>
                    <div className="bg-purple-50 rounded-md py-1.5 px-1 border border-purple-100/50">
                      <p className="text-[10px] text-purple-600 font-semibold mb-0.5">B2B</p>
                      <p className="text-[11px] font-bold text-purple-700">(MOQ {store.b2bMoq})</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mb-6 flex-1 content-start">
                    {store.tags.map((tag, i) => (
                      <span key={i} className="bg-slate-50 border border-slate-100 text-slate-600 text-[9px] px-2 py-1 rounded font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50 relative z-10">
                    <span className="text-[13px] font-extrabold text-slate-900">{store.followers} Followers</span>
                    <Button variant="outline" className="h-8 px-5 rounded-full border-[#6c2bd9] text-[#6c2bd9] hover:bg-[#6c2bd9]/5 font-bold text-xs">
                      Follow
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PRODUCTS TAB CONTENT (Fallback for prototype) */}
          {activeGroupDealTab === "PRODUCTS" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {MOCK_PRODUCTS.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={{...product, isGroupDeal: true}} />
              ))}
            </div>
          )}

          {/* CATEGORIES TAB CONTENT (Fallback for prototype) */}
          {activeGroupDealTab === "CATEGORIES" && (
            <div className="text-center py-12 text-slate-500">
              Select a category to view items
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
