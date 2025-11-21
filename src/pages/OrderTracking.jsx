// src/pages/OrderTracking.jsx
import React, { useState } from "react";
import apiClient from "../api/apiClient";

export default function OrderTracking() {
  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!orderNumber.trim()) {
      setError("Please enter a valid Order Number.");
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await apiClient.get(`/orders/track/${orderNumber}`);
      setOrder(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Order not found. Please check your number."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">🔍 Track Your Order</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter your Order Number"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:ring focus:ring-indigo-200"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Searching..." : "Track"}
        </button>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {order && (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Order #{order.orderNumber}</h2>
          <p className="text-sm text-gray-600 mb-4">
            Placed on: {new Date(order.createdAt).toLocaleDateString()}
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Customer Info</h3>
              <p>Email: {order.customerEmail || "N/A"}</p>
              <p>Phone: {order.customerPhone || "N/A"}</p>
              <p>WhatsApp: {order.whatsappNumber || "N/A"}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Payment & Status</h3>
              <p>Payment: {order.paymentStatus}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Delivery: {order.deliveryStatus}</p>
              <p>Status: {order.status}</p>
            </div>
          </div>

          <hr className="my-4" />

          <div>
            <h3 className="font-semibold mb-2">Billing Address</h3>
            <p>{order.billingAddress.fullName}</p>
            <p>{order.billingAddress.addressLine1}</p>
            {order.billingAddress.addressLine2 && <p>{order.billingAddress.addressLine2}</p>}
            <p>
              {order.billingAddress.city}, {order.billingAddress.state},{" "}
              {order.billingAddress.postalCode}
            </p>
            <p>{order.billingAddress.country}</p>
            {order.billingAddress.gstNumber && (
              <p>GST: {order.billingAddress.gstNumber}</p>
            )}
          </div>

          <hr className="my-4" />

          <div>
            <h3 className="font-semibold mb-2">Order Summary</h3>
            <p>Total: ₹{order.totalAmount}</p>
            <p>Discount: ₹{order.discountAmount}</p>
            <p className="font-bold">Final Amount: ₹{order.finalAmount}</p>
          </div>

          {order.deliveryFileUrl && (
            <div className="mt-4">
              <a
                href={order.deliveryFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 underline"
              >
                📥 Download Delivery File
              </a>
            </div>
          )}

          <hr className="my-4" />

          <div>
            <h3 className="font-semibold mb-2">Templates Purchased</h3>
            {order.templates && order.templates.length > 0 ? (
              <ul className="list-disc pl-5">
                {order.templates.map((t) => (
                  <li key={t._id}>
                    {t.title} — ₹{t.price}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No template data found.</p>
            )}
          </div>

          {order.remarks && (
            <div className="mt-4">
              <h3 className="font-semibold mb-1">Admin Remarks:</h3>
              <p>{order.remarks}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
