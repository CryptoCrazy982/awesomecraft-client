import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Fade from "@mui/material/Fade";
import {
  FaHandPeace,
  FaClock,
  FaEye,
  FaWhatsapp,
  FaFlag,
  FaShieldAlt,
} from "react-icons/fa";
import apiClient from "../api/apiClient"; // ✅ import your axios instance

export default function HeroSection() {
  const [slides, setSlides] = useState([]); // dynamic banners
  const [index, setIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch banners from backend
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await apiClient.get("/banners");
        if (res.data && res.data.length > 0) {
          setSlides(res.data);
        }
      } catch (err) {
        console.error("Error fetching banners:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // ✅ Auto slide animation
  useEffect(() => {
    if (slides.length > 1) {
      const interval = setInterval(() => {
        setFadeIn(false);
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % slides.length);
          setFadeIn(true);
        }, 300);
      }, 5500);
      return () => clearInterval(interval);
    }
  }, [slides]);

  if (loading) {
    return (
      <div className="h-[480px] md:h-[650px] xl:h-[720px] flex items-center justify-center text-gray-500">
        Loading banners...
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="h-[480px] md:h-[650px] xl:h-[720px] flex items-center justify-center text-gray-500">
        No banners available.
      </div>
    );
  }

  const slide = slides[index];

  return (
    <>
  {/* ===== HERO SECTION ===== */}
  <div
    className="hero-container"
    style={{ backgroundImage: `url(${slide.bg})` }}
  >
    <div className="hero-overlay"></div>

    <Fade in={fadeIn} timeout={700}>
      <div className="hero-content">
        {slide.subtitle && (
          <p className="hero-subtitle">{slide.subtitle}</p>
        )}

        <h1 className="hero-title">{slide.title}</h1>

        {slide.desc && (
          <p className="hero-description">{slide.desc}</p>
        )}

        {slide.cta && slide.link && (
          <Link to={slide.link} className="hero-button">
            {slide.cta}
          </Link>
        )}
      </div>
    </Fade>

    {/* Floating shapes (aesthetic animations) */}
    <div className="floating-shape shape1"></div>
    <div className="floating-shape shape2"></div>
  </div>

  {/* ===== FEATURE STRIP ===== */}
  <div className="feature-strip">
    <div className="feature-wrapper">
      <Feature icon={<FaHandPeace />} text="Quick & Easy" />
      <Feature icon={<FaClock />} text="24x7 Support" />
      <Feature icon={<FaEye />} text="Free Preview" />
      <Feature icon={<FaWhatsapp />} text="WhatsApp Delivery" />
      <Feature icon={<FaFlag />} text="Made in India" />
      <Feature icon={<FaShieldAlt />} text="Safe Payments" />
    </div>
  </div>
</>

  );
}

/* ✅ Feature Sub-component */
function Feature({ icon, text }) {
  return (
    <div className="flex flex-col items-center gap-2 hover:scale-110 transition-transform duration-300">
      <span className="text-3xl">{icon}</span>
      <p className="text-[15px] font-medium leading-none">{text}</p>
    </div>
  );
}
