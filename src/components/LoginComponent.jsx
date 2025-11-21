import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LoginComponent({ onClose }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const navigate = useNavigate();

  // ✅ Initialize reCAPTCHA AFTER modal DOM exists
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!window.recaptchaVerifier) {
        try {
          console.log("🟢 Creating reCAPTCHA...");
          window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
              size: "normal",
              callback: (response) => {
                console.log("✅ reCAPTCHA solved:", response);
                setRecaptchaReady(true);
              },
              "expired-callback": () => {
                console.warn("⚠️ reCAPTCHA expired, please refresh.");
                setRecaptchaReady(false);
              },
            }
          );
          window.recaptchaVerifier.render().then((widgetId) => {
            console.log("reCAPTCHA rendered, widgetId:", widgetId);
            setRecaptchaReady(true);
          });
        } catch (err) {
          console.error("❌ Failed to init reCAPTCHA:", err);
          setRecaptchaReady(false);
        }
      }
    }, 500); // wait for modal mount
    return () => clearTimeout(timer);
  }, []);

  // ✅ Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phone.startsWith("+")) {
      return setMessage("Include + and country code (e.g. +91XXXXXXXXXX)");
    }
    if (!window.recaptchaVerifier) {
      setMessage("reCAPTCHA not ready yet, please wait...");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(confirmation);
      setMessage("✅ OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage(
        error.code === "auth/too-many-requests"
          ? "⚠️ Too many requests. Wait a bit."
          : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) return setMessage("Please enter OTP");
    setLoading(true);

    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      setMessage(`🎉 Welcome ${user.phoneNumber}!`);
      setTimeout(() => {
        onClose();
        navigate("/");
        alert("✅ Login confirmed!");
      }, 1000);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("❌ Invalid or expired OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-lg"
      >
        ✕
      </button>

      <h2 className="text-xl font-semibold mb-4">Login with OTP</h2>

      {!confirmationResult ? (
        <form onSubmit={handleSendOtp} className="flex flex-col gap-3">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number (e.g. +919876543210)"
            className="border rounded p-2 text-sm"
            required
          />
          <button
            type="submit"
            disabled={loading || !recaptchaReady}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading
              ? "Sending..."
              : recaptchaReady
              ? "Send OTP"
              : "Loading reCAPTCHA..."}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="flex flex-col gap-3">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="border rounded p-2 text-sm"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-green-300"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}

      {/* ✅ keep visible and with height so reCAPTCHA can render */}
      <div
        id="recaptcha-container"
        className="flex justify-center mt-3"
        style={{ minHeight: "78px" }}
      ></div>

      {message && (
        <p className="mt-4 text-sm text-gray-600 leading-snug">{message}</p>
      )}
    </div>
  );
}
