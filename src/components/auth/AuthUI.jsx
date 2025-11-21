import React from "react";

export default function AuthUI({ step, onSend, onVerify, phone, otp, setPhone, setOtp, loading }) {
  return (
    <div className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl shadow-xl text-center">
      {step === "phone" ? (
        <form onSubmit={onSend} className="flex flex-col gap-4">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91..."
            className="p-3 rounded-lg bg-white/10 border border-white/30 text-white"
          />
          <button className="bg-blue-600 text-white py-2 rounded-lg" disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={onVerify} className="flex flex-col gap-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="p-3 rounded-lg bg-white/10 border border-white/30 text-white text-center tracking-widest"
          />
          <button className="bg-green-600 text-white py-2 rounded-lg" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}
    </div>
  );
}
