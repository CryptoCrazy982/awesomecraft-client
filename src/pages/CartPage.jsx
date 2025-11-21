import React from "react";
import { Button, Rating } from "@mui/material";
import { IoClose, IoBagCheckOutline } from "react-icons/io5";
import { useCart } from "../contexts/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, subtotal } = useCart();

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 🛍️ Left Section - Cart Items */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5 sm:p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">
            Your Cart
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            You have{" "}
            <span className="text-pink-600 font-semibold">
              {cartItems.length}
            </span>{" "}
            item{cartItems.length !== 1 && "s"} in your cart
          </p>

          {cartItems.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              Your cart is empty 🛒
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => {
                const basePrice = item.salePrice || item.offerPrice || 0;
                const addOnTotal =
                  (item.googleMap ? 99 : 0) +
                  (item.format === "video" ? 999 : 0) +
                  (item.removeBranding ? 299 : 0);
                const finalPrice = basePrice + addOnTotal;

                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4 items-center sm:items-start border-b border-gray-100 pb-5 last:border-none"
                  >
                    {/* Image */}
                    <img
                      src={item.image || "https://placehold.jp/150x150.png"}
                      alt={item.title}
                      className="w-28 h-28 object-cover rounded-md shadow-sm border"
                    />

                    {/* Details */}
                    <div className="flex-1 w-full">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-gray-800 font-semibold text-base leading-snug">
                            {item.title}
                          </h3>

                          <div className="flex items-center gap-1 mt-1">
                            <Rating
                              value={item.rating || 4.5}
                              size="small"
                              readOnly
                              precision={0.5}
                            />
                          </div>

                          {/* 🧩 Add-on Details */}
                          <div className="mt-2 text-xs text-gray-600 space-y-1">
                            {item.googleMap && (
                              <p>
                                ➕ Google Map / QR Code{" "}
                                <span className="text-pink-600 font-medium">
                                  +₹99
                                </span>
                              </p>
                            )}
                            {item.format === "video" && (
                              <p>
                                🎥 Video Invite (MP4 Format){" "}
                                <span className="text-pink-600 font-medium">
                                  +₹999
                                </span>
                              </p>
                            )}
                            {item.removeBranding && (
                              <p>
                                ✂️ Remove “Designed by AwesomeCrafts”{" "}
                                <span className="text-pink-600 font-medium">
                                  +₹299
                                </span>
                              </p>
                            )}
                            {!item.googleMap &&
                              item.format !== "video" &&
                              !item.removeBranding && (
                                <p className="text-gray-400 italic">
                                  No extra add-ons
                                </p>
                              )}
                          </div>
                        </div>

                        {/* ❌ Remove */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-pink-600 text-lg"
                        >
                          <IoClose />
                        </button>
                      </div>

                      {/* 💰 Price Info */}
                      <div className="flex flex-wrap items-center gap-2 mt-3 text-sm">
                        <span className="text-pink-600 font-semibold text-[15px]">
                          ₹{finalPrice.toFixed(2)}
                        </span>
                        {basePrice > 0 && (
                          <span className="line-through text-gray-400">
                            ₹{item.price?.toFixed(2)}
                          </span>
                        )}
                        {item.discount && (
                          <span className="text-green-600 text-xs font-medium">
                            {item.discount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 💰 Right Section - Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-8 h-fit sticky top-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Cart Summary
          </h3>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-pink-600 font-semibold">
                ₹{subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-medium">Free</span>
            </div>
            <div className="flex justify-between">
              <span>Estimate for</span>
              <span className="font-medium">India</span>
            </div>
            <div className="flex justify-between text-base pt-3 border-t border-gray-100">
              <span className="font-semibold">Total</span>
              <span className="text-pink-600 font-bold text-[17px]">
                ₹{subtotal.toFixed(2)}
              </span>
            </div>
          </div>

          <Button
            fullWidth
            className="!mt-6 !bg-pink-600 hover:!bg-pink-700 !text-white !py-2.5 !rounded-md !text-[15px] flex items-center justify-center gap-2"
          >
            <IoBagCheckOutline className="text-[20px]" /> Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
