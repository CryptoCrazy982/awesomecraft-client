import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

// 🛒 Create Context
const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem("cartItems");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // ✅ Sync with localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Calculate total per item (base + addons)
  const calculateItemTotal = (item) => {
    const basePrice = item.salePrice || item.offerPrice || 0;
    const addOnTotal =
      (item.googleMap ? 99 : 0) +
      (item.format === "video" ? 999 : 0) +
      (item.removeBranding ? 299 : 0);
    return basePrice + addOnTotal;
  };

  // ✅ Derived values
  const totalItems = cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);
  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + calculateItemTotal(item) * (item.qty || 1),
        0
      ),
    [cartItems]
  );

  // ✅ Add Item to Cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      // Match by ID and same configuration (avoid merging items with different add-ons)
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          item.googleMap === product.googleMap &&
          item.format === product.format &&
          item.removeBranding === product.removeBranding
      );

      if (existing) {
        // Increase quantity if same configuration exists
        return prev.map((item) =>
          item === existing ? { ...item, qty: (item.qty || 1) + 1 } : item
        );
      }

      // Add new item
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // ✅ Remove item
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Clear all items
  const clearCart = () => setCartItems([]);

  // ✅ Update quantity (for future checkout)
  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: parseInt(qty) } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        subtotal,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
