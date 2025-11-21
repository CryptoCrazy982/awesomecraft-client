import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { IoGridSharp } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";

const ProductToolbar = ({ totalProducts = 0, itemView, setItemView }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="bg-[#f9f9f9] p-3 md:p-2 w-full mb-4 rounded-md flex flex-wrap items-center justify-between shadow-sm border border-gray-200">
      {/* Left Side — View Switch + Count */}
      <div className="col1 flex items-center gap-2 md:gap-3 itemViewActions">
        {/* List View Button */}
        <Button
          className={`!w-[35px] !h-[35px] !min-w-[35px] !rounded-full ${
            itemView === "list" ? "!bg-pink-100" : "!bg-white"
          } !text-[#000] hover:!bg-pink-200 transition`}
          onClick={() => setItemView("list")}
        >
          <LuMenu
            className={`text-[rgba(0,0,0,0.7)] text-[16px] ${
              itemView === "list" ? "text-pink-600" : ""
            }`}
          />
        </Button>

        {/* Grid View Button */}
        <Button
          className={`!w-[35px] !h-[35px] !min-w-[35px] !rounded-full ${
            itemView === "grid" ? "!bg-pink-100" : "!bg-white"
          } !text-[#000] hover:!bg-pink-200 transition`}
          onClick={() => setItemView("grid")}
        >
          <IoGridSharp
            className={`text-[rgba(0,0,0,0.7)] text-[16px] ${
              itemView === "grid" ? "text-pink-600" : ""
            }`}
          />
        </Button>

        <span className="text-[14px] hidden sm:block font-medium pl-3 text-gray-700">
          There are {totalProducts} products
        </span>
      </div>

      {/* Right Side — Sort Options */}
      <div className="col2 ml-auto flex items-center justify-end gap-3 pr-2 sm:pr-4 mt-3 sm:mt-0">
        <span className="text-[14px] font-medium text-gray-700">Sort by</span>
        <Button
          id="sort-button"
          aria-controls={open ? "sort-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className="!bg-white !text-[13px] !text-[#000] !capitalize !border !border-gray-400 hover:!border-pink-500 hover:!text-pink-600 !px-3"
        >
          Name, A to Z
        </Button>
        <Menu
          id="sort-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "sort-button",
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              onSortChange("Name, A to Z");
            }}
          >
            Name, A to Z
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              onSortChange("Name, Z to A");
            }}
          >
            Name, Z to A
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              onSortChange("Price, low to high");
            }}
          >
            Price, low to high
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              onSortChange("Price, high to low");
            }}
          >
            Price, high to low
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default ProductToolbar;
