import { useState, useEffect } from "react";
import { Star, Heart, Share2, ShieldCheck, MapPin, ChevronRight, CheckCircle2, Users, Clock, AlertCircle, Truck, Package, Wrench, RotateCcw, Award } from "lucide-react";
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
  const [selectedColor, setSelectedColor] = useState("White");
  const [selectedCapacity, setSelectedCapacity] = useState("1.5 Ton");
  const [dealQtys, setDealQtys] = useState([1, 1, 1]);
  const [sellerAddons, setSellerAddons] = useState<(number | null)[]>([null, null, null, null]);
  const [reviewSubTab, setReviewSubTab] = useState<"product" | "seller">("product");

  const HASH_TO_TAB: Record<string, string> = {
    "#reviews": "reviews",
    "#description": "desc",
    "#specifications": "specs",
    "#questions": "qa",
  };
  const TAB_TO_HASH: Record<string, string> = {
    reviews: "#reviews",
    desc: "#description",
    specs: "#specifications",
    qa: "#questions",
  };

  const getTabFromHash = () => HASH_TO_TAB[window.location.hash] ?? "reviews";
  const [activeTab, setActiveTab] = useState(getTabFromHash);

  useEffect(() => {
    const onHashChange = () => setActiveTab(getTabFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    history.replaceState(null, "", window.location.pathname + window.location.search + TAB_TO_HASH[tab]);
  };

  const ADDONS = [
    { label: "Installation Only", price: 500 },
    { label: "Installation + Angle Bar", price: 1200 },
  ];

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
            <div className="font-bold text-slate-800 text-lg mb-5">
              {product.brand}
            </div>

            {/* Variant Selector */}
            <div className="flex flex-col gap-4 mb-5 pb-5 border-b border-slate-100">
              {/* Color */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-semibold text-slate-500 w-20 shrink-0">
                  Color: <span className="text-slate-900">{selectedColor}</span>
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {[
                    { label: "White", hex: "#f1f5f9" },
                    { label: "Black", hex: "#1e293b" },
                    { label: "Silver", hex: "#94a3b8" },
                  ].map(c => (
                    <button
                      key={c.label}
                      onClick={() => setSelectedColor(c.label)}
                      title={c.label}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        selectedColor === c.label
                          ? "border-primary scale-110 shadow-md shadow-primary/20"
                          : "border-slate-200 hover:border-primary/40"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Capacity */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-semibold text-slate-500 w-20 shrink-0">
                  Capacity:
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  {["1.0 Ton", "1.5 Ton", "2.0 Ton", "2.5 Ton"].map(cap => (
                    <button
                      key={cap}
                      onClick={() => setSelectedCapacity(cap)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                        selectedCapacity === cap
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-slate-200 text-slate-600 hover:border-primary/40 hover:text-slate-900"
                      }`}
                    >
                      {cap}
                    </button>
                  ))}
                </div>
              </div>
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

            {/* Pricing Breakdown */}
            {(() => {
              const regularPrice   = currentPrice * quantity;
              const discountPromo    = 300;
              const discountReferral = 300;
              const discountVisa     = Math.min(Math.round(regularPrice * 0.05), 1500);
              const discountAdvPay   = Math.round(regularPrice * 0.01);
              const checkoutLowest   = regularPrice - discountPromo - discountReferral - discountVisa - discountAdvPay;
              const itemLabel        = String(quantity).padStart(2, "0");
              return (
                <div className="border-y border-slate-100 py-4 mb-5 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 font-medium">
                      Regular Price <span className="text-slate-400 font-normal">({itemLabel} item{quantity !== 1 ? "s" : ""})</span>
                    </span>
                    <span className="font-bold text-slate-900">৳ {regularPrice.toLocaleString()}</span>
                  </div>
                  {quantity > 1 && (
                    <div className="text-[10px] text-emerald-600 font-bold text-right -mt-1">Bulk discount applied!</div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Discount <span className="text-emerald-700 font-semibold">(Promo BOOM30*)</span></span>
                    <span className="font-bold text-emerald-600">- ৳ {discountPromo.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Discount <span className="text-emerald-700 font-semibold">(Referral 2254152)</span></span>
                    <span className="font-bold text-emerald-600">- ৳ {discountReferral.toLocaleString()}</span>
                  </div>
                  <div className="flex items-start justify-between text-sm gap-2">
                    <span className="text-slate-500 leading-snug">Discount <span className="text-emerald-700 font-semibold">(5% Off* Visa Card, upto ৳ 1,500)</span></span>
                    <span className="font-bold text-emerald-600 shrink-0">- ৳ {discountVisa.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Discount <span className="text-emerald-700 font-semibold">(1% Dis on Adv Pay)</span></span>
                    <span className="font-bold text-emerald-600">- ৳ {discountAdvPay.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-dashed border-slate-200">
                    <span className="font-extrabold text-slate-900 text-sm">Checkout Lowest</span>
                    <span className="font-black text-[#6c2bd9] text-base">৳ {checkoutLowest.toLocaleString()}/-</span>
                  </div>
                  <div className="pt-1 space-y-0.5">
                    <p className="text-[10px] text-slate-400"><span className="font-bold text-slate-500">*</span> Single Use Only</p>
                    <p className="text-[10px] text-slate-400"><span className="font-bold text-slate-500">**</span> All discounts are subject to proper use of promo codes and methods fulfilling eligibility.</p>
                  </div>
                </div>
              );
            })()}

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
            extraBadge: "Recommend",
            discount: 37,
            rating: "4.8", ratingCount: 153,
            insideShipping: { retail: "৳60+", b2b: "৳40+", avgDays: "avg. 2days" },
            outsideShipping: { retail: "৳120+", b2b: "৳80+", avgDays: "avg. 5days" },
            sold: 127, stock: "17", moqB2B: 10,
            checkoutLowest: 45970, save: 1430,
            hasAddons: true,
            promoOffer: null,
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
            extraBadge: null,
            discount: 37,
            rating: "4.9", ratingCount: 89,
            insideShipping: { retail: "৳60+", b2b: "৳40+", avgDays: "avg. 3days" },
            outsideShipping: { retail: "৳120+", b2b: "৳80+", avgDays: "avg. 6days" },
            sold: 13, stock: "17", moqB2B: 10,
            checkoutLowest: 46200, save: 1200,
            hasAddons: false,
            promoOffer: { icon: "💳", title: "City Bank Card Offer", desc: "5% cashback, max ৳500 on all City Bank Cards" },
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
            extraBadge: null,
            discount: 35,
            rating: "4.7", ratingCount: 42,
            insideShipping: { retail: "৳60+", b2b: "৳40+", avgDays: "avg. 2days" },
            outsideShipping: { retail: "৳120+", b2b: "৳80+", avgDays: "avg. 5days" },
            sold: 13, stock: "17", moqB2B: 10,
            checkoutLowest: 46500, save: 900,
            hasAddons: true,
            promoOffer: null,
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
            extraBadge: null,
            discount: 33,
            rating: null, ratingCount: 0,
            insideShipping: { retail: "৳60+", b2b: "৳40+", avgDays: "avg. 4days" },
            outsideShipping: { retail: "৳120+", b2b: "৳80+", avgDays: "avg. 7days" },
            sold: 5, stock: "24", moqB2B: 10,
            checkoutLowest: 47200, save: 700,
            hasAddons: false,
            promoOffer: { icon: "🎁", title: "Combo Offer", desc: "Free smart remote cover worth ৳399 with purchase" },
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
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedSeller(idx)}
                      className="border rounded-xl flex flex-col cursor-pointer transition-all border-slate-200 hover:border-primary/40 hover:shadow-md overflow-hidden"
                    >
                      {/* Discount badge strip */}
                      <div className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 text-center tracking-wide">
                        -{seller.discount}% OFF
                      </div>

                      <div className="p-3 flex flex-col gap-2.5 flex-1">
                        {/* Header: logo + name + rating */}
                        <div className="flex items-start gap-2">
                          <div className="w-11 h-11 rounded-lg bg-blue-900 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                            <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none">
                              <circle cx="20" cy="20" r="20" fill="#1e3a5f"/>
                              <path d="M14 14 C14 14 16 10 20 10 C24 10 26 14 26 14 L28 28 L20 24 L12 28 Z" fill="#e8b84b"/>
                              <path d="M17 18 C17 16 18.5 15 20 15 C21.5 15 23 16 23 18 C23 20 21.5 22 20 22 C18.5 22 17 20 17 18Z" fill="white"/>
                            </svg>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-0.5 flex-wrap leading-tight mb-0.5">
                              <span className="font-bold text-slate-900 text-[11px]">{seller.name}</span>
                              <CheckCircle2 className="w-3 h-3 text-blue-500 shrink-0" />
                            </div>
                            <div className="flex items-center gap-1 mb-1">
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${seller.badgeClass}`}>{seller.badge}</span>
                              {seller.extraBadge && (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border bg-violet-50 text-violet-700 border-violet-200">{seller.extraBadge}</span>
                              )}
                            </div>
                            {seller.rating ? (
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                <span className="text-[11px] font-bold text-amber-600">{seller.rating}</span>
                                <span className="text-[10px] text-slate-400">({seller.ratingCount})</span>
                              </div>
                            ) : (
                              <span className="text-[10px] text-slate-400 flex items-center gap-0.5"><Star className="w-2.5 h-2.5" /> No ratings yet</span>
                            )}
                            <p className="text-[10px] text-slate-500 flex items-center gap-0.5 mt-0.5">
                              <MapPin className="w-2.5 h-2.5" /> {product.seller.location}
                            </p>
                          </div>
                        </div>

                        {/* Facilities: horizontal scroll row */}
                        <div className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-hide">
                          {seller.facilities.map((f, fi) => {
                            const FIcon = f.icon;
                            return (
                              <span key={fi} className={`flex items-center gap-0.5 text-[9px] font-bold px-2 py-1 rounded-full border whitespace-nowrap shrink-0 ${f.color}`}>
                                <FIcon className="w-2.5 h-2.5 shrink-0" /> {f.label}
                              </span>
                            );
                          })}
                        </div>

                        {/* Delivery: 2-col with retail + B2B rates */}
                        <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                          <div className="bg-blue-50 rounded-lg p-2 border border-blue-100">
                            <p className="text-blue-600 font-bold flex items-center gap-1 mb-1.5">
                              <Truck className="w-3.5 h-3.5" /> Inside Dhaka
                            </p>
                            <p className="text-slate-400 text-[9px] mb-1">{seller.insideShipping.avgDays}</p>
                            <p className="text-slate-600">Retail (Upto 9): <span className="font-bold text-slate-800">{seller.insideShipping.retail}</span></p>
                            <p className="text-slate-600">B2B (9+): <span className="font-bold text-slate-800">{seller.insideShipping.b2b}</span></p>
                          </div>
                          <div className="bg-violet-50 rounded-lg p-2 border border-violet-100">
                            <p className="text-violet-600 font-bold flex items-center gap-1 mb-1.5">
                              <Package className="w-3.5 h-3.5" /> Outside Dhaka
                            </p>
                            <p className="text-slate-400 text-[9px] mb-1">{seller.outsideShipping.avgDays}</p>
                            <p className="text-slate-600">Retail (Upto 9): <span className="font-bold text-slate-800">{seller.outsideShipping.retail}</span></p>
                            <p className="text-slate-600">B2B (9+): <span className="font-bold text-slate-800">{seller.outsideShipping.b2b}</span></p>
                          </div>
                        </div>

                        {/* Addon section OR Promo offer (fixed height) */}
                        {seller.hasAddons ? (
                          <div onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-1.5">
                              <p className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Choose Addon:</p>
                            </div>
                            <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide">
                              {ADDONS.map((addon, ai) => {
                                const isSelected = sellerAddons[idx] === ai;
                                return (
                                  <button
                                    key={ai}
                                    onClick={() => setSellerAddons(prev => prev.map((v, pi) => pi === idx ? (v === ai ? null : ai) : v))}
                                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[10px] font-bold transition-all whitespace-nowrap shrink-0 ${
                                      isSelected
                                        ? "border-primary bg-primary/5 text-primary"
                                        : "border-slate-200 text-slate-600 hover:border-primary/40"
                                    }`}
                                  >
                                    <span className={`w-3 h-3 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? "border-primary bg-primary" : "border-slate-300"}`}>
                                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white block" />}
                                    </span>
                                    {addon.label} <span className="opacity-60">(৳{addon.price.toLocaleString()})</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg px-2.5 py-2 flex items-start gap-2">
                            <span className="text-base leading-none mt-0.5 shrink-0">{seller.promoOffer?.icon}</span>
                            <div className="min-w-0">
                              <p className="text-[10px] font-black text-amber-800 leading-tight">{seller.promoOffer?.title}</p>
                              <p className="text-[9px] text-amber-700 leading-snug mt-0.5">{seller.promoOffer?.desc}</p>
                            </div>
                          </div>
                        )}

                        {/* Price: 3-col (original+current | checkout lowest | save) */}
                        {(() => {
                          const addonIdx = seller.hasAddons ? sellerAddons[idx] : null;
                          const addonPrice = addonIdx !== null ? ADDONS[addonIdx].price : 0;
                          const currentPrice = product.price + addonPrice;
                          return (
                            <div className="grid grid-cols-3 gap-1 text-center">
                              <div className="flex flex-col">
                                <span className="text-[9px] text-slate-400 line-through leading-none mb-0.5">৳{product.originalPrice.toLocaleString()}</span>
                                <span className="font-heading font-black text-[13px] text-primary leading-tight">৳{currentPrice.toLocaleString()}</span>
                              </div>
                              <div className="flex flex-col border-x border-slate-100 px-1">
                                <span className="text-[9px] text-slate-400 leading-none mb-0.5">Checkout lowest</span>
                                <span className="font-heading font-black text-[12px] text-primary leading-tight">৳{seller.checkoutLowest.toLocaleString()}</span>
                              </div>
                              <div className="flex flex-col bg-rose-50 rounded-md px-1 py-0.5">
                                <span className="text-[9px] text-slate-400 leading-none mb-0.5">Save</span>
                                <span className="font-heading font-black text-[12px] text-rose-600 leading-tight">৳{(seller.save + addonPrice).toLocaleString()}</span>
                              </div>
                            </div>
                          );
                        })()}

                        {/* Stock badges row */}
                        <div className="grid grid-cols-3 gap-1 text-center text-[9px] font-bold">
                          <span className="bg-rose-50 text-rose-600 border border-rose-100 rounded-md py-1 px-0.5">Sold ({seller.sold})</span>
                          <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-md py-1 px-0.5">In Stock ({seller.stock})</span>
                          <span className="bg-violet-50 text-violet-700 border border-violet-100 rounded-md py-1 px-0.5">B2B MOQ {seller.moqB2B}</span>
                        </div>

                        {/* B2B Pricing tagline */}
                        <p className="text-[9px] text-slate-500 leading-snug">
                          Buy 10–19pcs at ৳46,999/-, 20–29pcs at ৳45,999/- and 30+ pcs at ৳44,999/-
                        </p>

                        {/* Qty + Buttons */}
                        {(() => {
                          const addonIdx = seller.hasAddons ? sellerAddons[idx] : null;
                          const addonPrice = addonIdx !== null ? ADDONS[addonIdx].price : 0;
                          const totalPrice = product.price + addonPrice;
                          return (
                            <div className="flex items-center gap-1.5 mt-auto" onClick={e => e.stopPropagation()}>
                              <div className="flex items-center border border-slate-200 rounded-md overflow-hidden h-8 shrink-0">
                                <button className="w-6 h-full flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold text-sm leading-none">-</button>
                                <div className="w-6 h-full flex items-center justify-center font-bold text-slate-900 border-x border-slate-200 text-xs">1</div>
                                <button className="w-6 h-full flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold text-sm leading-none">+</button>
                              </div>
                              <Button className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold h-8 text-[10px] px-1">
                                {addonPrice > 0 ? `৳${totalPrice.toLocaleString()}` : "Add to cart"}
                              </Button>
                              <Button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold h-8 text-[10px] px-1">
                                Buy Now
                              </Button>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Available Group Deals Section */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 mt-4">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-heading font-bold text-lg text-slate-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Available Group Deals
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">Join a group to unlock special discounted prices</p>
                </div>
                <Badge className="bg-purple-100 text-purple-700 border border-purple-200 hover:bg-purple-100 font-bold">
                  3 Active
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    seller: "Walton Official Store", badge: "Verified Seller", badgeClass: "bg-emerald-100 text-emerald-700 border-emerald-200",
                    mrp: 70900, groupPrice: 43999, bookingPrice: 500,
                    target: 100, joined: 32, orderLimit: 3,
                    expiry: "15/04/2026, 23:59:59",
                    reserved24h: 5, reservedWeek: 35,
                  },
                  {
                    seller: "Brand Direct BD", badge: "Brand Official", badgeClass: "bg-amber-100 text-amber-700 border-amber-200",
                    mrp: 70900, groupPrice: 44500, bookingPrice: 500,
                    target: 40, joined: 18, orderLimit: 2,
                    expiry: "20/04/2026, 23:59:59",
                    reserved24h: 3, reservedWeek: 18,
                  },
                  {
                    seller: "TechMart BD", badge: "Recommended", badgeClass: "bg-blue-100 text-blue-700 border-blue-200",
                    mrp: 70900, groupPrice: 45000, bookingPrice: 300,
                    target: 30, joined: 7, orderLimit: 3,
                    expiry: "30/04/2026, 23:59:59",
                    reserved24h: 2, reservedWeek: 11,
                  },
                ].map((deal, i) => {
                  const qty = dealQtys[i];
                  const setQty = (v: number) => setDealQtys(prev => prev.map((q, idx) => idx === i ? Math.max(1, Math.min(deal.orderLimit, v)) : q));
                  return (
                    <div key={i} className="border border-slate-200 rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-sm transition-all flex flex-col">

                      {/* Seller header */}
                      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-slate-100 bg-slate-50">
                        <div className="w-7 h-7 rounded-md bg-blue-900 flex items-center justify-center shrink-0">
                          <svg viewBox="0 0 40 40" className="w-5 h-5" fill="none">
                            <circle cx="20" cy="20" r="20" fill="#1e3a5f"/>
                            <path d="M14 14 C14 14 16 10 20 10 C24 10 26 14 26 14 L28 28 L20 24 L12 28 Z" fill="#e8b84b"/>
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-800 truncate">{deal.seller}</p>
                        </div>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${deal.badgeClass}`}>{deal.badge}</span>
                      </div>

                      <div className="p-4 flex flex-col gap-4 flex-1">
                        {/* Price row: MRP | Group Buy Price | Booking Price */}
                        <div className="grid grid-cols-3 gap-1 text-center divide-x divide-slate-100">
                          <div className="pr-2">
                            <p className="text-[10px] font-semibold text-slate-400 mb-0.5">MRP</p>
                            <p className="text-sm font-bold text-slate-500 line-through">৳{deal.mrp.toLocaleString()}</p>
                          </div>
                          <div className="px-2">
                            <p className="text-[10px] font-semibold text-slate-400 mb-0.5">Group Buy Price</p>
                            <p className="text-sm font-extrabold text-primary">৳{deal.groupPrice.toLocaleString()}</p>
                          </div>
                          <div className="pl-2">
                            <p className="text-[10px] font-semibold text-slate-400 mb-0.5">Booking Price</p>
                            <p className="text-sm font-extrabold text-emerald-600">৳{deal.bookingPrice.toLocaleString()}</p>
                          </div>
                        </div>

                        {/* Urgency / Social proof */}
                        <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
                          <span className="text-rose-500 text-base leading-none">🔥</span>
                          <p className="text-[11px] font-bold text-rose-700">
                            <span className="text-rose-600">{String(deal.reserved24h).padStart(2, "0")} items</span> reserved in last 24hrs!&nbsp;
                            <span className="text-rose-600">{deal.reservedWeek}</span> in this week!!
                          </p>
                        </div>

                        {/* N.B. note */}
                        <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-[11px] text-slate-600 leading-relaxed">
                          <span className="font-bold text-slate-800">N.B: This is a Group Buy Offer: </span>
                          If {deal.target} customers join this Group Buy deal by {deal.expiry.split(",")[0]}, each participant will receive the product at a special price of ৳{deal.groupPrice.toLocaleString()}. If the required number of participants is not reached within the deadline, the deal will be cancelled and all booking payments will be fully refunded. One participant can order maximum of {deal.orderLimit} units of product in a single order.
                        </div>

                        {/* Order Limit note */}
                        <p className="text-[11px] font-bold text-slate-700">
                          Order Limit: <span className="font-semibold text-slate-500">Maximum {deal.orderLimit} units per participant.</span>
                        </p>

                        {/* Info row: Target Group | Expired On | Order Limit */}
                        <div className="grid grid-cols-3 gap-1 text-center divide-x divide-slate-100 border border-slate-100 rounded-lg py-2.5 bg-slate-50">
                          <div>
                            <p className="text-[9px] font-semibold text-slate-400 mb-0.5">Target Group</p>
                            <p className="text-xs font-extrabold text-slate-800">{deal.target}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-semibold text-slate-400 mb-0.5">Expired On</p>
                            <p className="text-[10px] font-bold text-slate-800 leading-tight">{deal.expiry}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-semibold text-slate-400 mb-0.5">Order Limit</p>
                            <p className="text-xs font-extrabold text-slate-800">0{deal.orderLimit} units/participant</p>
                          </div>
                        </div>

                        {/* Progress */}
                        <div>
                          <div className="flex justify-between text-[10px] font-bold mb-1.5">
                            <span className="text-slate-600">{deal.joined} joined</span>
                            <span className="text-primary">{deal.target - deal.joined} more needed</span>
                          </div>
                          <Progress value={Math.round((deal.joined / deal.target) * 100)} className="h-1.5 bg-slate-100 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-indigo-500" />
                        </div>

                        {/* Delivery info checklist */}
                        <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 overflow-hidden">
                          <div className="flex items-center gap-2.5 px-3 py-2.5 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                            <span className="text-[10px] font-extrabold text-primary bg-primary/10 rounded-full w-4 h-4 flex items-center justify-center shrink-0">1</span>
                            <span className="text-[11px] font-semibold text-slate-700">Add Delivery Info</span>
                            <ChevronRight className="w-3 h-3 text-slate-400 ml-auto" />
                          </div>
                          <div className="flex items-center gap-2.5 px-3 py-2.5 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                            <span className="text-[10px] font-extrabold text-primary bg-primary/10 rounded-full w-4 h-4 flex items-center justify-center shrink-0">2</span>
                            <span className="text-[11px] font-semibold text-slate-700">Estimated Delivery Time</span>
                            <ChevronRight className="w-3 h-3 text-slate-400 ml-auto" />
                          </div>
                        </div>

                        {/* Actions: qty + Add to Cart + Join the Group */}
                        <div className="flex items-center gap-2 mt-auto pt-1">
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden h-9 shrink-0">
                            <button onClick={() => setQty(qty - 1)} className="w-8 h-full flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold text-base leading-none">-</button>
                            <div className="w-8 h-full flex items-center justify-center font-bold text-slate-900 border-x border-slate-200 text-xs">{String(qty).padStart(2, "0")}</div>
                            <button onClick={() => setQty(qty + 1)} className="w-8 h-full flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold text-base leading-none">+</button>
                          </div>
                          <Button variant="outline" className="flex-1 font-bold h-9 text-[11px] border-slate-300 text-slate-700 hover:bg-slate-50 px-2">
                            ADD TO CART
                          </Button>
                          <Button className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold h-9 text-[11px] px-2">
                            JOIN THE GROUP
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tabs Section */}
            {(() => {
              const REVIEW_RATINGS = [{ stars: 5, count: 74 }, { stars: 4, count: 31 }, { stars: 3, count: 14 }, { stars: 2, count: 6 }, { stars: 1, count: 3 }];
              const TOTAL_REVIEWS = 128;

              const PRODUCT_REVIEWS = [
                {
                  name: "Rahim Uddin", rating: 5, date: "Feb 12, 2025",
                  memberSince: "12/04/2023", purchases: 124,
                  seller: "Walton Official Store", storeType: "Electropia Flagship Store",
                  text: "Excellent product! The cooling is very fast and it's super quiet. Installation was smooth and the free installation service was great. Highly recommend to everyone!",
                  images: [
                    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=200&q=80",
                    "https://images.unsplash.com/photo-1631248422043-e9bb6e60e42d?w=200&q=80",
                    "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=200&q=80",
                  ],
                  sellerReply: { from: "Walton Official Store", date: "Feb 13, 2025", text: "Thank you so much for your wonderful review, Rahim bhai! We're thrilled you're happy with the product and our installation team. We hope to serve you again soon!" },
                },
                {
                  name: "Kamal Hossain", rating: 4, date: "Jan 28, 2025",
                  memberSince: "03/09/2022", purchases: 37,
                  seller: "Walton Official Store", storeType: "Walton Official Store",
                  text: "Good air conditioner, very energy efficient. The inverter technology really does save electricity. Only minor complaint is the remote control could be better designed.",
                  images: [
                    "https://images.unsplash.com/photo-1607400201515-c2c41c07d307?w=200&q=80",
                  ],
                  sellerReply: null,
                },
                {
                  name: "Sumaiya Begum", rating: 5, date: "Jan 15, 2025",
                  memberSince: "18/11/2024", purchases: 8,
                  seller: "Walton Official Store", storeType: "Electropia Flagship Store",
                  text: "Best AC I've ever bought! Running for 2 months now without any issue. The auto-clean function is a bonus. Delivery was fast and packaging was excellent.",
                  images: [],
                  sellerReply: { from: "Electropia", date: "Jan 16, 2025", text: "Thank you for sharing your experience! We're delighted to know the auto-clean function impressed you. Please feel free to reach out if you need any assistance." },
                },
              ];

              const SELLER_REVIEWS = [
                {
                  name: "Farhan Ahmed", rating: 5, date: "Mar 05, 2025",
                  memberSince: "22/06/2023", purchases: 56,
                  seller: "Walton Official Store", storeType: "Electropia Flagship Store",
                  text: "Very professional seller. Packed the product extremely well and delivered right on time. Customer support was responsive when I had a query. Will definitely buy from them again!",
                  images: [
                    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=200&q=80",
                  ],
                  sellerReply: { from: "Walton Official Store", date: "Mar 06, 2025", text: "Thank you, Farhan bhai! It was a pleasure serving you. We always strive to deliver on time and keep our customers happy." },
                },
                {
                  name: "Nasrin Akter", rating: 4, date: "Feb 20, 2025",
                  memberSince: "07/03/2024", purchases: 12,
                  seller: "Walton Official Store", storeType: "Walton Official Store",
                  text: "Good seller overall. Responsive communication and proper packaging. Minor delay in delivery but acceptable given the distance.",
                  images: [],
                  sellerReply: null,
                },
              ];

              const QA_ITEMS = [
                {
                  asker: "Md. Sumon Miah", purchaseCount: 2, memberSince: "12/01/2026",
                  type: "general",
                  question: "Is this AC suitable for a 200 sq ft room? What power setting should I use?",
                  replies: [
                    { from: "Electropia", avatar: "E", color: "bg-primary", text: "Yes, the 1.5 Ton capacity is ideal for a room between 150–200 sq ft. For a 200 sq ft room, we recommend setting it to Auto mode initially and letting the inverter adjust. Feel free to contact us for further guidance!" },
                  ],
                },
                {
                  asker: "Md. Sumon Miah", purchaseCount: 0, memberSince: "12/01/2026",
                  type: "seller",
                  targetSeller: "Walton Official Store",
                  question: "Do you provide free installation across all districts? What about Sylhet?",
                  replies: [
                    { from: "Walton Official Store", avatar: "W", color: "bg-amber-600", text: "We provide free installation within Dhaka city and selected areas. For Sylhet, installation charges apply — typically ৳500–৳800 depending on your specific location. Please message us directly for a confirmed quote." },
                    { from: "Electropia", avatar: "E", color: "bg-primary", text: "We'd also like to add that our logistics team can help coordinate installation support in major cities outside Dhaka through our authorized service partners." },
                  ],
                },
                {
                  asker: "Tasnim Jahan", purchaseCount: 14, memberSince: "05/08/2023",
                  type: "general",
                  question: "What is the warranty coverage and who handles it — the seller or the brand directly?",
                  replies: [
                    { from: "Electropia", avatar: "E", color: "bg-primary", text: "The product comes with a manufacturer's warranty handled directly by SAFE Electronics Bangladesh. For any warranty claims, you can contact them at their nearest service center or through our platform's warranty support system." },
                  ],
                },
              ];

              const renderStars = (rating: number, size = "w-3.5 h-3.5") =>
                [1,2,3,4,5].map(s => (
                  <Star key={s} className={`${size} ${s <= rating ? "fill-amber-400 text-amber-400" : "text-slate-200 fill-slate-200"}`} />
                ));

              const ReviewCard = ({ review }: { review: typeof PRODUCT_REVIEWS[0] }) => (
                <div className="border border-slate-100 rounded-xl p-5 bg-slate-50/40">
                  {/* Reviewer info row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm shrink-0">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-900">{review.name}</p>
                        <div className="flex items-center gap-1 my-0.5">{renderStars(review.rating)}</div>
                        <p className="text-[11px] font-bold text-slate-500">Rated {String(review.rating).padStart(2,"0")} out of 05</p>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 shrink-0">{review.date}</span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      ✓ Verified Purchase from {review.storeType}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                      Joined {review.memberSince}
                    </span>
                    <span className="text-[10px] font-semibold text-violet-700 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-full">
                      {review.purchases} items bought so far
                    </span>
                  </div>

                  {/* Review text */}
                  <p className="text-sm text-slate-700 leading-relaxed mb-3">{review.text}</p>

                  {/* Photo thumbnails */}
                  {review.images.length > 0 && (
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {review.images.map((img, ii) => (
                        <div key={ii} className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
                          <img src={img} alt={`Review photo ${ii+1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Seller Reply */}
                  {review.sellerReply && (
                    <div className="mt-3 bg-white border border-primary/15 rounded-lg p-3.5 ml-4 relative">
                      <div className="absolute -left-3 top-4 w-5 h-5 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center text-[8px] font-black text-primary">↳</div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[11px] font-black text-primary uppercase tracking-wide">Reply from {review.sellerReply.from}</span>
                        <span className="text-[10px] text-slate-400">{review.sellerReply.date}</span>
                      </div>
                      <p className="text-[12px] text-slate-600 leading-relaxed">{review.sellerReply.text}</p>
                    </div>
                  )}
                </div>
              );

              return (
                <div className="bg-white border border-slate-200 rounded-xl mt-4 overflow-hidden">
                  <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="w-full justify-start rounded-none border-b border-slate-200 bg-slate-50 h-auto p-0">
                      <TabsTrigger value="reviews" className="rounded-none py-4 px-8 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:shadow-none font-bold text-slate-600 data-[state=active]:text-primary">Reviews</TabsTrigger>
                      <TabsTrigger value="desc" className="rounded-none py-4 px-8 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:shadow-none font-bold text-slate-600 data-[state=active]:text-primary">Description</TabsTrigger>
                      <TabsTrigger value="specs" className="rounded-none py-4 px-8 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:shadow-none font-bold text-slate-600 data-[state=active]:text-primary">Specifications</TabsTrigger>
                      <TabsTrigger value="qa" className="rounded-none py-4 px-8 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-white data-[state=active]:shadow-none font-bold text-slate-600 data-[state=active]:text-primary">Questions & Answers</TabsTrigger>
                    </TabsList>
                    <div className="p-8">

                      {/* ── REVIEWS TAB ── */}
                      <TabsContent value="reviews" className="mt-0">

                        {/* Rating summary */}
                        <div className="flex items-center gap-10 mb-6 pb-6 border-b border-slate-100">
                          <div className="text-center shrink-0">
                            <p className="font-heading font-black text-5xl text-slate-900">4.6</p>
                            <div className="flex items-center justify-center gap-0.5 my-2">{renderStars(5, "w-4 h-4")}</div>
                            <p className="text-xs text-slate-500 font-semibold">{TOTAL_REVIEWS} reviews</p>
                          </div>
                          <div className="flex-1 space-y-1.5">
                            {REVIEW_RATINGS.map(r => (
                              <div key={r.stars} className="flex items-center gap-3">
                                <span className="text-xs font-bold text-slate-600 w-4 text-right">{r.stars}</span>
                                <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${Math.round(r.count / TOTAL_REVIEWS * 100)}%` }} />
                                </div>
                                <span className="text-xs font-bold text-slate-500 w-7 text-right">{r.count}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Sub-tab toggle */}
                        <div className="flex gap-2 mb-6">
                          {(["product", "seller"] as const).map(tab => (
                            <button
                              key={tab}
                              onClick={() => setReviewSubTab(tab)}
                              className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                                reviewSubTab === tab
                                  ? "bg-primary text-white border-primary shadow-sm"
                                  : "bg-white text-slate-600 border-slate-200 hover:border-primary/40"
                              }`}
                            >
                              {tab === "product" ? `Reviews On This Product (${TOTAL_REVIEWS})` : `Reviews On This Seller (${SELLER_REVIEWS.length})`}
                            </button>
                          ))}
                        </div>

                        {/* Review list */}
                        <div className="space-y-4">
                          {(reviewSubTab === "product" ? PRODUCT_REVIEWS : SELLER_REVIEWS).map((review, i) => (
                            <ReviewCard key={i} review={review} />
                          ))}
                        </div>

                        {/* Load More */}
                        <div className="mt-8 flex justify-center">
                          <Button variant="outline" className="px-10 font-bold border-slate-300 text-slate-700 hover:border-primary hover:text-primary">
                            Load More Reviews
                          </Button>
                        </div>
                      </TabsContent>

                      {/* ── DESCRIPTION TAB ── */}
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

                      {/* ── SPECIFICATIONS TAB ── */}
                      <TabsContent value="specs" className="mt-0">
                        {/* Section 1: Product Specifications */}
                        <div className="mb-8">
                          <h3 className="font-heading font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
                            <span className="w-1 h-5 bg-primary rounded-full inline-block" />
                            Product Specifications
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-0 gap-x-12">
                            {Object.entries(product.specs).map(([key, value], i) => (
                              <div key={key} className={`flex justify-between py-3 border-b border-slate-100 ${i % 2 === 0 ? "bg-slate-50/50" : ""} px-2 rounded`}>
                                <span className="text-sm font-semibold text-slate-500">{key}</span>
                                <span className="text-sm font-bold text-slate-900 text-right">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Section 2: Seller Dependent Specifications */}
                        <div>
                          <h3 className="font-heading font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
                            <span className="w-1 h-5 bg-amber-400 rounded-full inline-block" />
                            Seller Dependent Specifications
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-0 gap-x-12">
                            {[
                              ["Warranty Coverage", active.shopInfo.returnPolicy.split(".")[0]],
                              ["Installation", active.facilities.some((f: {label: string}) => f.label === "Free Installation") ? "Free Installation Included" : "Charges applicable"],
                              ["Return Policy", `${active.shopInfo.returnPolicy.split(".")[0]}`],
                              ["After-sales Support", active.shopInfo.responseTime],
                              ["Shipping Area", "Inside & Outside Dhaka"],
                              ["Founded", active.shopInfo.founded],
                            ].map(([key, value], i) => (
                              <div key={key} className={`flex justify-between py-3 border-b border-slate-100 ${i % 2 === 0 ? "bg-amber-50/30" : ""} px-2 rounded`}>
                                <span className="text-sm font-semibold text-slate-500">{key}</span>
                                <span className="text-sm font-bold text-slate-900 text-right max-w-[55%]">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      {/* ── Q&A TAB ── */}
                      <TabsContent value="qa" className="mt-0">
                        <div className="space-y-6">
                          {QA_ITEMS.map((item, i) => (
                            <div key={i} className="border border-slate-100 rounded-xl overflow-hidden">
                              {/* Question */}
                              <div className="bg-slate-50 p-4">
                                <div className="flex items-start gap-3">
                                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm shrink-0">
                                    {item.asker.charAt(0)}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                      <span className="font-bold text-sm text-slate-900">{item.asker}</span>
                                      <span className="text-[10px] text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                                        {item.purchaseCount} verified purchase{item.purchaseCount !== 1 ? "s" : ""} since {item.memberSince}
                                      </span>
                                    </div>
                                    <p className="text-[11px] font-semibold text-slate-500 mb-2">
                                      asked a{" "}
                                      {item.type === "general"
                                        ? <span className="text-primary font-bold">General Question</span>
                                        : <span>Question to <span className="text-amber-600 font-bold">{(item as typeof item & { targetSeller: string }).targetSeller}</span></span>
                                      }
                                    </p>
                                    <p className="text-sm text-slate-800 font-medium leading-relaxed">{item.question}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Replies */}
                              {item.replies.map((reply, ri) => (
                                <div key={ri} className="border-t border-slate-100 p-4 bg-white">
                                  <div className="flex items-start gap-3">
                                    <div className={`w-7 h-7 rounded-full ${reply.color} flex items-center justify-center font-black text-white text-[11px] shrink-0`}>
                                      {reply.avatar}
                                    </div>
                                    <div>
                                      <p className="text-[11px] font-black text-slate-700 mb-1">
                                        Replied by <span className={reply.from === "Electropia" ? "text-primary" : "text-amber-600"}>{reply.from}:</span>
                                      </p>
                                      <p className="text-sm text-slate-600 leading-relaxed">{reply.text}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-center">
                          <p className="text-sm text-slate-500 mb-3">Have a question about this product?</p>
                          <Button className="bg-primary hover:bg-primary/90 text-white font-bold">Ask a Question</Button>
                        </div>
                      </TabsContent>

                    </div>
                  </Tabs>
                </div>
              );
            })()}
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
