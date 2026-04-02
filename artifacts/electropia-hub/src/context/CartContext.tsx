import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  originalPrice: number;
  quantity: number;
  storeName: string;
  storeRating: number;
  storeReviews: number;
  isGroupDeal?: boolean;
  groupDealId?: string;
  groupDealEndsIn?: string;
  groupDealJoined?: number;
  groupDealTarget?: number;
}

const INITIAL_ITEMS: CartItem[] = [
  {
    id: "group-deal-gd001",
    name: "Philips Essential Airfryer HD9252/90",
    sku: "PH-HD9252",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=200&h=200",
    price: 10500,
    originalPrice: 12500,
    quantity: 1,
    storeName: "Philips Official Store",
    storeRating: 4.7,
    storeReviews: 238,
    isGroupDeal: true,
    groupDealId: "GD-002",
    groupDealEndsIn: "6h 45m",
    groupDealJoined: 18,
    groupDealTarget: 20,
  },
];

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = useCallback(() => setIsOpen(true), []);
  const closeDrawer = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty < 1) return;
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  return (
    <CartContext.Provider value={{ items, isOpen, openDrawer, closeDrawer, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
