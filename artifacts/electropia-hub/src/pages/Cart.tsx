import { useState } from "react";
import { Trash2, Minus, Plus, ShoppingCart, Users, Clock, ToggleLeft, ToggleRight, Store, Layers, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link, useLocation, useRoute } from "wouter";

// ─── MULTI-SHOP DATA ─────────────────────────────────────────────────────────
const MULTI_SHOP_CART_INITIAL = [
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
        type: "normal" as const,
        name: "SAFE E18KINV Intelligent Inverter Split Air Conditioner - 1.5 Ton",
        details: "Residential AC, Inverter | Color: Blue, Size: XXL",
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
        type: "normal" as const,
        name: "GREE Washing Machine XWKQB-80-1Ga2 (8.0 KG) Top Loading",
        details: "Washing Machine, Inverter, Top Loading",
        sku: "77776666",
        stock: 327,
        originalPrice: 47700,
        price: 40545,
        quantity: 4,
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=100",
        selected: true,
      },
      {
        id: "item-addon-1",
        type: "normal" as const,
        name: 'Samsung 65" QLED 4K Smart TV (QN65Q80C)',
        details: "Smart TV, 4K QLED, Quantum Processor, HDR10+",
        sku: "SM-QN65Q80C",
        stock: 18,
        originalPrice: 145000,
        price: 119000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=100",
        selected: true,
        addOns: [
          { id: "ao-1", name: "Professional Wall Mount Installation", price: 1800, selected: true },
          { id: "ao-2", name: "2-Year Extended Warranty (Samsung Care+)", price: 3500, selected: true },
          { id: "ao-3", name: "Premium HDMI 2.1 Cable (2m)", price: 450, selected: true },
        ],
      },
      {
        id: "gd-1",
        type: "group_deal" as const,
        name: "Philips Essential Airfryer HD9252/90 (4.1L)",
        details: "Kitchen Appliance, 1400W, Rapid Air Technology",
        sku: "GD-00124",
        stock: 50,
        originalPrice: 12500,
        price: 10500,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=100",
        selected: true,
        groupDeal: {
          dealId: "GD-001",
          joined: 45,
          target: 50,
          endsIn: "14h 20m",
          deposit: 200,
        },
      },
    ],
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
        type: "normal" as const,
        name: 'Samsung 55" QLED 4K Smart TV',
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
        type: "normal" as const,
        name: "Sony Soundbar with Wireless Subwoofer",
        details: "Audio, Soundbar, Bluetooth connectivity",
        sku: "66665555",
        stock: 85,
        originalPrice: 25000,
        price: 22500,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1542728928-1413d1894ed1?auto=format&fit=crop&q=80&w=100",
        selected: false,
      },
      {
        id: "gd-2",
        type: "group_deal" as const,
        name: "LG 320L Top Mount Refrigerator with Smart Inverter",
        details: "Refrigerator, 320L, Inverter Compressor",
        sku: "GD-00198",
        stock: 30,
        originalPrice: 45000,
        price: 40000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&q=80&w=100",
        selected: false,
        groupDeal: {
          dealId: "GD-002",
          joined: 12,
          target: 30,
          endsIn: "2d 6h",
          deposit: 500,
        },
      },
    ],
  },
];

// ─── SINGLE-SHOP DATA ─────────────────────────────────────────────────────────
const SINGLE_SHOP_CART_INITIAL = {
  storeId: "store-main",
  storeName: "Electropia Flagship Store",
  storeType: "Mall | Flagship Store",
  rating: 4.9,
  reviews: 312,
  shippingAddress: "House 42, Road 7, Block C, Banani, Dhaka-1213, Bangladesh",
  shippingCharge: 1200,
  items: [
    {
      id: "s-item-1",
      type: "normal" as const,
      name: "SAFE E18KINV Intelligent Inverter Split Air Conditioner - 1.5 Ton",
      details: "Residential AC, Inverter | Color: White, Size: 1.5 Ton",
      sku: "99998888",
      stock: 929,
      originalPrice: 76000,
      price: 56900,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=100",
      selected: true,
    },
    {
      id: "s-item-2",
      type: "normal" as const,
      name: "GREE Washing Machine XWKQB-80-1Ga2 (8.0 KG) Top Loading",
      details: "Washing Machine, Inverter, Top Loading",
      sku: "77776666",
      stock: 327,
      originalPrice: 47700,
      price: 40545,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=100",
      selected: true,
    },
    {
      id: "s-item-3",
      type: "normal" as const,
      name: 'Samsung 55" Crystal 4K UHD Smart TV (CU7700)',
      details: "Smart TV, 4K UHD, Crystal Processor, AirSlim Design",
      sku: "88880001",
      stock: 45,
      originalPrice: 89000,
      price: 65000,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=100",
      selected: false,
    },
    {
      id: "s-item-addon",
      type: "normal" as const,
      name: 'Samsung 65" QLED 4K Smart TV (QN65Q80C)',
      details: "Smart TV, 4K QLED, Quantum Processor, HDR10+",
      sku: "SM-QN65Q80C",
      stock: 18,
      originalPrice: 145000,
      price: 119000,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=100",
      selected: true,
      addOns: [
        { id: "sao-1", name: "Professional Wall Mount Installation", price: 1800, selected: true },
        { id: "sao-2", name: "2-Year Extended Warranty (Samsung Care+)", price: 3500, selected: true },
        { id: "sao-3", name: "Premium HDMI 2.1 Cable (2m)", price: 450, selected: true },
      ],
    },
  ],
  groupDealItems: [
    {
      id: "sgd-1",
      type: "group_deal" as const,
      name: "Philips Essential Airfryer HD9252/90 (4.1L)",
      details: "Kitchen Appliance, 1400W, Rapid Air Technology",
      sku: "GD-00124",
      stock: 50,
      originalPrice: 12500,
      price: 10500,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=100",
      selected: true,
      groupDeal: {
        dealId: "GD-001",
        joined: 45,
        target: 50,
        endsIn: "14h 20m",
        deposit: 200,
        remainingPayment: 10300,
      },
    },
    {
      id: "sgd-2",
      type: "group_deal" as const,
      name: "LG 320L Top Mount Refrigerator with Smart Inverter",
      details: "Refrigerator, 320L, Inverter Compressor",
      sku: "GD-00198",
      stock: 30,
      originalPrice: 45000,
      price: 40000,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&q=80&w=100",
      selected: false,
      groupDeal: {
        dealId: "GD-002",
        joined: 12,
        target: 30,
        endsIn: "2d 6h",
        deposit: 500,
        remainingPayment: 39500,
      },
    },
  ],
};

