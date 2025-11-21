import React, { useState } from "react";
import { Button, TextField, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

const LoginPage = () => {
  const [step, setStep] = useState("login"); // "login" | "otp" | "success"
  const [inputValue, setInputValue] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = () => {
    if (!inputValue.trim()) return;
    setStep("otp");
  };

  const handleOtpVerify = () => {
    if (otp.length === 6) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep("success");
        setTimeout(() => navigate("/home"), 2000);
      }, 1500);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-8 w-full max-w-md text-center text-white"
      >
        <Typography variant="h4" className="mb-6 font-semibold text-white drop-shadow-lg">
          {step === "login"
            ? "Welcome Back 👋"
            : step === "otp"
            ? "Verify Your OTP 🔐"
            : "Login Successful 🎉"}
        </Typography>

        <AnimatePresence mode="wait">
          {step === "login" && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Button
                variant="outlined"
                startIcon={<BsGoogle />}
                fullWidth
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.5)",
                  textTransform: "none",
                  borderRadius: "12px",
                  mb: 2,
                  "&:hover": { borderColor: "#fff", background: "rgba(255,255,255,0.1)" },
                }}
                onClick={() => alert("Google login flow here")}
              >
                Continue with Google
              </Button>

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-white/40"></div>
                <span className="mx-2 text-white/70 text-sm">or</span>
                <div className="flex-grow border-t border-white/40"></div>
              </div>

              <TextField
                fullWidth
                label="Email or Phone"
                variant="outlined"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                sx={{
                  mb: 3,
                  input: { color: "white" },
                  label: { color: "rgba(255,255,255,0.7)" },
                  fieldset: { borderColor: "rgba(255,255,255,0.5)" },
                  "&:hover fieldset": { borderColor: "#fff" },
                }}
              />

              <Button
                variant="contained"
                fullWidth
                onClick={handleVerify}
                sx={{
                  py: 1.3,
                  borderRadius: "12px",
                  background: "linear-gradient(90deg, #6366F1, #8B5CF6)",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": { background: "linear-gradient(90deg, #4F46E5, #7C3AED)" },
                }}
              >
                Send OTP
              </Button>
            </motion.div>
          )}

          {step === "otp" && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Typography variant="body1" className="mb-4 text-white/90">
                Enter the 6-digit OTP sent to <b>{inputValue}</b>
              </Typography>

              <TextField
                fullWidth
                label="Enter OTP"
                variant="outlined"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                inputProps={{ maxLength: 6 }}
                sx={{
                  mb: 3,
                  input: { color: "white", letterSpacing: "0.3em", textAlign: "center" },
                  label: { color: "rgba(255,255,255,0.7)" },
                  fieldset: { borderColor: "rgba(255,255,255,0.5)" },
                }}
              />

              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={handleOtpVerify}
                disabled={otp.length < 6 || loading}
                sx={{
                  py: 1.3,
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 600,
                  background: "linear-gradient(90deg, #22c55e, #16a34a)",
                  "&:hover": { background: "linear-gradient(90deg, #16a34a, #15803d)" },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Confirm OTP"}
              </Button>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-3"
            >
              <div className="text-green-400 text-5xl">✅</div>
              <Typography variant="body1" className="text-white/90">
                Login Successful! Redirecting to home...
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default LoginPage;
