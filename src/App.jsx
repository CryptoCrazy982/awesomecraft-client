import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";
import CartDrawer from "./components/CartDrawer";
import { useCart } from "./contexts/CartContext";
import MainHeader from "./components/MainHeader";
import Footer from "./components/Footer";
import Collections from "./pages/Collections";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import Contact from "./pages/Contact";
import OrderTracking from "./pages/OrderTracking";
import LoginPage from "./pages/LoginPage";
import PayNow from "./pages/PayNow";

export default function App(){
  const { openCart } = useCart();
  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader className="!p-4"/>

      <main className="container2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:slug" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/track-order" element={<OrderTracking/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/paynow" element={<PayNow/>} />
        </Routes>
      </main>
      <Footer/>

      <CartDrawer />
    </div>
  );
}
