import React, { useState, useMemo } from "react";
import {
  Button,
  Rating,
  Checkbox,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  Snackbar,
} from "@mui/material";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "../contexts/CartContext";

const ProductDetailsComponent = ({ product = {} }) => {
  // ✅ Extract Dynamic Product Data
  const {
    _id,
    title = "Untitled Invitation Template",
    offerPrice = 0,
    salePrice = 0,
    discount = 0,
    editableLevel,
    styleTags = [],
    colorTags = [],
    productType = [],
    language = [],
    rating = 4.5,
    images = [],
  } = product;

  // ✅ States for Options
  const [selectedLanguage, setSelectedLanguage] = useState("No");
  const [googleMap, setGoogleMap] = useState(false);
  const [format, setFormat] = useState("static");
  const [removeBranding, setRemoveBranding] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { addToCart } = useCart();

  // ✅ Dynamic Price Calculation
  const totalPrice = useMemo(() => {
    return (
      (salePrice || offerPrice) +
      (googleMap ? 99 : 0) +
      (format === "video" ? 999 : 0) +
      (removeBranding ? 299 : 0)
    );
  }, [salePrice, offerPrice, googleMap, format, removeBranding]);

  // ✅ Add to Cart
  const handleAddToCart = () => {
  // ✅ Extract image URL (most reliable order)
  let imageUrl = "";

  if (product.mainImageUrl) {
    imageUrl = product.mainImageUrl;
  } else if (Array.isArray(product.images) && product.images.length > 0) {
    const mainImage =
      product.images.find((img) => img.isMain) || product.images[0];
    imageUrl = mainImage?.url || "";
  } else if (product.ogImage) {
    imageUrl = product.ogImage;
  }

  // ✅ Add to Cart
  addToCart({
    id: _id,
    title,
    salePrice: salePrice || offerPrice,
    offerPrice,
    discount,
    image: imageUrl,
    rating,
    googleMap,
    format,
    removeBranding,
  });

  console.log("🛒 Added product:", { title, imageUrl });
  setOpenSnackbar(true);
};



  // ✅ Handlers
  const handleBuyNow = () => alert("Proceeding to checkout!");
  const handleWhatsApp = () => {
    const message = `Hi, I want to order "${title}".\nTotal: ₹${totalPrice}`;
    window.open(
      `https://wa.me/918920905402?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  // ✅ Render Tags
  const renderTags = (tags) =>
    tags?.length > 0 && (
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full border border-gray-200"
          >
            {tag}
          </span>
        ))}
      </div>
    );

  return (
    <div className="space-y-6">
      {/* ---------- Title ---------- */}
      <h1 className="text-[22px] md:text-[26px] font-semibold leading-snug text-gray-900">
        {title}
      </h1>

      {/* ---------- Rating & Price ---------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-2">
        <div className="flex items-center gap-2">
          <Rating value={rating} precision={0.5} readOnly size="small" />
          <span className="text-gray-600 text-sm">(12 Reviews)</span>
        </div>

        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-pink-600 text-[26px] font-bold leading-none">
            ₹{(salePrice || offerPrice).toFixed(2)}
          </span>
          {offerPrice > salePrice && (
            <span className="text-gray-400 line-through text-[15px]">
              ₹{offerPrice.toFixed(2)}
            </span>
          )}
          {discount > 0 && (
            <span className="text-green-600 text-sm font-semibold">
              ({discount}% OFF)
            </span>
          )}
        </div>
      </div>

      {/* ---------- Product Info ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-700">
        {editableLevel && (
          <p>
            <strong>Editable Level:</strong> {editableLevel}
          </p>
        )}
        {productType?.length > 0 && (
          <p>
            <strong>Product Type:</strong> {productType.join(", ")}
          </p>
        )}
        {language?.length > 0 && (
          <p>
            <strong>Supported Languages:</strong> {language.join(", ")}
          </p>
        )}
      </div>

      {/* ---------- Tags ---------- */}
      <div className="flex flex-wrap gap-3 mt-2">
        {renderTags(styleTags)}
        {renderTags(colorTags)}
      </div>

      {/* ---------- Customization Options ---------- */}
      <div className="border-t border-gray-100 pt-5 space-y-4">
        <h3 className="text-[15px] font-semibold text-gray-800">
          Customize Your Invite
        </h3>

        {/* Additional Language */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Additional Language
          </label>
          <Select
            size="small"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-[180px] bg-white"
          >
            <MenuItem value="No">No</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
          </Select>
        </div>

        {/* Google Map Option */}
        <FormControlLabel
          control={
            <Checkbox
              checked={googleMap}
              onChange={(e) => setGoogleMap(e.target.checked)}
              sx={{ color: "#ec4899" }}
            />
          }
          label="Add Google Map / QR Code + ₹99.00"
        />

        {/* Invitation Format */}
        <div>
          <p className="text-gray-700 text-sm font-medium mb-2">
            Choose Invitation Format
          </p>
          <FormControl>
            <RadioGroup
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <FormControlLabel
                value="static"
                control={<Radio sx={{ color: "#ec4899" }} />}
                label="Static Card (JPG)"
              />
              <FormControlLabel
                value="video"
                control={<Radio sx={{ color: "#ec4899" }} />}
                label="Video Invite (MP4) + ₹999.00"
              />
            </RadioGroup>
          </FormControl>
          {format === "video" && (
            <p className="text-[13px] text-gray-600 mt-1">
              Convert your static card into a video invite with elegant
              animations.
            </p>
          )}
        </div>

        {/* Remove Branding */}
        <FormControlLabel
          control={
            <Checkbox
              checked={removeBranding}
              onChange={(e) => setRemoveBranding(e.target.checked)}
              sx={{ color: "#ec4899" }}
            />
          }
          label='Remove "Designed by AwesomeCrafts" + ₹299.00'
        />
      </div>

      {/* ---------- Action Buttons ---------- */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Button
          fullWidth
          onClick={handleAddToCart}
          variant="outlined"
          className="!border !border-pink-600 !text-pink-600 hover:!bg-pink-600 hover:!text-white transition-all !font-medium"
          startIcon={<MdOutlineShoppingCart />}
        >
          Add to Cart
        </Button>

        <Button
          fullWidth
          onClick={handleBuyNow}
          className="!bg-pink-600 hover:!bg-pink-700 !text-white transition-all !font-medium"
        >
          Buy It Now
        </Button>

        <Button
          fullWidth
          onClick={handleWhatsApp}
          className="!bg-green-500 hover:!bg-green-600 !text-white flex items-center gap-2 !font-medium transition-all"
        >
          <FaWhatsapp /> Order on WhatsApp
        </Button>
      </div>

      {/* ---------- Total Summary ---------- */}
      <div className="mt-4 border-t pt-4 text-gray-800 text-lg font-semibold flex justify-between">
        <span>Total Price:</span>
        <span className="text-pink-600">₹{totalPrice.toFixed(2)}</span>
      </div>

      {/* ✅ Snackbar Feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="Added to cart successfully 🎉"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </div>
  );
};

export default ProductDetailsComponent;
