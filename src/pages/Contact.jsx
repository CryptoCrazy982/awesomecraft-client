import React, { useState } from "react";
import axios from "../api/apiClient"; // axios instance with baseURL setup

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    queryType: "",
    message: "",
  });
  const [status, setStatus] = useState({ success: null, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ success: null, message: "" });

    try {
      const res = await axios.post("/contact", formData);
      setStatus({ success: true, message: res.data.message });
      setFormData({ name: "", email: "", whatsapp: "", queryType: "", message: "" });
    } catch (err) {
      setStatus({
        success: false,
        message: err.response?.data?.message || "Submission failed",
      });
    }
  };

  return (
    <section className="bg-gradient-to-br from-pink-50 to-white py-16 px-6 md:px-20 min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-2xl p-8 md:p-10">
        <h2 className="text-4xl font-bold text-pink-600 mb-2 text-center">Contact Us</h2>
        <p className="text-gray-600 mb-8 text-center">
          Have a question? Fill out the form below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="tel"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            required
            placeholder="WhatsApp Number"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
          />
          <select
            name="queryType"
            value={formData.queryType}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
          >
            <option value="">-- Select Query Type --</option>
            <option value="Product Inquiry">Product Inquiry</option>
            <option value="Technical Support">Technical Support</option>
            <option value="Partnership">Partnership</option>
            <option value="Feedback">Feedback</option>
            <option value="Other">Other</option>
          </select>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
            placeholder="Type your message..."
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500"
          ></textarea>

          <button
            type="submit"
            className="w-full py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition"
          >
            Send Message
          </button>

          {status.message && (
            <p
              className={`text-center mt-4 font-medium ${
                status.success ? "text-green-600" : "text-red-500"
              }`}
            >
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;