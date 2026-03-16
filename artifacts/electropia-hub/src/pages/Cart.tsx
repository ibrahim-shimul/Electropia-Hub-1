import { useState } from "react";
import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";

// Mock Data structure based on the image provided
const INITIAL_CART = [
  {
    storeId: "store-1",
    storeName: "Tech Gadgets BD",
    rating: 4.9,
    reviews: 154,
    shippingAddress: "Vill: Dhamrai, P.O: Hemayetpur, HUB: Natun Bazar P.S: Nabinagar, Dist: Savar",
    shippingCharge: 1620,
    items: [
      {
        id: "item-1",
        name: "SAFE E18KINV Intelligent Inverter Split Air Conditioner - 1.5 Ton",
        details: "Residential AC, Inverter, Air Conditioner Variant: Color: Blue, Size: XXL",
        sku: "99998888",
        stock: 929,
        originalPrice: 76000,
        price: 56900,
        quantity: 4,
        image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=100",
        selected: true,
      },
      {
        id: "item-2",
        name: "GREE Washing Machine XWKQB-80-1Ga2 (8.0 KG) Top Loading",
        details: "Washing Machine, Inverter, Top Loading",
        sku: "77776666",
        stock: 327,
        originalPrice: 47700,
        price: 40545,
        quantity: 4,
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=100",
        selected: true,
      }
    ]
  },
  {
    storeId: "store-2",
    storeName: "Electro Mart",
    rating: 4.9,
    reviews: 154,
    shippingAddress: "Vill: Telikhal, P.O: Ghagra Bazar, HUB: Natun Bazar P.S: Mithamoin, Dist: Kishoreganj",
    shippingCharge: 1450,
    items: [
      {
        id: "item-3",
        name: "Samsung 55\" QLED 4K Smart TV",
        details: "Smart TV, 4K Resolution, QLED Display",
        sku: "88887777",
        stock: 150,
        originalPrice: 85000,
        price: 79900,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=100",
        selected: false,
      },
      {
        id: "item-4",
        name: "Sony Soundbar with Wireless Subwoofer",
        details: "Audio, Soundbar, Bluetooth connectivity",
        sku: "66665555",
        stock: 85,
        originalPrice: 25000,
        price: 22500,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1542728928-1413d1894ed1?auto=format&fit=crop&q=80&w=100",
        selected: false,
      }
    ]
  }
];

