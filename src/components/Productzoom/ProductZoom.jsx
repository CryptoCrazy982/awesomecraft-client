import React, { useRef, useState, useEffect } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../Productzoom/style.css";

const ProductZoom = ({ images = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const thumbRef = useRef();

  // Detect screen size for responsive layout
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`flex ${
        isMobile ? "flex-col" : "flex-row"
      } gap-4 justify-center`}
    >
      {/* 🖼️ Main Zoom Image */}
      <div
        className={`relative ${
          isMobile ? "w-full" : "w-[85%]"
        } flex justify-center items-center rounded-lg bg-white overflow-hidden`}
      >
        <InnerImageZoom
          zoomType={isMobile ? "click" : "hover"}
          zoomScale={1.2}
          src={images[activeIndex]}
          alt="product-zoom"
          className="object-contain w-full h-auto"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: isMobile ? "380px" : "550px",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>

      {/* 🧩 Thumbnail Slider (Left on Desktop, Bottom on Mobile) */}
      <div
        className={`${
          isMobile
            ? "w-full order-last mt-3"
            : "w-[15%] order-first h-[480px]"
        }`}
      >
        <Swiper
          ref={thumbRef}
          direction={isMobile ? "horizontal" : "vertical"}
          slidesPerView={isMobile ? 5 : 4}
          spaceBetween={10}
          navigation={!isMobile}
          modules={[Navigation]}
          className={`${
            isMobile
              ? "thumbnail-slider-bottom"
              : "thumbnail-slider-vertical h-full"
          }`}
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div
                className={`rounded-md overflow-hidden cursor-pointer border transition-all duration-300 ${
                  activeIndex === idx
                    ? "border-pink-500 opacity-100"
                    : "border-gray-300 opacity-60 hover:opacity-90"
                }`}
                onClick={() => setActiveIndex(idx)}
              >
                <img
                  src={img}
                  alt={`thumb-${idx}`}
                  className={`${
                    isMobile
                      ? "w-full h-[60px] object-cover rounded-md"
                      : "w-full h-[100px] object-cover"
                  }`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductZoom;
