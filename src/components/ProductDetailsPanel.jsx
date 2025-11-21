// src/components/ProductDetailsPanel.jsx
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductZoom from "../components/Productzoom/ProductZoom";
import ProductDetailsComponent from "../components/ProductDetailsComponent";
import ProductTabs from "../components/ProductTabs";
import { fetchTemplateById } from "../api/templateAPI";

export default function ProductDetailsPanel({ productSlug, onClose }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabsOpen, setTabsOpen] = useState(false); // collapse tabs by default
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        // fetchTemplateById accepts the slug (your API works with slug)
        const data = await fetchTemplateById(productSlug);
        setProduct(data);
      } catch (err) {
        console.error("Drawer fetch error:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (productSlug) load();
    else {
      setLoading(false);
      setProduct(null);
    }
  }, [productSlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <CircularProgress />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-full text-gray-600">
        Product not found
      </div>
    );
  }

  const images = product.images?.map((img) => img.url) || [];
  const price = product.salePrice || product.offerPrice || product.price || 0;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50">
      {/* Scrollable content */}
      <div className="overflow-y-auto flex-1 px-4 pt-4 pb-28">
        {/* Compact Product Zoom — wrapper ensures stable height inside drawer */}
        <div className="mx-auto w-full max-w-md" style={{ minHeight: 260 }}>
          {/* ProductZoom gracefully handles empty src */}
          <ProductZoom images={images.length ? images : [""]} />
        </div>

        {/* Product details card (uses your existing component, includes Add to Cart) */}
        <div className="mt-4 bg-white rounded-xl shadow-sm p-4">
          <ProductDetailsComponent product={product} />
        </div>

        {/* Collapsible Tabs — hidden by default, user can expand */}
        <div className="mt-4 bg-white rounded-xl shadow-sm p-3">
          <button
            onClick={() => setTabsOpen((s) => !s)}
            className="w-full text-left text-sm font-medium text-gray-800 py-2"
          >
            {tabsOpen ? "Hide details" : "See more details"}
          </button>

          {tabsOpen && (
            <div className="mt-3">
              <ProductTabs
                description={product.description}
                styleTags={product.style_tags}
                colorTags={product.color_tags}
                productType={product.productType}
                language={product.language}
              />
            </div>
          )}
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="absolute bottom-0 left-0 w-full bg-white border-t p-3 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 px-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Total</span>
            <span className="text-lg font-bold text-gray-900">
              ₹{Number(price).toFixed(2)}
            </span>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                if (onClose) onClose();
                // small delay so drawer close animation starts (UX)
                setTimeout(() => navigate("/cart"), 200);
              }}
              className="flex-1 bg-pink-600 text-white px-4 py-3 rounded-lg font-semibold text-sm shadow-sm hover:bg-pink-700 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
