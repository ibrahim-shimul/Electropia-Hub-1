import { useEffect } from "react";
import { useLocation } from "wouter";
import { X, Trash2, ShoppingCart, Star, Flame, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const FEATURED_GROUP_DEAL = {
  productId: "1",
  name: "SAFE E18KINV Intelligent Inverter Split Air Conditioner - 1.5 Ton",
  image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=200&h=200",
  dealPrice: 45000,
  originalPrice: 47999,
  targetCustomers: 50,
  currentCustomers: 45,
  endsIn: "14h 20m",
  savingsPct: 6,
};

export default function CartDrawer() {
  const { items, isOpen, closeDrawer, removeItem, updateQty, clearCart } = useCart();
  const [, setLocation] = useLocation();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const FREE_SHIPPING_THRESHOLD = 50000;

  const storeGroups = items.reduce<Record<string, typeof items>>((acc, item) => {
    if (!acc[item.storeName]) acc[item.storeName] = [];
    acc[item.storeName].push(item);
    return acc;
  }, {});

  const cartTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const progress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0);
  const dealProgress = Math.round((FEATURED_GROUP_DEAL.currentCustomers / FEATURED_GROUP_DEAL.targetCustomers) * 100);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeDrawer}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[360px] max-w-[95vw] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#6c2bd9]" />
            <h2 className="font-heading font-extrabold text-lg text-slate-900">Shopping Cart</h2>
          </div>
          <div className="flex items-center gap-3">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="flex items-center gap-1 text-rose-500 text-xs font-bold hover:text-rose-600 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Empty Cart
              </button>
            )}
            <button
              onClick={closeDrawer}
              className="flex items-center gap-1 text-slate-500 text-sm font-semibold hover:text-slate-900 transition-colors"
            >
              <X className="w-4 h-4" /> Close
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 text-slate-400 px-8 text-center pt-10 pb-4">
              <ShoppingCart className="w-16 h-16 text-slate-200" />
              <p className="font-semibold text-slate-500">Your cart is empty</p>
              <p className="text-sm">Add some items to get started.</p>
              <Button
                onClick={closeDrawer}
                className="bg-[#6c2bd9] hover:bg-[#5821b0] text-white mt-2"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {Object.entries(storeGroups).map(([storeName, storeItems]) => {
                const storeItem = storeItems[0];
                const storeSubtotal = storeItems.reduce((s, i) => s + i.price * i.quantity, 0);
                return (
                  <div key={storeName} className="py-4 px-5">
                    {/* Store header */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-extrabold text-[13px] text-slate-800">{storeName}</span>
                      <span className="flex items-center gap-0.5 text-[11px] text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {storeItem.storeRating} ({storeItem.storeReviews})
                      </span>
                    </div>

                    {/* Items */}
                    <div className="space-y-3">
                      {storeItems.map(item => (
                        <div key={item.id} className="flex gap-3 items-start">
                          <div className="w-14 h-14 rounded-lg border border-slate-100 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply p-1" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-bold text-slate-800 leading-snug line-clamp-2 mb-0.5">{item.name}</p>
                            <p className="text-[10px] text-slate-400 mb-1.5">SKU: {item.sku}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-[12px] font-extrabold text-[#6c2bd9]">৳ {item.price.toLocaleString()}</span>
                              <div className="flex items-center border border-slate-200 rounded overflow-hidden h-6">
                                <button
                                  onClick={() => updateQty(item.id, item.quantity - 1)}
                                  className="w-6 h-full flex items-center justify-center text-slate-600 hover:bg-slate-100 text-sm font-bold transition-colors"
                                >−</button>
                                <span className="w-7 text-center text-[12px] font-bold text-slate-900 border-x border-slate-200">{item.quantity}</span>
                                <button
                                  onClick={() => updateQty(item.id, item.quantity + 1)}
                                  className="w-6 h-full flex items-center justify-center bg-[#6c2bd9] text-white text-sm font-bold hover:bg-[#5821b0] transition-colors"
                                >+</button>
                              </div>
                              <span className="text-[12px] font-extrabold text-slate-900">৳ {(item.price * item.quantity).toLocaleString()}</span>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-rose-400 hover:text-rose-600 transition-colors ml-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Store subtotal */}
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-dashed border-slate-200 text-[13px]">
                      <span className="text-slate-500">Subtotal for {storeName}:</span>
                      <span className="font-extrabold text-slate-900">৳ {storeSubtotal.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Featured Group Deal ── */}
          <div className="mx-4 my-4">
            <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 via-white to-purple-50 overflow-hidden shadow-sm">
              {/* Banner label */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-[#6c2bd9] to-purple-500 px-4 py-2">
                <Flame className="w-3.5 h-3.5 text-orange-300 fill-orange-300 shrink-0" />
                <span className="text-[11px] font-extrabold text-white uppercase tracking-wider">Featured Group Deal</span>
                <span className="ml-auto text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-full">
                  Save {FEATURED_GROUP_DEAL.savingsPct}%
                </span>
              </div>

              <div className="p-3">
                {/* Product row */}
                <div className="flex gap-3 items-start mb-3">
                  <img
                    src={FEATURED_GROUP_DEAL.image}
                    alt={FEATURED_GROUP_DEAL.name}
                    className="w-16 h-16 rounded-xl object-cover border border-purple-100 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-bold text-slate-800 leading-tight line-clamp-2 mb-1.5">
                      {FEATURED_GROUP_DEAL.name}
                    </p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[15px] font-extrabold text-[#6c2bd9]">
                        ৳ {FEATURED_GROUP_DEAL.dealPrice.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-slate-400 line-through">
                        ৳ {FEATURED_GROUP_DEAL.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-2.5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] text-slate-600 font-semibold flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#6c2bd9]" />
                      {FEATURED_GROUP_DEAL.currentCustomers}/{FEATURED_GROUP_DEAL.targetCustomers} customers joined
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600">{dealProgress}%</span>
                  </div>
                  <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#6c2bd9] to-purple-400 rounded-full transition-all duration-500"
                      style={{ width: `${dealProgress}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Only {FEATURED_GROUP_DEAL.targetCustomers - FEATURED_GROUP_DEAL.currentCustomers} more needed to unlock!</p>
                </div>

                {/* Countdown row */}
                <div className="flex items-center gap-1.5 mb-3">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-[11px] text-slate-500">Deal ends in</span>
                  <span className="text-[12px] font-extrabold text-rose-500 tracking-wide">{FEATURED_GROUP_DEAL.endsIn}</span>
                </div>

                {/* CTA */}
                <button
                  onClick={() => {
                    closeDrawer();
                    setLocation(`/product/${FEATURED_GROUP_DEAL.productId}`);
                  }}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-[#6c2bd9] to-purple-500 hover:from-[#5821b0] hover:to-purple-600 text-white text-[12px] font-extrabold transition-all shadow-md shadow-purple-500/20 tracking-wide"
                >
                  Join This Group Deal →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-slate-200 px-5 py-4 bg-white shrink-0">
            {/* Cart Total */}
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-800 text-sm">Cart Total:</span>
              <span className="font-heading font-black text-[#6c2bd9] text-lg">৳ {cartTotal.toLocaleString()}</span>
            </div>

            {/* Free shipping progress */}
            <div className="mb-4">
              {remaining === 0 ? (
                <p className="text-[11px] text-emerald-600 font-semibold mb-1.5">🎉 Your order qualifies for free shipping!</p>
              ) : (
                <p className="text-[11px] text-slate-500 mb-1.5">
                  Add <strong className="text-slate-700">৳ {remaining.toLocaleString()}</strong> more for free shipping!
                </p>
              )}
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#6c2bd9] to-purple-400 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full h-11 font-bold border-slate-300 text-slate-800 hover:bg-slate-50 uppercase tracking-wide text-sm"
                onClick={() => { closeDrawer(); setLocation("/cart/multi"); }}
              >
                View Cart
              </Button>
              <Button
                className="w-full h-11 font-bold bg-[#6c2bd9] hover:bg-[#5821b0] text-white uppercase tracking-wide text-sm shadow-lg shadow-purple-500/20"
                onClick={() => { closeDrawer(); setLocation("/checkout"); }}
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