export default function Cart() {
  const [, setLocation] = useLocation();
  const [cartStores, setCartStores] = useState(INITIAL_CART);
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(15185);

  const handleQuantityChange = (storeId: string, itemId: string, change: number) => {
    setCartStores(prev => prev.map(store => {
      if (store.storeId === storeId) {
        return {
          ...store,
          items: store.items.map(item => {
            if (item.id === itemId) {
              const newQty = Math.max(1, item.quantity + change);
              return { ...item, quantity: newQty };
            }
            return item;
          })
        };
      }
      return store;
    }));
  };

  const handleItemSelect = (storeId: string, itemId: string, checked: boolean) => {
    setCartStores(prev => prev.map(store => {
      if (store.storeId === storeId) {
        return {
          ...store,
          items: store.items.map(item => 
            item.id === itemId ? { ...item, selected: checked } : item
          )
        };
      }
      return store;
    }));
  };

  const handleStoreSelect = (storeId: string, checked: boolean) => {
    setCartStores(prev => prev.map(store => {
      if (store.storeId === storeId) {
        return {
          ...store,
          items: store.items.map(item => ({ ...item, selected: checked }))
        };
      }
      return store;
    }));
  };

  const handleSelectAll = (checked: boolean) => {
    setCartStores(prev => prev.map(store => ({
      ...store,
      items: store.items.map(item => ({ ...item, selected: checked }))
    })));
  };

  const handleDeleteItem = (storeId: string, itemId: string) => {
    setCartStores(prev => prev.map(store => {
      if (store.storeId === storeId) {
        return {
          ...store,
          items: store.items.filter(item => item.id !== itemId)
        };
      }
      return store;
    }).filter(store => store.items.length > 0)); // Remove store if no items left
  };

  // Calculations
  const allSelected = cartStores.every(store => store.items.every(item => item.selected)) && cartStores.length > 0;
  
  let totalProductPrice = 0;
  
  const selectedStoresData = cartStores.map(store => {
    const selectedItems = store.items.filter(item => item.selected);
    const storeSubtotal = selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    if (selectedItems.length > 0) {
      totalProductPrice += storeSubtotal;
    }
    return {
      ...store,
      selectedItems,
      storeSubtotal,
      hasSelected: selectedItems.length > 0,
      allStoreSelected: selectedItems.length === store.items.length
    };
  }).filter(store => store.hasSelected);

  const totalShipping = selectedStoresData.reduce((acc, store) => acc + store.shippingCharge, 0);
  const totalItemsCount = cartStores.reduce((acc, store) => acc + store.items.length, 0);
  const payableTotal = totalProductPrice + totalShipping - appliedDiscount;

  return (
    <div className="flex flex-col gap-6 pb-12 mt-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
        <ShoppingCart className="w-6 h-6 text-slate-700" />
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-900">Shopping Cart</h1>
          <p className="text-sm text-slate-500">{totalItemsCount} items in your cart</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Cart Items */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-200 bg-slate-50 text-sm font-bold text-slate-700 items-center">
              <div className="col-span-6 flex items-center gap-3">
                <Checkbox 
                  checked={allSelected} 
                  onCheckedChange={(c) => handleSelectAll(c as boolean)} 
                  className="data-[state=checked]:bg-[#6c2bd9] data-[state=checked]:border-[#6c2bd9]"
                />
                <span>Product Name</span>
                <button className="text-rose-500 text-xs font-semibold ml-2 hover:underline">Remove all items in the cart</button>
              </div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right pr-4">Subtotal</div>
            </div>

            {/* Store Groups */}
            {cartStores.map((store) => {
              const allStoreSelected = store.items.every(item => item.selected);
              const storeTotal = store.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
              
              return (
                <div key={store.storeId} className="border-b border-slate-200 last:border-b-0">
                  {/* Store Header */}
                  <div className="flex items-center justify-between p-4 bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <Checkbox 
                        checked={allStoreSelected}
                        onCheckedChange={(c) => handleStoreSelect(store.storeId, c as boolean)}
                        className="data-[state=checked]:bg-[#6c2bd9] data-[state=checked]:border-[#6c2bd9]"
                      />
                      <span className="font-bold text-slate-900">{store.storeName}</span>
                      <span className="text-amber-500 text-xs font-bold bg-amber-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                        ★ {store.rating} ({store.reviews})
                      </span>
                    </div>
                    <button className="text-slate-400 hover:text-rose-500 text-xs font-medium">Remove all</button>
                  </div>

                  {/* Items in Store */}
                  {store.items.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 gap-4 p-4 border-t border-slate-100 items-center">
                      {/* Product Info */}
                      <div className="col-span-6 flex gap-4">
                        <div className="pt-1">
                          <Checkbox 
                            checked={item.selected}
                            onCheckedChange={(c) => handleItemSelect(store.storeId, item.id, c as boolean)}
                            className="data-[state=checked]:bg-[#6c2bd9] data-[state=checked]:border-[#6c2bd9]"
                          />
                        </div>
                        <div className="w-16 h-16 bg-slate-50 rounded border border-slate-100 p-1 shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex flex-col">
                          <h4 className="font-bold text-[13px] text-slate-900 leading-snug line-clamp-2 hover:text-[#6c2bd9] cursor-pointer">{item.name}</h4>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{item.details}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">SKU: {item.sku} • Stock: {item.stock} pcs</p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-2 text-center flex flex-col justify-center">
                        {item.originalPrice > item.price && (
                          <span className="text-[11px] text-slate-400 line-through">Tk {(item.originalPrice).toLocaleString()}</span>
                        )}
                        <span className="font-extrabold text-slate-900">Tk {(item.price).toLocaleString()}</span>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-2 flex justify-center">
                        <div className="flex items-center border border-slate-200 rounded h-8 w-24">
                          <button 
                            onClick={() => handleQuantityChange(store.storeId, item.id, -1)}
                            className="w-8 h-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
                          ><Minus className="w-3 h-3" /></button>
                          <div className="flex-1 flex items-center justify-center font-bold text-sm text-slate-900 border-x border-slate-200 h-full">
                            {item.quantity}
                          </div>
                          <button 
                            onClick={() => handleQuantityChange(store.storeId, item.id, 1)}
                            className="w-8 h-full flex items-center justify-center text-white bg-[#6c2bd9] hover:bg-[#5821b0] transition-colors"
                          ><Plus className="w-3 h-3" /></button>
                        </div>
                      </div>

                      {/* Subtotal & Delete */}
                      <div className="col-span-2 flex items-center justify-end gap-3 pr-2">
                        <span className="font-extrabold text-slate-900">Tk {(item.price * item.quantity).toLocaleString()}</span>
                        <button 
                          onClick={() => handleDeleteItem(store.storeId, item.id)}
                          className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {/* Store Subtotal Footer */}
                  <div className="p-4 bg-slate-50 flex justify-end items-center gap-4 text-sm border-t border-slate-100">
                    <span className="text-slate-500">Subtotal for {store.storeName}:</span>
                    <span className="font-black text-lg text-slate-900">Tk {storeTotal.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}

            {/* Overall Product Total */}
            <div className="p-5 flex justify-end items-center gap-6 bg-white border-t border-slate-200">
              <span className="font-bold text-slate-700 text-lg">Total Product Price:</span>
              <span className="font-heading font-black text-2xl text-[#6c2bd9]">Tk {totalProductPrice.toLocaleString()}</span>
            </div>

          </div>
        </div>

        {/* Right Column: Cart Totals */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm sticky top-24">
            <h2 className="font-heading font-extrabold text-xl text-slate-900 mb-1">Cart Totals</h2>
            <p className="text-xs text-slate-500 mb-6">{selectedStoresData.reduce((acc, s) => acc + s.selectedItems.length, 0)} items in your cart</p>

            {/* Per Store Breakdown */}
            <div className="space-y-6 mb-6">
              {selectedStoresData.map(store => (
                <div key={store.storeId} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-sm text-slate-800">{store.storeName}</span>
                    <span className="text-amber-500 text-[10px] font-bold">★ {store.rating} ({store.reviews})</span>
                  </div>
                  
                  <div className="bg-slate-50 p-3 rounded-lg mb-3 border border-slate-100">
                    <p className="text-[11px] text-slate-600 mb-2 leading-relaxed">
                      <span className="font-semibold text-slate-700">Ships to:</span> {store.shippingAddress}
                    </p>
                    <button className="text-rose-500 text-xs font-bold hover:underline">Edit/Change Address</button>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-slate-500">
                      <span>Product Price</span>
                      <span>Tk {store.storeSubtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Shipping Charge</span>
                      <span>Tk {store.shippingCharge.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900 pt-1">
                      <span>Subtotal</span>
                      <span>Tk {(store.storeSubtotal + store.shippingCharge).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotal Aggregate */}
            <div className="flex justify-between font-black text-slate-900 text-lg py-4 border-y border-slate-200 mb-6">
              <span>Subtotal</span>
              <span>Tk {(totalProductPrice + totalShipping).toLocaleString()}</span>
            </div>

            {/* Promo Code */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-700 mb-2">Promo/Referral Code</label>
              <div className="flex gap-2">
                <Input 
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="promo code" 
                  className="bg-slate-50 focus-visible:ring-[#6c2bd9]/20"
                />
                <Button variant="outline" className="border-slate-300 font-bold px-6">Apply</Button>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between items-center mt-3 text-sm font-bold text-emerald-600">
                  <span>Applied Discount (BOOM30)</span>
                  <span>(-) Tk {appliedDiscount.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Grand Total */}
            <div className="bg-slate-50 rounded-xl p-5 text-center mb-6 border border-slate-100">
              <p className="text-sm font-bold text-slate-600 mb-1">Payable Total</p>
              <h3 className="font-heading font-black text-3xl text-slate-900 mb-1">TK. {payableTotal.toLocaleString()}</h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-wide">
                (Eight Lac Eighteen Thousand Five Hundred and Sixty Five BDT Only)
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button onClick={() => setLocation("/checkout")} className="w-full bg-[#6c2bd9] hover:bg-[#5821b0] text-white font-bold h-12 text-base shadow-lg shadow-purple-500/20">
                Proceed to Checkout
              </Button>
              <Button variant="ghost" className="w-full text-slate-500 hover:text-slate-900 hover:bg-slate-50 h-12">
                Continue Shopping
              </Button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
