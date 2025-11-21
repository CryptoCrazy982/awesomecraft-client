import React from "react";
import { IoClose } from "react-icons/io5";
import { useCart } from "../contexts/CartContext";
import { Button } from "@mui/material";

export default function CartDrawer({ open, onClose }) {
  const { cartItems, removeFromCart, subtotal } = useCart();

  return (
    <>
      {/* 🔲 Backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[998] transition-opacity animate-fadeIn"
        />
      )}

      {/* 🛒 Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[350px] md:w-[420px] bg-white shadow-2xl z-[999]
        transform transition-transform duration-300 ease-in-out 
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="p-5 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-pink-600 text-xl"
          >
            <IoClose />
          </button>
        </div>

        {/* Cart items */}
        <div className="p-4 overflow-y-auto h-[70%]">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center pt-10">Your cart is empty 🛒</p>
          ) : (
            cartItems.map((item) => {
              const basePrice = item.salePrice || item.offerPrice || 0;
              const addOnTotal =
                (item.googleMap ? 99 : 0) +
                (item.format === "video" ? 999 : 0) +
                (item.removeBranding ? 299 : 0);
              const finalPrice = basePrice + addOnTotal;

              return (
                <div
                  key={item.id}
                  className="flex gap-3 py-4 border-b last:border-none"
                >
                  <img
                    src={item.image}
                    className="w-20 h-20 rounded-md object-cover border"
                    alt={item.title}
                  />

                  <div className="flex-1">
                    <h3 className="text-gray-800 font-medium text-sm leading-tight">
                      {item.title}
                    </h3>

                    <p className="text-pink-600 font-semibold mt-1">
                      ₹{finalPrice.toFixed(2)}
                    </p>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-gray-500 hover:text-pink-600 mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t bg-white">
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Subtotal</span>
            <span className="font-semibold text-pink-600">
              ₹{subtotal.toFixed(2)}
            </span>
          </div>

          <Button
            fullWidth
            className="!bg-pink-600 hover:!bg-pink-700 !text-white !py-2.5 !rounded-md mt-3"
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </>
  );
}
