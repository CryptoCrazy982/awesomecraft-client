import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Checkout(){
  const { items, subtotal, clear } = useCart();
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    // TODO: send to server /api/checkout with payment integration
    // For now, simulate success:
    console.log("Placing order", { items, subtotal, name, phone });
    clear();
    alert("Order placed (demo). Plug in server checkout to complete payments.");
    navigate("/");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Checkout</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium">Contact</h3>
          <input className="mt-2 w-full p-2 border rounded" value={name} onChange={e=>setName(e.target.value)} placeholder="Name" />
          <input className="mt-2 w-full p-2 border rounded" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone" />
        </div>

        <div>
          <h3 className="font-medium">Order summary</h3>
          <div className="mt-2 space-y-2">
            {items.map((it, i)=>(
              <div key={i} className="flex justify-between">
                <div>{it.title} × {it.quantity}</div>
                <div>₹{it.unitPrice * it.quantity}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 font-semibold flex justify-between">
            <div>Total</div><div>₹{subtotal}</div>
          </div>

          <button onClick={handlePlaceOrder} className="mt-4 px-4 py-2 bg-green-600 text-white rounded">Place order</button>
        </div>
      </div>
    </div>
  );
}
