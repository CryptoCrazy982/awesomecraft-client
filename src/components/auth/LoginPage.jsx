import React, { useState } from "react";
import AuthUI from "./AuthUI";
import { initRecaptcha, sendOtp, verifyOtp } from "./PhoneAuthLogic";

export default function LoginPage() {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    await initRecaptcha();
    const conf = await sendOtp(phone);
    setConfirmation(conf);
    setStep("otp");
    setLoading(false);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = await verifyOtp(confirmation, otp);
    console.log("User:", user);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
      <AuthUI
        step={step}
        onSend={handleSend}
        onVerify={handleVerify}
        phone={phone}
        otp={otp}
        setPhone={setPhone}
        setOtp={setOtp}
        loading={loading}
      />
      <div id="recaptcha-container" />
    </div>
  );
}