// ─── GROUP DEAL ITEM CARD ─────────────────────────────────────────────────────
function GroupDealItemRow({
  item,
  onSelect,
  onDelete,
}: {
  item: typeof SINGLE_SHOP_CART_INITIAL.groupDealItems[0];
  onSelect: (id: string, checked: boolean) => void;
  onDelete: (id: string) => void;
}) {
  const gd = item.groupDeal;
  const progress = Math.round((gd.joined / gd.target) * 100);
  return (
    <div className="grid grid-cols-12 gap-4 p-4 border-t border-slate-100 items-start bg-purple-50/40">
      {/* Checkbox + Image + Info */}
      <div className="col-span-6 flex gap-4">
        <div className="pt-1">
          <Checkbox
            checked={item.selected}
            onCheckedChange={(c) => onSelect(item.id, c as boolean)}
            className="data-[state=checked]:bg-[#6c2bd9] data-[state=checked]:border-[#6c2bd9]"
          />
        </div>
        <div className="w-16 h-16 bg-white rounded border border-purple-100 p-1 shrink-0">
          <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Badge className="bg-[#6c2bd9] text-white text-[9px] px-1.5 py-0.5 font-black tracking-wide rounded">🔥 GROUP DEAL</Badge>
            <span className="text-[10px] text-slate-400 font-semibold">ID: {gd.dealId}</span>
          </div>
          <h4 className="font-bold text-[13px] text-slate-900 leading-snug line-clamp-2 hover:text-[#6c2bd9] cursor-pointer">{item.name}</h4>
          <p className="text-[11px] text-slate-500 line-clamp-1">{item.details}</p>
          <p className="text-[10px] text-slate-400">SKU: {item.sku}</p>
        </div>
      </div>

      {/* Price */}
      <div className="col-span-2 text-center flex flex-col justify-start pt-1">
        <span className="text-[11px] text-slate-400 line-through">Tk {item.originalPrice.toLocaleString()}</span>
        <span className="font-extrabold text-[#6c2bd9]">Tk {item.price.toLocaleString()}</span>
        <span className="text-[10px] text-emerald-600 font-bold mt-0.5">
          Save Tk {(item.originalPrice - item.price).toLocaleString()}
        </span>
      </div>

      {/* Group Deal Progress */}
      <div className="col-span-2 flex flex-col gap-1.5 pt-1">
        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700">
          <Users className="w-3 h-3 text-[#6c2bd9]" />
          {gd.joined}/{gd.target} joined
        </div>
        <Progress value={progress} className="h-1.5 bg-purple-100 [&>div]:bg-[#6c2bd9]" />
        <div className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold">
          <Clock className="w-2.5 h-2.5" /> Ends: {gd.endsIn}
        </div>
        <div className="text-[10px] text-slate-500">
          Deposit paid: <strong className="text-slate-700">Tk {gd.deposit}</strong>
        </div>
      </div>

      {/* Subtotal + Delete */}
      <div className="col-span-2 flex items-start justify-end gap-3 pr-2 pt-1">
        <div className="text-right">
          <div className="font-extrabold text-slate-900">Tk {item.price.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Qty: 1 (fixed)</div>
        </div>
        <button onClick={() => onDelete(item.id)} className="text-slate-300 hover:text-rose-500 transition-colors p-1">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Cart() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/cart/:version");
  const cartVersion: "multi" | "single" = params?.version === "single" ? "single" : "multi";

  // Multi-shop state
  const [multiCart, setMultiCart] = useState(MULTI_SHOP_CART_INITIAL);

  // Single-shop state
  const [singleStore, setSingleStore] = useState(SINGLE_SHOP_CART_INITIAL);

  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(15185);

  // ── Multi-shop handlers ──
  const multiHandleQtyChange = (storeId: string, itemId: string, change: number) => {
    setMultiCart(prev => prev.map(store => store.storeId !== storeId ? store : {
      ...store,
      items: store.items.map(item => item.id !== itemId ? item : {
        ...item, quantity: item.type === "group_deal" ? 1 : Math.max(1, item.quantity + change)
      })
    }));
  };
  const multiHandleItemSelect = (storeId: string, itemId: string, checked: boolean) => {
    setMultiCart(prev => prev.map(store => store.storeId !== storeId ? store : {
      ...store, items: store.items.map(item => item.id !== itemId ? item : { ...item, selected: checked })
    }));
  };
  const multiHandleStoreSelect = (storeId: string, checked: boolean) => {
    setMultiCart(prev => prev.map(store => store.storeId !== storeId ? store : {
      ...store, items: store.items.map(item => ({ ...item, selected: checked }))
    }));
  };
  const multiHandleSelectAll = (checked: boolean) => {
    setMultiCart(prev => prev.map(store => ({ ...store, items: store.items.map(item => ({ ...item, selected: checked })) })));
  };
  const multiHandleDelete = (storeId: string, itemId: string) => {
    setMultiCart(prev => prev.map(store => store.storeId !== storeId ? store : {
      ...store, items: store.items.filter(item => item.id !== itemId)
    }).filter(store => store.items.length > 0));
  };
  const multiHandleDeleteAddon = (storeId: string, itemId: string, addonId: string) => {
    setMultiCart(prev => prev.map(store => store.storeId !== storeId ? store : {
      ...store, items: store.items.map(item => item.id !== itemId ? item : {
        ...item, addOns: (item as any).addOns?.filter((a: any) => a.id !== addonId)
      })
    }));
  };

  // ── Single-shop handlers ──
  const singleHandleQtyChange = (itemId: string, change: number) => {
    setSingleStore(prev => ({ ...prev, items: prev.items.map(item => item.id !== itemId ? item : { ...item, quantity: Math.max(1, item.quantity + change) }) }));
  };
  const singleHandleItemSelect = (itemId: string, checked: boolean) => {
    setSingleStore(prev => ({ ...prev, items: prev.items.map(item => item.id !== itemId ? item : { ...item, selected: checked }) }));
  };
  const singleHandleGdSelect = (itemId: string, checked: boolean) => {
    setSingleStore(prev => ({ ...prev, groupDealItems: prev.groupDealItems.map(item => item.id !== itemId ? item : { ...item, selected: checked }) }));
  };
  const singleHandleSelectAll = (checked: boolean) => {
    setSingleStore(prev => ({
      ...prev,
      items: prev.items.map(i => ({ ...i, selected: checked })),
      groupDealItems: prev.groupDealItems.map(i => ({ ...i, selected: checked })),
    }));
  };
  const singleHandleDeleteItem = (itemId: string) => {
    setSingleStore(prev => ({ ...prev, items: prev.items.filter(i => i.id !== itemId) }));
  };
  const singleHandleDeleteGd = (itemId: string) => {
    setSingleStore(prev => ({ ...prev, groupDealItems: prev.groupDealItems.filter(i => i.id !== itemId) }));
  };
  const singleHandleDeleteAddon = (itemId: string, addonId: string) => {
    setSingleStore(prev => ({
      ...prev,
      items: prev.items.map(item => item.id !== itemId ? item : {
        ...item, addOns: (item as any).addOns?.filter((a: any) => a.id !== addonId)
      })
    }));
  };

  // ── Multi-shop calculations ──
  const multiAllSelected = multiCart.every(s => s.items.every(i => i.selected)) && multiCart.length > 0;
  const multiTotalItems = multiCart.reduce((a, s) => a + s.items.length, 0);
  const multiSelectedStores = multiCart.map(store => {
    const selectedItems = store.items.filter(i => i.selected);
    const storeSubtotal = selectedItems.reduce((a, i) => a + i.price * i.quantity, 0);
    return { ...store, selectedItems, storeSubtotal, hasSelected: selectedItems.length > 0 };
  }).filter(s => s.hasSelected);
  const multiProductTotal = multiSelectedStores.reduce((a, s) => a + s.storeSubtotal, 0);
  const multiShipping = multiSelectedStores.reduce((a, s) => a + s.shippingCharge, 0);
  const multiPayable = multiProductTotal + multiShipping - appliedDiscount;

  // ── Single-shop calculations ──
  const singleNormalSelected = singleStore.items.filter(i => i.selected);
  const singleGdSelected = singleStore.groupDealItems.filter(i => i.selected);
  const singleAllSelected = singleStore.items.every(i => i.selected) && singleStore.groupDealItems.every(i => i.selected);
  const singleTotalItems = singleStore.items.length + singleStore.groupDealItems.length;
  const singleNormalTotal = singleNormalSelected.reduce((a, i) => a + i.price * i.quantity, 0);
  const singleGdTotal = singleGdSelected.reduce((a, i) => a + i.groupDeal.deposit, 0);
  const singleProductTotal = singleNormalTotal + singleGdTotal;
  const singlePayable = singleProductTotal + singleStore.shippingCharge - appliedDiscount;

  const activeVersion = cartVersion;

  return (
    <div className="flex flex-col gap-6 pb-12 mt-6 max-w-[1400px] mx-auto">

      {/* ── Header + Version Toggle ── */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-6 h-6 text-slate-700" />
          <div>
            <h1 className="font-heading font-extrabold text-2xl text-slate-900">Shopping Cart</h1>
            <p className="text-sm text-slate-500">
              {activeVersion === "multi" ? multiTotalItems : singleTotalItems} items in your cart
            </p>
          </div>
        </div>

        {/* Version Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
          <Link href="/cart/multi">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                cartVersion === "multi"
                  ? "bg-white text-[#6c2bd9] shadow-sm border border-slate-200"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Layers className="w-4 h-4" />
              Multi-Shop Cart
            </button>
          </Link>
          <Link href="/cart/single">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                cartVersion === "single"
                  ? "bg-white text-[#6c2bd9] shadow-sm border border-slate-200"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Store className="w-4 h-4" />
              Single-Shop Cart
            </button>
          </Link>
        </div>
      </div>

      {/* ── Version A: MULTI-SHOP CART ── */}
      {cartVersion === "multi" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-4">

            {/* Info banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-3 text-sm text-amber-800">
              <Layers className="w-4 h-4 shrink-0 text-amber-600" />
              <span><strong>Multi-Shop Cart:</strong> Products from different stores can be in the same cart. Each store is checked out separately with its own shipping.</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-200 bg-slate-50 text-sm font-bold text-slate-700 items-center">
                <div className="col-span-6 flex items-center gap-3">
                  <Checkbox checked={multiAllSelected} onCheckedChange={(c) => multiHandleSelectAll(c as boolean)} className="data-[state=checked]:bg-[#6c2bd9] data-[state=checked]:border-[#6c2bd9]" />
                  <span>Product Name</span>
                  <button className="text-rose-500 text-xs font-semibold ml-2 hover:underline">Remove all</button>
                </div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right pr-4">Subtotal</div>
              </div>

              {multiCart.map((store) => {
                const allStoreSelected = store.items.every(i => i.selected);
                const storeTotal = store.items.filter(i => i.selected).reduce((a, i) => a + i.price * i.quantity, 0);
                const normalItems = store.items.filter(i => i.type === "normal");
                const groupDealItems = store.items.filter(i => i.type === "group_deal");
                return (
                  <div key={store.storeId} className="border-b border-slate-200 last:border-b-0">
                    {/* Store Header */}
                    <div className="flex items-center justify-between p-4 bg-slate-50/50">
                      <div className="flex items-center gap-3">
                        <Checkbox checked={allStoreSelected} onCheckedChange={(c) => multiHandleStoreSelect(store.storeId, c as boolean)} className="data-[state=checked]:bg-[#6c2bd9] data-[state=checked]:border-[#6c2bd9]" />
                        <span className="font-bold text-slate-900">{store.storeName}</span>
                        <span className="text-amber-500 text-xs font-bold bg-amber-50 px-1.5 py-0.5 rounded">★ {store.rating} ({store.reviews})</span>
                      </div>
                      <button className="text-slate-400 hover:text-rose-500 text-xs font-medium">Remove all</button>
                    </div>

                    {/* Normal Items */}
                    {normalItems.map(item => {
                      const addOns = (item as any).addOns as {id:string;name:string;price:number}[] | undefined;
                      const addOnTotal = addOns?.reduce((s, a) => s + a.price, 0) ?? 0;
                      return (
                        <div key={item.id}>
                          <div className="grid grid-cols-12 gap-4 p-4 border-t border-slate-100 items-center">
                            <div className="col-span-6 flex gap-4">
                              <div className="pt-1"><Checkbox checked={item.selected} onCheckedChange={(c) => multiHandleItemSelect(store.storeId, item.id, c as boolean)} className="data-[state=checked]:bg-[#6c2bd9] data-[state=checked]:border-[#6c2bd9]" /></div>
                              <div className="w-16 h-16 bg-slate-50 rounded border border-slate-100 p-1 shrink-0"><img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" /></div>
                              <div className="flex flex-col">
                                <h4 className="font-bold text-[13px] text-slate-900 leading-snug line-clamp-2 hover:text-[#6c2bd9] cursor-pointer">{item.name}</h4>
                                <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{item.details}</p>
                                <p className="text-[10px] text-slate-400 mt-0.5">SKU: {item.sku} • Stock: {item.stock} pcs</p>
                                {addOns && addOns.length > 0 && (
                                  <span className="text-[10px] text-emerald-600 font-bold mt-1">+ {addOns.length} Add-On(s) included</span>
                                )}
                              </div>
                            </div>
                            <div className="col-span-2 text-center flex flex-col justify-center">
                              {item.originalPrice > item.price && <span className="text-[11px] text-slate-400 line-through">Tk {item.originalPrice.toLocaleString()}</span>}
                              <span className="font-extrabold text-slate-900">Tk {item.price.toLocaleString()}</span>
                              {addOnTotal > 0 && <span className="text-[10px] text-emerald-600 font-semibold">+Tk {addOnTotal.toLocaleString()} add-ons</span>}
                            </div>
                            <div className="col-span-2 flex justify-center">
                              <div className="flex items-center border border-slate-200 rounded h-8 w-24">
                                <button onClick={() => multiHandleQtyChange(store.storeId, item.id, -1)} className="w-8 h-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"><Minus className="w-3 h-3" /></button>
                                <div className="flex-1 flex items-center justify-center font-bold text-sm text-slate-900 border-x border-slate-200 h-full">{item.quantity}</div>
                                <button onClick={() => multiHandleQtyChange(store.storeId, item.id, 1)} className="w-8 h-full flex items-center justify-center text-white bg-[#6c2bd9] hover:bg-[#5821b0] transition-colors"><Plus className="w-3 h-3" /></button>
                              </div>
                            </div>
                            <div className="col-span-2 flex items-center justify-end gap-3 pr-2">
                              <div className="text-right">
                                <div className="font-extrabold text-slate-900">Tk {(item.price * item.quantity).toLocaleString()}</div>
                                {addOnTotal > 0 && <div className="text-[10px] text-emerald-600 font-semibold">+Tk {addOnTotal.toLocaleString()}</div>}
                              </div>
                              <button onClick={() => multiHandleDelete(store.storeId, item.id)} className="text-slate-300 hover:text-rose-500 transition-colors p-1"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </div>
                          {/* Add-On sub-rows */}
                          {addOns && addOns.length > 0 && (
                            <div className="border-t border-emerald-100 bg-emerald-50/40 px-4 py-2 space-y-1.5">
                              <p className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wide flex items-center gap-1.5 mb-1"><Wrench className="w-3 h-3" /> Add-On Services & Products</p>
                              {addOns.map(addon => (
                                <div key={addon.id} className="grid grid-cols-12 gap-4 items-center py-1 px-2 bg-white/60 rounded-lg border border-emerald-100">
                                  <div className="col-span-6 flex items-center gap-2 pl-10">
                                    <span className="text-[9px] font-black bg-emerald-600 text-white px-1.5 py-0.5 rounded tracking-wide shrink-0">ADD-ON</span>
                                    <span className="text-[12px] text-slate-700 font-medium">{addon.name}</span>
                                  </div>
                                  <div className="col-span-2 text-center text-[12px] font-semibold text-emerald-700">Tk {addon.price.toLocaleString()}</div>
                                  <div className="col-span-2 text-center text-[11px] text-slate-400">Qty: 1</div>
                                  <div className="col-span-2 flex items-center justify-end gap-2 pr-2">
                                    <span className="font-bold text-[12px] text-emerald-700">Tk {addon.price.toLocaleString()}</span>
                                    <button onClick={() => multiHandleDeleteAddon(store.storeId, item.id, addon.id)} className="text-slate-300 hover:text-rose-500 transition-colors p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Group Deal Items */}
                    {groupDealItems.length > 0 && (
                      <>
                        <div className="px-4 py-2 bg-purple-50 border-t border-purple-100 flex items-center gap-2">
                          <Badge className="bg-[#6c2bd9]/10 text-[#6c2bd9] border-[#6c2bd9]/20 text-[10px] font-black">🔥 GROUP DEAL ITEMS</Badge>
                          <span className="text-[11px] text-slate-500">Separate checkout required for group deal items</span>
                        </div>
                        {groupDealItems.map(item => {
                          const gd = (item as any).groupDeal;
                          const progress = Math.round((gd.joined / gd.target) * 100);
                          return (
                            <div key={item.id} className="grid grid-cols-12 gap-4 p-4 border-t border-purple-100 items-start bg-purple-50/30">
                              <div className="col-span-6 flex gap-4">
                                <div className="pt-1"><Checkbox checked={item.selected} onCheckedChange={(c) => multiHandleItemSelect(store.storeId, item.id, c as boolean)} className="data-[state=checked]:bg-[#6c2bd9] data-[state=checked]:border-[#6c2bd9]" /></div>
                                <div className="w-16 h-16 bg-white rounded border border-purple-100 p-1 shrink-0"><img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" /></div>
                                <div className="flex flex-col gap-0.5">
                                  <Badge className="bg-[#6c2bd9] text-white text-[9px] px-1.5 py-0.5 font-black w-fit">🔥 GROUP DEAL · {gd.dealId}</Badge>
                                  <h4 className="font-bold text-[13px] text-slate-900 leading-snug line-clamp-2">{item.name}</h4>
                                  <p className="text-[11px] text-slate-500 line-clamp-1">{item.details}</p>
                                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#6c2bd9]"><Users className="w-3 h-3" />{gd.joined}/{gd.target} joined</div>
                                  <Progress value={progress} className="h-1 w-24 bg-purple-100 [&>div]:bg-[#6c2bd9]" />
                                  <div className="flex items-center gap-1 text-[10px] text-slate-400"><Clock className="w-2.5 h-2.5" /> {gd.endsIn} left</div>
                                </div>
                              </div>
                              <div className="col-span-2 text-center flex flex-col justify-start pt-1">
                                <span className="text-[11px] text-slate-400 line-through">Tk {item.originalPrice.toLocaleString()}</span>
                                <span className="font-extrabold text-[#6c2bd9]">Tk {item.price.toLocaleString()}</span>
                              </div>
                              <div className="col-span-2 text-center pt-2 text-xs text-slate-500 font-semibold">Qty: 1<br/><span className="text-[10px] text-slate-400">(fixed)</span></div>
                              <div className="col-span-2 flex items-start justify-end gap-3 pr-2 pt-1">
                                <div className="text-right">
                                  <div className="font-extrabold text-slate-900">Deposit: Tk {gd.deposit}</div>
                                  <div className="text-[10px] text-slate-400">Full: Tk {item.price.toLocaleString()}</div>
                                </div>
                                <button onClick={() => multiHandleDelete(store.storeId, item.id)} className="text-slate-300 hover:text-rose-500 transition-colors p-1"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}

                    {/* Store Subtotal */}
                    <div className="p-4 bg-slate-50 flex justify-end items-center gap-4 text-sm border-t border-slate-100">
                      <span className="text-slate-500">Subtotal for {store.storeName}:</span>
                      <span className="font-black text-lg text-slate-900">Tk {storeTotal.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}

              <div className="p-5 flex justify-end items-center gap-6 bg-white border-t border-slate-200">
                <span className="font-bold text-slate-700 text-lg">Total Product Price:</span>
                <span className="font-heading font-black text-2xl text-[#6c2bd9]">Tk {multiProductTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Multi-shop Totals Sidebar */}
          <CartTotalsSidebar
            storeBreakdowns={multiSelectedStores.map(s => ({
              storeName: s.storeName, rating: s.rating, reviews: s.reviews,
              address: s.shippingAddress, shippingCharge: s.shippingCharge, subtotal: s.storeSubtotal,
            }))}
            productTotal={multiProductTotal}
            shippingTotal={multiShipping}
            itemCount={multiSelectedStores.reduce((a, s) => a + s.selectedItems.length, 0)}
            onCheckout={() => setLocation("/checkout")}
          />
        </div>
      )}

      {/* ── Version B: SINGLE-SHOP CART ── */}
      {cartVersion === "single" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-4">

            {/* Info banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-center gap-3 text-sm text-blue-800">
              <Store className="w-4 h-4 shrink-0 text-blue-600" />
              <span><strong>Single-Shop Cart:</strong> Only one shop's products can be in the cart at a time. Simpler logistics and unified checkout.</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-200 bg-slate-50 text-sm font-bold text-slate-700 items-center">
                <div className="col-span-6 flex items-center gap-3">
                  <Checkbox checked={singleAllSelected} onCheckedChange={(c) => singleHandleSelectAll(c as boolean)} className="data-[state=checked]:bg-[#6c2bd9] data-[state=checked]:border-[#6c2bd9]" />
                  <span>Product Name</span>
                  <button className="text-rose-500 text-xs font-semibold ml-2 hover:underline">Remove all</button>
                </div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right pr-4">Subtotal</div>
              </div>

              {/* Store Header */}
              <div className="flex items-center justify-between p-4 bg-slate-50/50 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#6c2bd9]/10 flex items-center justify-center shrink-0">
                    <Store className="w-4 h-4 text-[#6c2bd9]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{singleStore.storeName}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{singleStore.storeType}</span>
                    </div>
                    <span className="text-amber-500 text-xs font-bold">★ {singleStore.rating} ({singleStore.reviews} reviews)</span>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-rose-500 text-xs font-medium">Remove all</button>
              </div>

              {/* Normal Items */}
              {singleStore.items.map(item => {
                const addOns = (item as any).addOns as {id:string;name:string;price:number}[] | undefined;
                const addOnTotal = addOns?.reduce((s, a) => s + a.price, 0) ?? 0;
                return (
                  <div key={item.id}>
                    <div className="grid grid-cols-12 gap-4 p-4 border-t border-slate-100 items-center">
                      <div className="col-span-6 flex gap-4">
                        <div className="pt-1"><Checkbox checked={item.selected} onCheckedChange={(c) => singleHandleItemSelect(item.id, c as boolean)} className="data-[state=checked]:bg-[#6c2bd9] data-[state=checked]:border-[#6c2bd9]" /></div>
                        <div className="w-16 h-16 bg-slate-50 rounded border border-slate-100 p-1 shrink-0"><img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" /></div>
                        <div className="flex flex-col">
                          <h4 className="font-bold text-[13px] text-slate-900 leading-snug line-clamp-2 hover:text-[#6c2bd9] cursor-pointer">{item.name}</h4>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{item.details}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">SKU: {item.sku} • Stock: {item.stock} pcs</p>
                          {addOns && addOns.length > 0 && (
                            <span className="text-[10px] text-emerald-600 font-bold mt-1">+ {addOns.length} Add-On(s) included</span>
                          )}
                        </div>
                      </div>
                      <div className="col-span-2 text-center flex flex-col justify-center">
                        {item.originalPrice > item.price && <span className="text-[11px] text-slate-400 line-through">Tk {item.originalPrice.toLocaleString()}</span>}
                        <span className="font-extrabold text-slate-900">Tk {item.price.toLocaleString()}</span>
                        {addOnTotal > 0 && <span className="text-[10px] text-emerald-600 font-semibold">+Tk {addOnTotal.toLocaleString()} add-ons</span>}
                      </div>
                      <div className="col-span-2 flex justify-center">
                        <div className="flex items-center border border-slate-200 rounded h-8 w-24">
                          <button onClick={() => singleHandleQtyChange(item.id, -1)} className="w-8 h-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"><Minus className="w-3 h-3" /></button>
                          <div className="flex-1 flex items-center justify-center font-bold text-sm text-slate-900 border-x border-slate-200 h-full">{item.quantity}</div>
                          <button onClick={() => singleHandleQtyChange(item.id, 1)} className="w-8 h-full flex items-center justify-center text-white bg-[#6c2bd9] hover:bg-[#5821b0] transition-colors"><Plus className="w-3 h-3" /></button>
                        </div>
                      </div>
                      <div className="col-span-2 flex items-center justify-end gap-3 pr-2">
                        <div className="text-right">
                          <div className="font-extrabold text-slate-900">Tk {(item.price * item.quantity).toLocaleString()}</div>
                          {addOnTotal > 0 && <div className="text-[10px] text-emerald-600 font-semibold">+Tk {addOnTotal.toLocaleString()}</div>}
                        </div>
                        <button onClick={() => singleHandleDeleteItem(item.id)} className="text-slate-300 hover:text-rose-500 transition-colors p-1"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                    {/* Add-On sub-rows */}
                    {addOns && addOns.length > 0 && (
                      <div className="border-t border-emerald-100 bg-emerald-50/40 px-4 py-2 space-y-1.5">
                        <p className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wide flex items-center gap-1.5 mb-1"><Wrench className="w-3 h-3" /> Add-On Services & Products</p>
                        {addOns.map(addon => (
                          <div key={addon.id} className="grid grid-cols-12 gap-4 items-center py-1 px-2 bg-white/60 rounded-lg border border-emerald-100">
                            <div className="col-span-6 flex items-center gap-2 pl-10">
                              <span className="text-[9px] font-black bg-emerald-600 text-white px-1.5 py-0.5 rounded tracking-wide shrink-0">ADD-ON</span>
                              <span className="text-[12px] text-slate-700 font-medium">{addon.name}</span>
                            </div>
                            <div className="col-span-2 text-center text-[12px] font-semibold text-emerald-700">Tk {addon.price.toLocaleString()}</div>
                            <div className="col-span-2 text-center text-[11px] text-slate-400">Qty: 1</div>
                            <div className="col-span-2 flex items-center justify-end gap-2 pr-2">
                              <span className="font-bold text-[12px] text-emerald-700">Tk {addon.price.toLocaleString()}</span>
                              <button onClick={() => singleHandleDeleteAddon(item.id, addon.id)} className="text-slate-300 hover:text-rose-500 transition-colors p-1"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Group Deal Items Section */}
              {singleStore.groupDealItems.length > 0 && (
                <>
                  <div className="px-4 py-2.5 bg-gradient-to-r from-purple-50 to-indigo-50 border-t border-purple-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#6c2bd9] text-white text-[10px] font-black px-2">🔥 GROUP DEAL ITEMS</Badge>
                      <span className="text-[11px] text-slate-600">{singleStore.groupDealItems.length} deal(s) — Deposit paid at joining</span>
                    </div>
                    <span className="text-[10px] text-[#6c2bd9] font-semibold">Separate checkout required</span>
                  </div>
                  {singleStore.groupDealItems.map(item => (
                    <GroupDealItemRow
                      key={item.id}
                      item={item}
                      onSelect={singleHandleGdSelect}
                      onDelete={singleHandleDeleteGd}
                    />
                  ))}
                </>
              )}

              {/* Store Total */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>Normal Items Total</span>
                  <span className="font-bold text-slate-800">Tk {singleNormalSelected.reduce((a, i) => a + i.price * i.quantity, 0).toLocaleString()}</span>
                </div>
                {singleGdSelected.length > 0 && (
                  <div className="flex justify-between items-center text-sm text-slate-500">
                    <span>Group Deal Deposits</span>
                    <span className="font-bold text-[#6c2bd9]">Tk {singleGdTotal.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-end items-center gap-4 border-t border-slate-100 pt-2 mt-1">
                  <span className="font-bold text-slate-700 text-lg">Total Product Price:</span>
                  <span className="font-heading font-black text-2xl text-[#6c2bd9]">Tk {singleProductTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Single-shop Totals Sidebar */}
          <CartTotalsSidebar
            storeBreakdowns={[{
              storeName: singleStore.storeName, rating: singleStore.rating, reviews: singleStore.reviews,
              address: singleStore.shippingAddress, shippingCharge: singleStore.shippingCharge, subtotal: singleProductTotal,
            }]}
            productTotal={singleProductTotal}
            shippingTotal={singleStore.shippingCharge}
            itemCount={singleNormalSelected.length + singleGdSelected.length}
            onCheckout={() => setLocation("/checkout")}
            groupDealNote={singleGdSelected.length > 0}
          />
        </div>
      )}
    </div>
  );
}

// ─── CART TOTALS SIDEBAR (shared) ─────────────────────────────────────────────
function CartTotalsSidebar({
  storeBreakdowns,
  productTotal,
  shippingTotal,
  itemCount,
  onCheckout,
  groupDealNote = false,
}: {
  storeBreakdowns: { storeName: string; rating: number; reviews: number; address: string; shippingCharge: number; subtotal: number }[];
  productTotal: number;
  shippingTotal: number;
  itemCount: number;
  onCheckout: () => void;
  groupDealNote?: boolean;
}) {
  const [promoCode, setPromoCode] = useState("");
  const [referralCode, setReferralCode] = useState("");

  // ── Fixed discount lines (mock values per design spec) ──
  const discountPromo    = 300;
  const discountReferral = 300;
  const discountVisa     = Math.min(Math.round(productTotal * 0.05), 1500);
  const discountAdvPay   = Math.round(productTotal * 0.01);
  const totalDiscounts   = discountPromo + discountReferral + discountVisa + discountAdvPay;
  const checkoutLowest   = productTotal - totalDiscounts;

  const itemLabel = String(itemCount).padStart(2, "0");

  return (
    <div className="lg:col-span-4">
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm sticky top-24 overflow-hidden">

        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-slate-100">
          <h2 className="font-heading font-extrabold text-xl text-slate-900">Cart Totals</h2>
          <p className="text-xs text-slate-500 mt-0.5">{itemCount} item{itemCount !== 1 ? "s" : ""} selected</p>
        </div>

        {/* Shipping address per store */}
        <div className="px-6 py-4 border-b border-slate-100 space-y-3">
          {storeBreakdowns.map((store, i) => (
            <div key={i} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-[12px] text-slate-800">{store.storeName}</span>
                <span className="text-amber-500 text-[10px] font-bold">★ {store.rating}</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed mb-1.5">
                <span className="font-semibold text-slate-600">Ships to: </span>{store.address}
              </p>
              <button className="text-rose-500 text-[11px] font-bold hover:underline">Edit / Change Address</button>
            </div>
          ))}
        </div>

        {/* Promo + Referral inputs */}
        <div className="px-6 py-4 border-b border-slate-100 space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1.5">Promo Code</label>
            <div className="flex gap-2">
              <Input value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="e.g. BOOM30" className="h-9 text-sm bg-slate-50 focus-visible:ring-[#6c2bd9]/20" />
              <Button variant="outline" className="h-9 border-slate-300 font-bold px-4 text-sm shrink-0">Apply</Button>
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1.5">Referral Code</label>
            <div className="flex gap-2">
              <Input value={referralCode} onChange={(e) => setReferralCode(e.target.value)} placeholder="e.g. 2254152" className="h-9 text-sm bg-slate-50 focus-visible:ring-[#6c2bd9]/20" />
              <Button variant="outline" className="h-9 border-slate-300 font-bold px-4 text-sm shrink-0">Apply</Button>
            </div>
          </div>
        </div>

        {/* Pricing breakdown */}
        <div className="px-6 py-4 space-y-2.5 border-b border-slate-200">

          {/* Regular Price */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 font-medium">
              Regular Price <span className="text-slate-400 font-normal">({itemLabel} items)</span>
            </span>
            <span className="font-bold text-slate-900">৳ {productTotal.toLocaleString()}</span>
          </div>

          {/* Discount lines */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">
              Discount <span className="text-emerald-700 font-semibold">(Promo BOOM30*)</span>
            </span>
            <span className="font-bold text-emerald-600">- ৳ {discountPromo.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">
              Discount <span className="text-emerald-700 font-semibold">(Referral 2254152)</span>
            </span>
            <span className="font-bold text-emerald-600">- ৳ {discountReferral.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500 leading-snug">
              Discount <span className="text-emerald-700 font-semibold">(5% Off* Visa Card, upto ৳ 1,500)</span>
            </span>
            <span className="font-bold text-emerald-600 shrink-0 ml-2">- ৳ {discountVisa.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">
              Discount <span className="text-emerald-700 font-semibold">(1% Dis on Adv Pay)</span>
            </span>
            <span className="font-bold text-emerald-600">- ৳ {discountAdvPay.toLocaleString()}</span>
          </div>

          {/* Divider line */}
          <div className="border-t border-dashed border-slate-200 pt-2.5 mt-1">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-slate-900 text-sm">Checkout Lowest</span>
              <span className="font-black text-[#6c2bd9] text-base">৳ {checkoutLowest.toLocaleString()}/-</span>
            </div>
          </div>
        </div>

        {/* Shipping */}
        <div className="px-6 py-3 border-b border-slate-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Shipping Charge</span>
            <span className="font-bold text-slate-800">+ ৳ {shippingTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Footnotes */}
        <div className="px-6 py-3 border-b border-slate-200 space-y-1">
          <p className="text-[10px] text-slate-400 leading-relaxed">
            <span className="font-bold text-slate-500">*</span> Single Use Only
          </p>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            <span className="font-bold text-slate-500">**</span> All discounts are subject to proper use of promo codes and methods fulfilling eligibility.
          </p>
        </div>

        {/* Group deal note */}
        {groupDealNote && (
          <div className="px-6 py-3 border-b border-slate-200">
            <div className="bg-purple-50 rounded-lg px-3 py-2.5 text-[11px] text-purple-800 font-semibold">
              🔥 Group deal deposits charged now. Remaining payment due after deal reaches target.
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="px-6 py-5 flex flex-col gap-3">
          <Button onClick={onCheckout} className="w-full bg-[#6c2bd9] hover:bg-[#5821b0] text-white font-bold h-12 text-base shadow-lg shadow-purple-500/20">
            Proceed to Checkout
          </Button>
          <Button variant="ghost" className="w-full text-slate-500 hover:text-slate-900 hover:bg-slate-50 h-10 text-sm">
            Continue Shopping
          </Button>
        </div>

      </div>
    </div>
  );
}
