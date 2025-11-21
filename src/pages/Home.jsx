import React from "react";
import HeroSection from "../components/HeroSection";
import { products } from "../data/mockProducts";
import ProductCard from "../components/ProductCard";
import PopularCategories from "../components/PopularCategories";
import PopularInvitations from "../components/PopularInvitations";
import WhiteLabelSection from "../components/WhiteLabelSection";


export default function Home() {
  return (
    <>
      {/* ✅ Hero should NOT be wrapped inside container */}
      <HeroSection />
      <PopularCategories />

      <PopularInvitations/>
      <WhiteLabelSection />
      <PopularInvitations/>
    </>
  );
}
