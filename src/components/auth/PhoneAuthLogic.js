import { auth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

/**
 * Initialize reCAPTCHA verifier
 */
export const initRecaptcha = async () => {
  const containerId = "recaptcha-container";

  // clear any existing verifier
  if (window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier.clear();
    } catch (_) {}
    window.recaptchaVerifier = null;
  }

  // ✅ CORRECT constructor for modular SDK
  const verifier = new RecaptchaVerifier(containerId, {
    size: "invisible", // or "normal" for visible testing
    callback: (response) => {
      console.log("reCAPTCHA verified:", response);
    },
    "expired-callback": () => {
      console.warn("reCAPTCHA expired");
    },
  }, auth);

  await verifier.render();
  window.recaptchaVerifier = verifier;
  console.log("✅ reCAPTCHA initialized successfully");

  return verifier;
};

/**
 * Send OTP to a given phone number
 */
export const sendOtp = async (phone) => {
  if (!window.recaptchaVerifier) throw new Error("reCAPTCHA not initialized");
  console.log("Sending OTP to:", phone);
  const confirmation = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
  window.confirmationResult = confirmation;
  console.log("✅ OTP sent successfully");
  return confirmation;
};

/**
 * Verify OTP entered by user
 */
export const verifyOtp = async (confirmation, code) => {
  if (!confirmation) throw new Error("Missing confirmationResult");
  const result = await confirmation.confirm(code);
  console.log("✅ OTP verified:", result.user);
  return result.user;
};
