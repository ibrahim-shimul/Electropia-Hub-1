import { useEffect } from "react";
import { useLocation } from "wouter";
import { X, Trash2, ShoppingCart, Star, Flame, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

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
            <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-400 px-8 text-center">
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
                        <div key={item.id}>
                          {/* Group Deal badge row */}
                          {item.isGroupDeal && (
                            <div className="flex items-center gap-2 mb-1.5 px-1">
                              <div className="flex items-center gap-1 bg-orange-50 border border-orange-200 rounded-full px-2 py-0.5">
                                <Flame className="w-3 h-3 text-orange-500 fill-orange-400" />
                                <span className="text-[10px] font-extrabold text-orange-600 uppercase tracking-wide">Group Deal</span>
                              </div>
                              <span className="text-[10px] text-slate-400 font-medium">#{item.groupDealId}</span>
                            </div>
                          )}

                          <div className={`flex gap-3 items-start ${item.isGroupDeal ? "bg-gradient-to-br from-purple-50/60 to-orange-50/40 border border-purple-100 rounded-xl p-2.5" : ""}`}>
                            {/* Product image */}
                            <div className="w-14 h-14 rounded-lg border border-slate-100 bg-white flex items-center justify-center shrink-0 overflow-hidden">
                              <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply p-1" />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <p className="text-[12px] font-bold text-slate-800 leading-snug line-clamp-2 mb-0.5">{item.name}</p>
                              <p className="text-[10px] text-slate-400 mb-1.5">SKU: {item.sku}</p>

                              <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                  <span className="text-[12px] font-extrabold text-[#6c2bd9]">৳ {item.price.toLocaleString()}</span>
                                  {item.originalPrice > item.price && (
                                    <span className="text-[10px] text-slate-400 line-through leading-tight">৳ {item.originalPrice.toLocaleString()}</span>
                                  )}
                                </div>

                                {/* Qty stepper */}
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

                                {/* Delete */}
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="text-rose-400 hover:text-rose-600 transition-colors ml-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Group deal meta row */}
                              {item.isGroupDeal && item.groupDealJoined !== undefined && item.groupDealTarget && (
                                <div className="mt-2 space-y-1">
                                  <div className="h-1.5 bg-purple-100 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-[#6c2bd9] to-purple-400 rounded-full"
                                      style={{ width: `${Math.round((item.groupDealJoined / item.groupDealTarget) * 100)}%` }}
                                    />
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                                      <Users className="w-3 h-3" />
                                      {item.groupDealJoined}/{item.groupDealTarget} joined
                                    </span>
                                    {item.groupDealEndsIn && (
                                      <span className="text-[10px] text-rose-500 font-bold flex items-center gap-0.5">
                                        <Clock className="w-3 h-3" /> {item.groupDealEndsIn}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}
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
