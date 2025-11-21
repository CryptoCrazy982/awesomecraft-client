import React, { useState } from "react";
import {
  Button,
  Slider,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Collapse } from "react-collapse";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const styleOptions = [
  "Minimalist",
  "Modern",
  "Luxury",
  "Traditional",
  "Elegant",
  "Rustic",
  "Bohemian",
  "Classic",
  "Royal",
  "Typography",
];
const colorOptions = [
  "#000000",
  "#ffffff",
  "#ff0000",
  "#ffd700",
  "#1e90ff",
  "#32cd32",
  "#800080",
  "#ff69b4",
  "#ffa500",
  "#8b4513",
  "#008080",
  "#f0e68c",
  "#c71585",
  "#ff8c00",
  "#7fff00",
  "#40e0d0",
  "#9932cc",
  "#a52a2a",
];
const languageOptions = [
  "English",
  "Hindi",
  "Marathi",
  "Gujarati",
  "Tamil",
  "Bengali",
];
const editableLevels = ["Basic", "Moderate", "Fully Editable"];
const productTypes = ["Video Invitation", "eCard Invitation", "PDF Invite"];
const dimensionOptions = ["2D", "3D"];

export default function FilterSidebar({ filters = {}, setFilters, onClose }) {
  const [openPrice, setOpenPrice] = useState(true);
  const [openType, setOpenType] = useState(true);
  const [openColors, setOpenColors] = useState(true);
  const [openRating, setOpenRating] = useState(true);

  const toggleArrayValue = (key, value) => {
    setFilters((prev) => {
      const arr = prev[key] || [];
      const next = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
      return { ...prev, [key]: next };
    });
  };

  const handlePriceChange = (e, val) => {
    setFilters((prev) => ({ ...prev, price: val }));
  };

  const clearAll = () =>
    setFilters({
      style: [],
      color: [],
      language: [],
      editableLevel: [],
      productType: [],
      dimension: [],
      price: [0, 5000],
    });

  return (
    <aside className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button onClick={clearAll} className="text-sm text-pink-600 underline">
          Clear
        </button>
      </div>

      {/* Style */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Style</h4>
        <div className="flex flex-wrap gap-2">
          {styleOptions.map((s) => {
            const active = (filters.style || []).includes(s);
            return (
              <button
                key={s}
                onClick={() => toggleArrayValue("style", s)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  active
                    ? "bg-pink-600 text-white border-pink-600"
                    : "bg-white text-gray-700 border-gray-200"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Type */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-gray-700">Product Type</h4>
          <button onClick={() => setOpenType((s) => !s)}>
            {openType ? <FaAngleUp /> : <FaAngleDown />}
          </button>
        </div>
        <Collapse isOpened={openType}>
          <div className="flex flex-col gap-1">
            {productTypes.map((pt) => (
              <FormControlLabel
                key={pt}
                control={
                  <Checkbox
                    checked={(filters.productType || []).includes(pt)}
                    onChange={() => toggleArrayValue("productType", pt)}
                    sx={{ color: "#ec4899" }}
                  />
                }
                label={pt}
              />
            ))}
          </div>
        </Collapse>
      </div>

      {/* Colors */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-gray-700">Colors</h4>
          <button onClick={() => setOpenColors((s) => !s)}>
            {openColors ? <FaAngleUp /> : <FaAngleDown />}
          </button>
        </div>
        <Collapse isOpened={openColors}>
          <div className="flex gap-2 flex-wrap">
            {colorOptions.map((c) => {
              const active = (filters.color || []).includes(c);
              return (
                <button
                  key={c}
                  onClick={() => toggleArrayValue("color", c)}
                  className={`w-8 h-8 rounded-full border ${
                    active ? "ring-2 ring-pink-500" : ""
                  }`}
                  style={{ background: c }}
                />
              );
            })}
          </div>
        </Collapse>
      </div>

      {/* Languages */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Languages</h4>
        <div className="flex flex-wrap gap-2">
          {languageOptions.map((l) => (
            <button
              key={l}
              onClick={() => toggleArrayValue("language", l)}
              className={`px-3 py-1 rounded-full text-sm border ${
                (filters.language || []).includes(l)
                  ? "bg-pink-600 text-white border-pink-600"
                  : "bg-white text-gray-700 border-gray-200"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Editable Level */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Editable Level
        </h4>
        <div className="flex flex-wrap gap-2">
          {editableLevels.map((el) => (
            <button
              key={el}
              onClick={() => toggleArrayValue("editableLevel", el)}
              className={`px-3 py-1 rounded-full text-sm border ${
                (filters.editableLevel || []).includes(el)
                  ? "bg-pink-600 text-white border-pink-600"
                  : "bg-white text-gray-700 border-gray-200"
              }`}
            >
              {el}
            </button>
          ))}
        </div>
      </div>

      {/* Dimension */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Dimension</h4>
        <div className="flex gap-2">
          {dimensionOptions.map((d) => (
            <button
              key={d}
              onClick={() => toggleArrayValue("dimension", d)}
              className={`px-3 py-1 rounded-full text-sm border ${
                (filters.dimension || []).includes(d)
                  ? "bg-pink-600 text-white border-pink-600"
                  : "bg-white text-gray-700 border-gray-200"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-gray-700">Price</h4>
        </div>
        <Slider
          value={filters.price || [0, 5000]}
          onChange={handlePriceChange}
          min={0}
          max={5000}
          step={50}
          valueLabelDisplay="auto"
          sx={{ color: "#ec4899" }}
        />
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>₹{(filters.price || [0])[0]}</span>
          <span>₹{(filters.price || [5000])[1]}</span>
        </div>
      </div>

      {/* Rating (basic) */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-gray-700">Rating</h4>
        </div>
        <div className="flex flex-col gap-1">
          {[5, 4, 3, 2, 1].map((r) => (
            <FormControlLabel
              key={r}
              control={
                <Checkbox
                  checked={(filters.rating || []).includes(String(r))}
                  onChange={() =>
                    setFilters((prev) => {
                      const cur = prev.rating || [];
                      const next = cur.includes(String(r))
                        ? cur.filter((x) => x !== String(r))
                        : [...cur, String(r)];
                      return { ...prev, rating: next };
                    })
                  }
                />
              }
              label={`${r} & up`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={onClose || (() => {})}
        >
          Apply
        </Button>
      </div>
    </aside>
  );
}
