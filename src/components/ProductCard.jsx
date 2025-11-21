import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import useIsMobile from "../hooks/useIsMobile";
import { FaStar } from "react-icons/fa";
import ProductDetailsPanel from "./ProductDetailsPanel";

export default function ProductCard({ product }) {
  const {
    _id,
    slug,
    title,
    category,
    price,
    salePrice,
    image1,
    image2,
    discount,
    rating,
    productType,
  } = product;

  const [hover, setHover] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const productLink = slug ? `/product/${slug}` : `/product/${_id}`;
  const categoryLink = `/collections/${slug}`;

  // ICONS
  const icons = {
    Photo: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 19V5H3v14h18zM5 7h14v10H5V7zm3.5 3c-.83 0-1.5.67-1.5 1.5S7.67 13 8.5 13s1.5-.67 1.5-1.5S9.33 10 8.5 10zm2.5 6l3-4 4 5H7l2-2z"></path>
      </svg>
    ),
    Video: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 10.5V7c0-1.1-.9-2-2-2H5C3.9 5 3 5.9 3 7v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-3.5l4 4v-11l-4 4z"></path>
      </svg>
    ),
    "PDF Card": (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.11.89 2 2 2h12a2 2 0 0 0 2-2V8l-6-6zm1 14h-1v4h-2v-4H9v-2h6v2zm-1-7V3.5L18.5 9H14z"></path>
      </svg>
    ),
  };

  // TYPE LABELS
  const getProductTypeLabel = () => {
    if (!productType || !productType.length) return [];

    return productType
      .map((t) => {
        if (t.includes("E-Card")) return "Photo";
        if (t.includes("Video")) return "Video";
        if (t.includes("PDF")) return "PDF Card";
        return t;
      })
      .slice(0, 2);
  };

  return (
    <div
      className="group w-full min-w-0 border rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative"
      onMouseEnter={() => !isMobile && setHover(true)}
      onMouseLeave={() => !isMobile && setHover(false)}
    >
      {/* DISCOUNT BADGE */}
      {discount ? (
        <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-semibold px-2 py-1 rounded-md z-10">
          {discount}% OFF
        </span>
      ) : null}

      {/* IMAGE SWAP */}
      <Link to={productLink}>
        <div className="relative w-full aspect-[3/5] overflow-hidden rounded-lg">
          <img
            src={image1}
            alt={title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              hover ? "opacity-0" : "opacity-100"
            }`}
          />
          <img
            src={image2 || image1}
            alt={title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              hover ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </Link>

      {/* DETAILS */}
      <div className="p-3 space-y-2">
        {category && (
          <Link to={categoryLink}>
            <p className="text-xs text-gray-500 uppercase tracking-wide fixed-1-line">
              {category}
            </p>
          </Link>
        )}

        <Link
          to={productLink}
          className="block text-[14px] font-medium text-gray-800 fixed-2-lines hover:text-pink-600 transition"
        >
          {title}
        </Link>

        {/* PRODUCT TYPE TAGS */}
        {getProductTypeLabel().length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {getProductTypeLabel().map((type, i) => {
              const color =
                type === "Photo"
                  ? "from-orange-300/30 to-orange-500/40 text-orange-800 border-orange-400/40 shadow-orange-300/30"
                  : type === "Video"
                  ? "from-blue-300/30 to-blue-500/40 text-blue-800 border-blue-400/40 shadow-blue-300/30"
                  : "from-red-300/30 to-red-500/40 text-red-800 border-red-400/40 shadow-red-300/30";

              return (
                <span
                  key={i}
                  className={`inline-flex items-center gap-1 text-[11px] px-3 py-1 rounded-full font-medium 
                  bg-gradient-to-r ${color} border shadow-md backdrop-blur-sm transition-all duration-300
                  hover:scale-105 hover:-translate-y-[1px] hover:shadow-lg`}
                >
                  {icons[type]}
                  {type}
                </span>
              );
            })}
          </div>
        )}

        {/* RATING */}
        {rating && (
          <div className="flex gap-1 text-yellow-500 text-xs">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < Math.round(rating) ? "" : "text-gray-300"}
              />
            ))}
          </div>
        )}

        {/* PRICE */}
        <div className="flex items-center gap-3 mt-1">
          {salePrice && (
            <span className="text-sm font-medium text-gray-400 line-through tracking-wide">
              ₹{price}
            </span>
          )}

          <span
            className="text-lg font-bold bg-gradient-to-r from-pink-500 to-red-500 
            bg-clip-text text-transparent transition-all duration-300 
            group-hover:scale-[1.06] group-hover:drop-shadow-md"
          >
            ₹{salePrice || price}
          </span>

          {discount > 0 && (
            <span
              className="text-[11px] px-2 py-[3px] rounded-full font-semibold
              bg-gradient-to-r from-green-400/20 to-green-500/20 
              text-green-600 border border-green-400/30 backdrop-blur-sm shadow-sm"
            >
              {discount}% OFF
            </span>
          )}
        </div>
      </div>

      {/* ORDER BUTTON */}
      <button
        onClick={() => {
          if (isMobile) setDrawerOpen(true);
          else navigate(productLink);
        }}
        className="w-full bg-transparent border-t px-3 py-3 text-gray-800 font-medium hover:bg-gray-900 hover:text-white transition"
      >
        ORDER NOW
      </button>

      {/* MOBILE DRAWER */}
      {isMobile && (
        <SwipeableDrawer
          anchor="bottom"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          swipeAreaWidth={0}          
          disableSwipeToOpen={true}
          ModalProps={{ keepMounted: false }}
          PaperProps={{
            sx: {
              borderTopLeftRadius: "18px",
              borderTopRightRadius: "18px",
              height: "85vh",
              overflow: "hidden",
            },
          }}
        >
          <div style={{ height: "100%", overflow: "hidden" }}>
            <ProductDetailsPanel
              productSlug={slug}
              onClose={() => setDrawerOpen(false)}
            />
          </div>
        </SwipeableDrawer>
      )}
    </div>
  );
}
