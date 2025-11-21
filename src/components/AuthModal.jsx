import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function AuthModal({ onClose }) {
  const { requestOtp, verifyOtp } = useAuth();
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const sendOtp = async () => {
    if (!phone) return setError("Enter phone");
    await requestOtp(phone);
    setStep(1);
  };

  const verify = async () => {
    const res = await verifyOtp(phone, otp);
    if (res.success) {
      onClose();
    } else setError("Invalid OTP (try 123456 in demo)");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <button className="float-right" onClick={onClose}>✕</button>
        <h3 className="text-lg font-semibold">Login / Signup</h3>

        {step===0 ? (
          <>
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Mobile (eg: 9876543210)" className="mt-4 w-full p-2 border rounded" />
            <button onClick={sendOtp} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded">Send OTP</button>
            <p className="text-sm text-gray-500 mt-2">Demo OTP: 123456</p>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </>
        ) : (
          <>
            <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" className="mt-4 w-full p-2 border rounded" />
            <div className="flex gap-2 mt-4">
              <button onClick={verify} className="px-4 py-2 bg-green-600 text-white rounded">Verify</button>
              <button onClick={() => setStep(0)} className="px-4 py-2 border rounded">Back</button>
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </>
        )}
      </div>
    </div>
  );
}
