import { useState } from "react";
import { Star, Heart, Share2, ShieldCheck, MapPin, ChevronRight, CheckCircle2, Users, Clock, AlertCircle, Truck, Wrench, RotateCcw, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ProductCard } from "@/components/ui/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/mock-data";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [hasJoinedGroup, setHasJoinedGroup] = useState(false);
  const [groupCurrent, setGroupCurrent] = useState(32);
  const [selectedSeller, setSelectedSeller] = useState(0);

  const product = {
    name: "SAFE E18KINV Intelligent Inverter Split Air Conditioner - 1.5 Ton",
    sku: "EP18325",
    category: "Inverter",
    brand: "SAFE",
    price: 47999,
    originalPrice: 76000,
    soldLast7Days: 4,
    images: [
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      Model: "ST18KINV(ISS)1B8FB1-SLRG",
      Type: "Split Type AC",
      Capacity: "1.5 Ton",
      Technology: "Inverter",
      Weight: "39 kg",
    },
    seller: {
      name: "Walton Official Store",
      verified: true,
      location: "Mirpur, Dhaka",
      insideDhaka: "Tk 60+",
      outsideDhaka: "Tk 120+",
      sold: 13,
      stock: 17
    },
    // Group Deal specific data
    groupDeal: {
      active: true,
      price: 45000,
      targetCustomers: 50,
      currentCustomers: groupCurrent,
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 14 + 1000 * 60 * 20), // 14 hours 20 mins from now
      depositRequired: 500
    },
    // Bulk deal specific data
    bulkPricing: [
      { minQty: 1, maxQty: 4, price: 47999 },
      { minQty: 5, maxQty: 19, price: 46500 },
      { minQty: 20, maxQty: null, price: 45000 },
    ]
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  // Group Deal calculations
  const groupDealProgress = (product.groupDeal.currentCustomers / product.groupDeal.targetCustomers) * 100;
  const customersNeeded = product.groupDeal.targetCustomers - product.groupDeal.currentCustomers;
  const isGroupDealComplete = product.groupDeal.currentCustomers >= product.groupDeal.targetCustomers;

  const handleJoinDeal = () => {
    if (!hasJoinedGroup && !isGroupDealComplete) {
      setHasJoinedGroup(true);
      setGroupCurrent(prev => prev + 1);
    }
  };

  // Bulk Price calculation based on current quantity
  const currentBulkTier = product.bulkPricing.find(
    tier => quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty)
  );
  const currentPrice = currentBulkTier ? currentBulkTier.price : product.price;


  return (
    <div className="flex flex-col gap-8 pb-12 mt-6">
      
      {/* Breadcrumb */}
      <nav className="text-[13px] text-slate-500 font-medium flex items-center gap-2">
        <span className="hover:text-primary cursor-pointer">Home</span>
        <ChevronRight className="w-3 h-3" />
        <span className="hover:text-primary cursor-pointer">Air Conditioner</span>
        <ChevronRight className="w-3 h-3" />
        <span className="hover:text-primary cursor-pointer">Residential AC</span>
        <ChevronRight className="w-3 h-3" />
        <span className="hover:text-primary cursor-pointer">Inverter</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-900 truncate max-w-[200px] md:max-w-none">{product.name}</span>
      </nav>

      {/* Main Product Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Images */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="aspect-[4/3] bg-white rounded-xl border border-slate-200 relative overflow-hidden flex items-center justify-center p-8 group">
            <Badge className="absolute top-4 left-4 bg-primary text-white hover:bg-primary z-10 font-bold px-2 py-0.5 rounded text-[11px] uppercase">
              {discount}% OFF
            </Badge>
            <img 
              src={product.images[activeImage]} 
              alt={product.name} 
              className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="flex gap-3">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx)}
                className={`w-20 h-20 rounded-lg border-2 bg-white p-2 flex items-center justify-center transition-colors ${activeImage === idx ? 'border-primary' : 'border-slate-200 hover:border-primary/50'}`}
              >
                <img src={img} className="w-full h-full object-contain mix-blend-multiply" />
              </button>
            ))}
          </div>
        </div>

        {/* Middle Column: Product Info & Buy Options */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-slate-900 leading-tight mb-3">
              {product.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-[13px] text-slate-500 mb-4">
              <span>SKU: <strong className="text-slate-700">{product.sku}</strong></span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>Category: <strong className="text-slate-700">{product.category}</strong></span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-bold border border-amber-200">
                {product.soldLast7Days} items sold in last 7 days
              </span>
            </div>
            <div className="font-bold text-slate-800 text-lg mb-6">
              {product.brand}
            </div>

            <div className="flex items-center gap-6 mb-6">
              <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
                <Heart className="w-4 h-4" /> Add to wishlist
              </button>
              <button className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>

          {/* Group Deal Banner - HIGH PROMINENCE */}
          {product.groupDeal.active && (
            <div className="bg-gradient-to-r from-purple-900 to-indigo-800 rounded-xl p-1 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
              
              <div className="bg-white/95 backdrop-blur rounded-lg p-5 relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 border border-purple-200 mb-2 flex items-center gap-1.5 w-fit">
                      <Users className="w-3.5 h-3.5" /> Active Group Deal
                    </Badge>
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading font-black text-3xl text-purple-700">৳ {product.groupDeal.price.toLocaleString()}</span>
                      <span className="text-sm text-slate-500 line-through">৳ {product.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-end gap-1">
                      <Clock className="w-3.5 h-3.5" /> Ends In
                    </p>
                    <div className="flex gap-1 text-purple-900 font-bold">
                      <span className="bg-purple-100 px-2 py-1 rounded">14h</span>:
                      <span className="bg-purple-100 px-2 py-1 rounded">20m</span>:
                      <span className="bg-purple-100 px-2 py-1 rounded text-rose-600">45s</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">{product.groupDeal.currentCustomers} Joined</span>
                    <span className="text-purple-700">{customersNeeded} more needed!</span>
                  </div>
                  <Progress value={groupDealProgress} className="h-2.5 bg-slate-200 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-indigo-500" />
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={handleJoinDeal}
                    disabled={hasJoinedGroup || isGroupDealComplete}
                    className={`flex-1 font-bold h-12 shadow-md hover:shadow-lg transition-all ${
                      isGroupDealComplete 
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-not-allowed opacity-90"
                        : hasJoinedGroup
                          ? "bg-purple-800 text-white border border-purple-500 cursor-not-allowed opacity-90"
                          : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                    }`}
                  >
                    {isGroupDealComplete 
                      ? "Deal Locked! (Target Met)" 
                      : hasJoinedGroup 
                        ? `Joined! (Deposit ৳${product.groupDeal.depositRequired} Paid)` 
                        : `Join Deal (Deposit ৳${product.groupDeal.depositRequired})`}
                  </Button>
                  <Button variant="outline" className="h-12 px-4 border-purple-200 text-purple-700 hover:bg-purple-50 font-bold">
                    <Share2 className="w-4 h-4 mr-2" /> Share
                  </Button>
                </div>
                <p className="text-[10px] text-slate-500 text-center mt-3 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Deposit is fully refunded if the goal is not met.
                </p>
              </div>
            </div>
          )}

          {/* Regular / Bulk Pricing Section */}
          <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm mt-2">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              Standard & Bulk Purchase <Badge variant="secondary" className="text-[10px]">B2B/B2C</Badge>
            </h3>
            
            {/* Tiered Pricing Table */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              {product.bulkPricing.map((tier, idx) => {
                const isActive = quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty);
                return (
                  <div key={idx} className={`p-2 rounded-lg border text-center transition-colors ${isActive ? 'border-primary bg-primary/5 shadow-inner' : 'border-slate-100 bg-slate-50'}`}>
                    <div className={`text-[11px] font-bold mb-1 ${isActive ? 'text-primary' : 'text-slate-500'}`}>
                      {tier.maxQty ? `${tier.minQty}-${tier.maxQty} Units` : `${tier.minQty}+ Units`}
                    </div>
                    <div className={`font-extrabold ${isActive ? 'text-primary text-lg' : 'text-slate-700'}`}>
                      ৳{(tier.price / 1000).toFixed(1)}k
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between py-4 border-y border-slate-100 mb-5">
               <span className="font-bold text-slate-700">Total Price:</span>
               <div className="text-right">
                 <div className="font-heading font-black text-2xl text-slate-900">৳ {(currentPrice * quantity).toLocaleString()}</div>
                 {quantity > 1 && <div className="text-xs text-emerald-600 font-bold">Bulk discount applied!</div>}
               </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden h-12 w-32 shrink-0">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center text-slate-600 hover:bg-slate-200 hover:text-slate-900 font-bold transition-colors"
                >-</button>
                <div className="flex-1 flex items-center justify-center font-bold text-slate-900 bg-white h-full border-x border-slate-200">
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-full flex items-center justify-center text-slate-600 hover:bg-slate-200 hover:text-slate-900 font-bold transition-colors"
                >+</button>
              </div>
              <div className="flex gap-2 flex-1">
                <Button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold h-12">
                  Add to Cart
                </Button>
                <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-12 shadow-[0_4px_14px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-transform">
                  Buy Now
                </Button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Top Selling */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Top Selling Widget */}
          <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm flex-1">
            <h3 className="font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Top Selling</h3>
            <div className="space-y-4">
              {MOCK_PRODUCTS.slice(0, 4).map((item, idx) => (
                <div key={idx} className="flex gap-3 group cursor-pointer">
                  <div className="w-16 h-16 bg-slate-50 rounded-lg p-1.5 shrink-0 border border-slate-100 group-hover:border-primary/30 transition-colors">
                    <img src={item.image} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-[11px] font-bold text-slate-800 line-clamp-2 mb-1 group-hover:text-primary transition-colors leading-tight">{item.name}</h4>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-extrabold text-primary">৳{(item.price / 1000).toFixed(1)}k</span>
                      <span className="text-[10px] text-slate-400 line-through">৳{(item.originalPrice / 1000).toFixed(1)}k</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Available Sellers Section */}
      {(() => {
        const SELLERS = [
          {
            name: "Walton Official Store",
            badge: "Verified Seller",
            badgeClass: "bg-emerald-100 text-emerald-700 border-emerald-200",
            days: "2-3 days", outDays: "4-10 days",
            sold: 13, stock: 17,
            facilities: [
              { label: "Free Shipping", icon: Truck, color: "text-blue-600 bg-blue-50 border-blue-200" },
              { label: "Free Installation", icon: Wrench, color: "text-purple-600 bg-purple-50 border-purple-200" },
              { label: "7 Days Return", icon: RotateCcw, color: "text-amber-600 bg-amber-50 border-amber-200" },
              { label: "Brand Warranty", icon: Award, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
            ],
            shopInfo: { founded: "2015", rating: "4.8", totalSales: "12,340", responseTime: "< 1 hour", returnPolicy: "7-day hassle-free returns accepted. Product must be unused and in original packaging." },
          },
          {
            name: "Walton Official Store",
            badge: "Brand Official",
            badgeClass: "bg-amber-100 text-amber-700 border-amber-200",
            days: "2-5 days", outDays: "4-10 days",
            sold: 13, stock: 17,
            facilities: [
              { label: "Free Shipping", icon: Truck, color: "text-blue-600 bg-blue-50 border-blue-200" },
              { label: "Brand Warranty", icon: Award, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
              { label: "Official Support", icon: ShieldCheck, color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
            ],
            shopInfo: { founded: "2018", rating: "4.9", totalSales: "8,210", responseTime: "< 30 min", returnPolicy: "Brand-direct exchange within 10 days. Contact official support for claims." },
          },
          {
            name: "Walton Official Store",
            badge: "Recommended",
            badgeClass: "bg-blue-100 text-blue-700 border-blue-200",
            days: "2-3 days", outDays: "4-10 days",
            sold: 13, stock: 17,
            facilities: [
              { label: "Free Shipping", icon: Truck, color: "text-blue-600 bg-blue-50 border-blue-200" },
              { label: "7 Days Return", icon: RotateCcw, color: "text-amber-600 bg-amber-50 border-amber-200" },
            ],
            shopInfo: { founded: "2020", rating: "4.7", totalSales: "3,580", responseTime: "< 2 hours", returnPolicy: "7-day return policy. Items must be in original condition." },
          },
          {
            name: "Walton Official Store",
            badge: "New Seller",
            badgeClass: "bg-slate-100 text-slate-600 border-slate-200",
            days: "3-5 days", outDays: "5-12 days",
            sold: 5, stock: 24,
            facilities: [
              { label: "Free Shipping", icon: Truck, color: "text-blue-600 bg-blue-50 border-blue-200" },
              { label: "Brand Warranty", icon: Award, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
            ],
            shopInfo: { founded: "2023", rating: "N/A", totalSales: "120", responseTime: "< 4 hours", returnPolicy: "Return within 5 days of delivery. Contact seller directly." },
          },
        ];
        const active = SELLERS[selectedSeller];
        return (
          <>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h2 className="font-heading font-bold text-lg text-slate-900 mb-5">Available Sellers</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {SELLERS.map((seller, idx) => {
                  const isSelected = selectedSeller === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedSeller(idx)}
                      className={`border rounded-xl p-3 flex flex-col gap-2.5 cursor-pointer transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-md shadow-primary/10 ring-1 ring-primary/20"
                          : "border-slate-200 hover:border-primary/40 hover:shadow-sm"
                      }`}
                    >
                      {/* Seller header */}
                      <div className="flex items-start justify-between gap-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-blue-900 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                            <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
                              <circle cx="20" cy="20" r="20" fill="#1e3a5f"/>
                              <path d="M14 14 C14 14 16 10 20 10 C24 10 26 14 26 14 L28 28 L20 24 L12 28 Z" fill="#e8b84b"/>
                              <path d="M17 18 C17 16 18.5 15 20 15 C21.5 15 23 16 23 18 C23 20 21.5 22 20 22 C18.5 22 17 20 17 18Z" fill="white"/>
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-0.5 leading-tight">
                              {seller.name}
                              <CheckCircle2 className="w-3 h-3 text-blue-500 shrink-0" />
                            </h4>
                            <p className="text-[10px] text-slate-400 flex items-center gap-0.5 mt-0.5">
                              <Star className="w-2.5 h-2.5" /> No ratings yet
                            </p>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Badge + Location */}
                      <div className="flex flex-col gap-1">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border w-fit ${seller.badgeClass}`}>{seller.badge}</span>
                        <span className="text-[10px] text-slate-500 flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" /> {product.seller.location}</span>
                      </div>

                      {/* Delivery */}
                      <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                        <div className="bg-slate-50 rounded-md p-2 border border-slate-100">
                          <p className="text-slate-500 mb-0.5">Inside Dhaka</p>
                          <p className="font-bold text-slate-800 text-[11px]">{product.seller.insideDhaka}</p>
                          <p className="text-slate-400 flex items-center gap-0.5 mt-0.5">
                            <Clock className="w-2 h-2" /> {seller.days}
                          </p>
                        </div>
                        <div className="bg-slate-50 rounded-md p-2 border border-slate-100">
                          <p className="text-slate-500 mb-0.5">Outside Dhaka</p>
                          <p className="font-bold text-slate-800 text-[11px]">{product.seller.outsideDhaka}</p>
                          <p className="text-slate-400 flex items-center gap-0.5 mt-0.5">
                            <Clock className="w-2 h-2" /> {seller.outDays}
                          </p>
                        </div>
                      </div>

                      {/* Stock count badges */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                          Sold: {seller.sold}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                          In Stock ({seller.stock})
                        </span>
                      </div>

                      {/* Facilities tags */}
                      <div className="flex flex-wrap gap-1">
                        {seller.facilities.map((f, fi) => {
                          const FIcon = f.icon;
                          return (
                            <span key={fi} className={`flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded border ${f.color}`}>
                              <FIcon className="w-2 h-2" /> {f.label}
                            </span>
                          );
                        })}
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-slate-400 line-through">৳{product.originalPrice.toLocaleString()}</span>
                        <span className="font-heading font-black text-base text-primary">৳{product.price.toLocaleString()}</span>
                      </div>

                      {/* Qty + Buttons */}
                      <div className="flex items-center gap-1.5 mt-auto">
                        <div className="flex items-center border border-slate-200 rounded-md overflow-hidden h-8 shrink-0">
                          <button className="w-7 h-full flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold text-base leading-none">-</button>
                          <div className="w-7 h-full flex items-center justify-center font-bold text-slate-900 border-x border-slate-200 text-xs">1</div>
                          <button className="w-7 h-full flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold text-base leading-none">+</button>
                        </div>
                        <Button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold h-8 text-[10px] px-2">
                          ADD TO CART
                        </Button>
                        <Button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold h-8 text-[10px] px-2">
                          BUY NOW
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tabs Section */}
            <div className="bg-white border border-slate-200 rounded-xl mt-4 overflow-hidden">
              <Tabs defaultValue="specs" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b border-slate-200 bg-slate-50 h-auto p-0">
                  <TabsTrigger value="desc" className="rounded-none py-4 px-8 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:shadow-none font-bold text-slate-600 data-[state=active]:text-primary">Description</TabsTrigger>
                  <TabsTrigger value="specs" className="rounded-none py-4 px-8 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:shadow-none font-bold text-slate-600 data-[state=active]:text-primary">Specifications</TabsTrigger>
                  <TabsTrigger value="seller" className="rounded-none py-4 px-8 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:shadow-none font-bold text-slate-600 data-[state=active]:text-primary">
                    Seller Info
                    <span className="ml-2 text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold">{active.badge}</span>
                  </TabsTrigger>
                  <TabsTrigger value="qa" className="rounded-none py-4 px-8 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:shadow-none font-bold text-slate-600 data-[state=active]:text-primary">Questions & Answers</TabsTrigger>
                </TabsList>
                <div className="p-8">
                  <TabsContent value="desc" className="text-slate-600 text-sm leading-relaxed mt-0">
                    <p className="mb-4">This intelligent inverter split air conditioner from SAFE provides optimal cooling while ensuring energy efficiency. Designed for modern homes, it features advanced air purification filters and a whisper-quiet operation mode.</p>
                    <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sold by: {active.name}</p>
                      <div className="flex flex-wrap gap-2">
                        {active.facilities.map((f, i) => {
                          const FIcon = f.icon;
                          return (
                            <span key={i} className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${f.color}`}>
                              <FIcon className="w-3 h-3" /> {f.label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="specs" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                      {Object.entries(product.specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-3 border-b border-slate-100 last:border-0 md:last:border-b md:[&:nth-last-child(2)]:border-0">
                          <span className="text-sm font-semibold text-slate-500">{key}</span>
                          <span className="text-sm font-bold text-slate-900 text-right">{value}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="seller" className="mt-0">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                      <div className="w-14 h-14 rounded-xl bg-blue-900 flex items-center justify-center shrink-0 shadow">
                        <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
                          <circle cx="20" cy="20" r="20" fill="#1e3a5f"/>
                          <path d="M14 14 C14 14 16 10 20 10 C24 10 26 14 26 14 L28 28 L20 24 L12 28 Z" fill="#e8b84b"/>
                          <path d="M17 18 C17 16 18.5 15 20 15 C21.5 15 23 16 23 18 C23 20 21.5 22 20 22 C18.5 22 17 20 17 18Z" fill="white"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                          {active.name}
                          <CheckCircle2 className="w-4 h-4 text-blue-500" />
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${active.badgeClass}`}>{active.badge}</span>
                        </h3>
                        <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5"><MapPin className="w-3.5 h-3.5" /> {product.seller.location}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {[
                        { label: "Founded", value: active.shopInfo.founded },
                        { label: "Avg. Rating", value: active.shopInfo.rating },
                        { label: "Total Sales", value: active.shopInfo.totalSales },
                        { label: "Response Time", value: active.shopInfo.responseTime },
                      ].map((stat, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
                          <p className="text-xs font-semibold text-slate-500 mb-1">{stat.label}</p>
                          <p className="font-heading font-bold text-slate-900">{stat.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mb-5">
                      <h4 className="font-bold text-slate-800 mb-3">Seller Offers & Facilities</h4>
                      <div className="flex flex-wrap gap-2">
                        {active.facilities.map((f, i) => {
                          const FIcon = f.icon;
                          return (
                            <span key={i} className={`flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-full border ${f.color}`}>
                              <FIcon className="w-3.5 h-3.5" /> {f.label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-2">Return Policy</h4>
                      <p className="text-sm text-slate-600 bg-amber-50 border border-amber-100 rounded-xl p-4">{active.shopInfo.returnPolicy}</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="qa" className="text-slate-600 text-sm mt-0">
                    No questions asked yet. Be the first to ask!
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </>
        );
      })()}

      {/* Similar Products */}
      <section className="mt-8">
        <h2 className="font-heading font-extrabold text-2xl text-slate-900 mb-6">Similar Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
           {MOCK_PRODUCTS.slice(0, 5).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
}
