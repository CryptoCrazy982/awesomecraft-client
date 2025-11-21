import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Drawer } from "@mui/material";
import {
  FaShoppingCart,
  FaPhoneAlt,
  FaRegUser,
  FaQuestionCircle,
  FaTimes,
  FaHeart,
  FaChild,
  FaGlassCheers,
  FaPray,
  FaHome,
  FaBuilding,
  FaRing,
} from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { useCart } from "../contexts/CartContext";
import { TbTruckDelivery } from "react-icons/tb";
import LoginComponent from "../components/LoginComponent";
import { useAuth } from "../contexts/AuthContext";

import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import CartDrawer from "../components/CartDrawer";
import useIsMobile from "../hooks/useIsMobile"; // if not added, add this


/* ✅ Slug Helper for SEO */
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/* ✅ Mega Menu Category Structure */
const MEGA_MENU = [
  {
    name: "Wedding",
    slug: "Wedding-invites",
    icon: <FaHeart className="text-pink-500" />,
    sections: [
      {
        title: "Search by Format",
        items: [
          "eCard Invitation",
          "One Page Wedding Invitation",
          "Wedding Invitation Video",
          "Wedding Invitation PDF",
          "Gif Invitation",
          "Website Invitation",
          "Wedding Signage Board",
        ],
      },
      {
        title: "Search by Style",
        items: [
          "Caricature Wedding Invitation",
          "Customised Story Invitation",
          "Countdown Wedding Invitation",
          "Custom Wedding Invitation",
          "Photo Based Wedding Invitations",
          "Destination Theme Invitation",
          "Traditional Wedding Invitation",
          "Floral Invitation",
          "Wedding Itinerary Invitation",
          "Lagna Patrika",
        ],
      },
      {
        title: "Search by Religion",
        items: [
          "Hindu Wedding Invitation",
          "Muslim Wedding Invitation",
          "Punjabi Wedding Invitation",
          "Rajasthani Wedding Invitation",
          "Marwari Wedding Invitation",
          "Jain Wedding Invitation",
          "Bengali Wedding Invitation",
          "South Indian Wedding Invitation",
          "Marathi Wedding Invitation",
          "Gujarati Wedding Invitation",
          "Christian Wedding Invitation",
        ],
      },
      {
        title: "Search by Design",
        items: [
          "Digital Wedding Invitation Card",
          "Engagement & Ring Ceremony",
          "Bridal Shower Invitation",
          "Chura Ceremony",
          "Mehndi Ceremony Invitation",
        ],
      },
    ],
  },

  // ✅ Baby & Kids
  {
    name: "Baby & Kids",
    slug: "Baby-and-Kids-invitations",
    icon: <FaChild className="text-blue-500" />,
    sections: [
      {
        title: "Popular",
        items: [
          "Birthday Party Invitation",
          "Pregnancy Announcement",
          "Baby Shower Invitation Card",
          "Cradle Ceremony",
          "Birth Announcement Invitation",
        ],
      },
      {
        title: "Ceremonies",
        items: [
          "Naming Ceremony Invitation",
          "Mundan Ceremony Invitation",
          "Thread Ceremony",
          "Kuan Poojan",
          "Rice Ceremony Invitation",
        ],
      },
      {
        title: "Traditions",
        items: [
          "Half Saree Ceremony",
          "Baptism Ceremony",
          "Ear Piercing Ceremony",
          "Dastar Bandi",
        ],
      },
      {
        title: "Browse All",
        items: [
          "Kids Photoshoot Invite",
          "First Tooth Party",
          "Baby Arrival Party",
        ],
      },
    ],
  },

  // ✅ Party Invite
  {
    name: "Party Invite",
    slug: "party-&-festival-invites",
    icon: <FaGlassCheers className="text-green-500" />,
    sections: [
      {
        title: "Events",
        items: [
          "Anniversary Party",
          "House Warming Party",
          "Grand Opening",
          "Pool Party Invitation",
          "Barbeque Party Invitation",
          "Dance Party Invitation",
          "Dinner Party",
          "Tea Party",
        ],
      },
      {
        title: "Festivals",
        items: ["Holi", "Teej", "New Year", "Lohri"],
      },
      {
        title: "Milestones",
        items: ["Retirement Party", "Farewell Party", "Holy Communion"],
      },
      {
        title: "Business",
        items: ["Launch Party", "VIP Party", "Cocktail Night"],
      },
    ],
  },

  // ✅ Puja
  {
    name: "Puja Invites",
    slug: "puja-invites",
    icon: <FaPray className="text-orange-500" />,
    sections: [
      {
        title: "House",
        items: ["Griha Pravesh", "Bhumi Pujan", "Hawan Invitation"],
      },
      {
        title: "Deities & Festivals",
        items: [
          "Satyanarayan Puja",
          "Ganesh Puja",
          "Lakshmi Puja",
          "Durga Puja",
        ],
      },
      {
        title: "Ceremonies",
        items: ["Naming Ceremony Pooja", "Mundan Puja", "Thread Ceremony"],
      },
      {
        title: "More",
        items: ["Navratri Pooja", "Sai Sandhya", "Kirtan Invite"],
      },
    ],
  },



  // ✅ Corporate
  {
    name: "Corporate",
    slug: "corporate-invites",
    icon: <FaBuilding className="text-gray-600" />,
    sections: [
      {
        title: "Business Events",
        items: [
          "Grand Opening Invitation",
          "Office Inauguration Invite",
          "Business Launch",
          "Conference Invite",
          "Award Ceremony",
        ],
      },
      {
        title: "People",
        items: ["Farewell Party", "Retirement Party"],
      },
      {
        title: "Occasions",
        items: ["Company Anniversary Event", "Team Party"],
      },
      {
        title: "Formats",
        items: ["Digital Card", "Video Invite", "PDF Invite"],
      },
    ],
  },

  // ✅ Anniversary
  {
    name: "Anniversary",
    slug: "anniversary",
    icon: <FaRing className="text-red-500" />,
    sections: [
      {
        title: "Milestones",
        items: ["1st Anniversary", "25th Anniversary", "50th Anniversary"],
      },
      {
        title: "Styles",
        items: ["Classic Anniversary", "Floral Anniversary", "Photo Collage"],
      },
      {
        title: "Formats",
        items: ["Digital Invite", "Video Invite", "PDF Invite"],
      },
      {
        title: "Extras",
        items: ["Save the Date", "Thank You Card"],
      },
    ],
  },
];

/* ✅ MEGA MENU DISPLAYER */
const MegaMenu = ({ category }) => (
  <div className="grid grid-cols-4 gap-10 text-sm text-gray-800 leading-relaxed">
    {category.sections.map((section, si) => (
      <div key={si}>
        <h4 className="text-[11px] font-bold tracking-[0.12em] text-gray-900 mb-3 uppercase">
          {section.title}
        </h4>
        {section.items.map((label, i) => (
          <Link
            key={i}
            to={`/${category.slug}/${slugify(label)}`}
            className="block py-1.5 px-2 rounded hover:bg-pink-50 hover:text-pink-600 transition"
          >
            {label}
          </Link>
        ))}
      </div>
    ))}
  </div>
);

/* ✅ MAIN HEADER COMPONENT */
export default function MainHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const { user, logout } = useAuth();
  const { cartItems, openCart } = useCart();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
const [drawerOpen, setDrawerOpen] = useState(false);

const [searchQuery, setSearchQuery] = useState("");
const [searchResults, setSearchResults] = useState([]);
const [isSearching, setIsSearching] = useState(false);

  const collectionSlug = (name) =>
    `/collections/${name.replace(/ /g, "-")}`;

  const searchTimer = useRef(null);

const handleSearch = (value) => {
  setSearchQuery(value);

  if (searchTimer.current) clearTimeout(searchTimer.current);

  searchTimer.current = setTimeout(async () => {
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);

      // Use apiClient (same base URL used by your templates fetching)
      const res = await apiClient.get(
        `/public/templates/search?q=${encodeURIComponent(value)}`
      );

      setSearchResults(res.data.templates || []);
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, 400);
};

const handleCartClick = () => {
  if (isMobile) {
    navigate("/cart");   // mobile → cart page
  } else {
    setDrawerOpen(true); // desktop → slide drawer
  }
};




  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-lg">
      {/* 🌟 TOP STRIP */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm">
        <div className="container mx-auto flex justify-between items-center px-4 py-2">
          <div className="hidden sm:flex justify-between w-full">
            <p className="font-medium">
              🎉 Get 20% Off All Wedding Invites — Limited Time Only!
            </p>
            <ul className="flex gap-5">
              <Link to="/track-order">
                <li className="flex items-center gap-1 cursor-pointer hover:text-white">
                  <TbTruckDelivery /> Order Tracking
                </li>
              </Link>
              <Link to="/contact-us">
                <li className="flex items-center gap-1 cursor-pointer hover:text-white">
                  <FaQuestionCircle /> Help
                </li>
              </Link>
              <li className="flex items-center gap-1 cursor-pointer hover:text-white">
                <FaPhoneAlt /> +91 8368116978
              </li>
            </ul>
          </div>
          <div className="sm:hidden text-center w-full text-[13px] font-semibold animate-pulse">
            ⚡ Flat 20% Off on All Invitation Cards ⚡
          </div>
        </div>
      </div>

      {/* 🧭 MAIN HEADER */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          {/* Mobile Menu + Logo */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMenuOpen(true)}
              className="text-2xl lg:hidden"
            >
              <IoMdMenu />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/vite.svg"
                alt="logo"
                className="w-10 h-10 rounded-full border"
              />
              <span className="text-3xl font-bold text-gray-800 italic">
                AWESOME CRAFTS
              </span>
            </Link>
          </div>

          {/* Search */}
<div className="hidden md:flex w-[40%] relative">
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => handleSearch(e.target.value)}
    placeholder="Search invitation cards..."
    className="w-full border rounded-md px-4 py-2 text-sm focus:border-pink-500"
  />
  {searchQuery && (
    <div className="absolute top-full left-0 w-full bg-white shadow-xl rounded-md mt-1 max-h-80 overflow-y-auto z-[9999]">
      {isSearching && <div className="p-3 text-gray-500 text-sm">Searching...</div>}
      {!isSearching && searchResults.length === 0 && (
        <div className="p-3 text-gray-500 text-sm">No results found</div>
      )}
      {!isSearching && searchResults.map(item => (
        <div
          key={item._id}
          onClick={() => {
            navigate(`/product/${item.slug || item._id}`);
            setSearchQuery("");
            setSearchResults([]);
          }}
          className="flex items-center gap-3 p-3 hover:bg-pink-50 cursor-pointer border-b"
        >
          <img src={item.mainImageUrl} alt={item.title} className="w-12 h-12 rounded object-cover" />
          <div>
            <p className="font-medium text-gray-800">{item.title}</p>
            <p className="text-xs text-gray-500 capitalize">{item.categories?.[0]?.name}</p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>




          {/* Right Buttons */}
          <div className="flex items-center gap-4">
            {/* Call */}
            <a
              href="tel:+919876543210"
              className="hidden lg:flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-pink-600"
            >
              <FaPhoneAlt /> +91 8368116978
            </a>

            {/* Pay Now */}
            <Link to ="/paynow">
            <button className="hidden lg:block bg-pink-600 hover:bg-pink-700 text-white text-sm px-4 py-2 rounded-md transition">
              Pay Now
            </button>
            </Link>

            {/* Sign In / Logout */}
            {!user ? (
              <button
                onClick={() => setShowLogin(true)}
                className="hidden sm:flex items-center gap-1 px-4 py-1.5 border border-gray-800 text-gray-800 rounded-md hover:bg-gray-800 hover:text-white transition text-sm font-medium"
              >
                <FaRegUser /> Sign In
              </button>
            ) : (
              <button
                onClick={logout}
                className="hidden sm:flex items-center gap-1 px-4 py-1.5 border border-gray-800 text-gray-800 rounded-md hover:bg-gray-800 hover:text-white transition text-sm font-medium"
              >
                👋 Logout
              </button>
            )}

          {/* Cart Icon */}
<div onClick={handleCartClick} className="relative cursor-pointer">
  <FaShoppingCart className="text-2xl text-gray-700 hover:text-pink-600 transition" />

  {cartItems.length > 0 && (
    <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs px-1.5 py-0.5 rounded-full">
      {cartItems.length}
    </span>
  )}
</div>


            {/* Login Modal */}
            {showLogin && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <LoginComponent onClose={() => setShowLogin(false)} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✅ CENTERED MENU + DROPDOWN */}
      {/* 📂 Centered Menu Bar with Mega Menu */}
      <nav className="hidden lg:block bg-white border-b border-gray-200 relative">
        {/* ✅ Unified Hover Zone */}
        <div
          className="relative"
          onMouseEnter={() => setActiveMenu(activeMenu)}
          onMouseLeave={() => setTimeout(() => setActiveMenu(null), 200)}
        >
          {/* MENU TABS */}
          <ul className="flex justify-center gap-10 py-3 text-[15px] font-semibold text-gray-800">
            {MEGA_MENU.map((cat) => (
              <li
                key={cat.slug}
                className="cursor-pointer relative"
                onMouseEnter={() => setActiveMenu(cat.slug)}
              >
                <Link
                  to={collectionSlug(cat.slug)}
                  className="flex items-center gap-1 hover:text-pink-600 transition"
                >
                  {cat.icon}
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* ✅ Mega Menu always stays inside hover zone */}
          {activeMenu && (
            <div
              className="absolute left-1/2 -translate-x-1/2 top-full w-[1100px] bg-white shadow-2xl rounded-lg z-[999] animate-fade p-8"
              onMouseEnter={() => setActiveMenu(activeMenu)}
              onMouseLeave={() => setTimeout(() => setActiveMenu(null), 250)}
            >
              <MegaMenu
                category={MEGA_MENU.find((c) => c.slug === activeMenu)}
              />
            </div>
          )}
        </div>
      </nav>

      {/* 📱 Mobile Drawer */}
      <Drawer
        anchor="left"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        PaperProps={{
          className: "w-64 bg-white p-5 flex flex-col",
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/vite.svg"
              alt="awesome-crafts"
              className="w-9 h-9 rounded-full border border-gray-300"
            />
            <span className="text-md font-bold text-gray-800 italic">AWESOME CRAFTS</span>
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 text-xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Mobile Search */}
        <div className="relative">
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => handleSearch(e.target.value)}
    placeholder="Search cards..."
    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4"
  />

  {/* MOBILE SEARCH RESULTS */}
  {searchQuery && (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md max-h-80 overflow-y-auto z-[9999]">
      {isSearching && (
        <div className="p-3 text-gray-500 text-sm">Searching...</div>
      )}

      {!isSearching && searchResults.length === 0 && (
        <div className="p-3 text-gray-500 text-sm">No results found</div>
      )}

      {!isSearching &&
        searchResults.map((item) => (
          <div
            key={item._id}
            onClick={() => {
              navigate(`/product/${item.slug || item._id}`);
              setMenuOpen(false);
              setSearchQuery("");
              setSearchResults([]);
            }}
            className="flex items-center gap-3 p-3 hover:bg-pink-50 cursor-pointer border-b"
          >
            <img
              src={item.mainImageUrl}
              alt={item.title}
              className="w-10 h-10 rounded object-cover"
            />
            <div>
              <p className="font-medium text-gray-800 text-sm">{item.title}</p>
              <p className="text-[11px] text-gray-500 capitalize">
                {item.categories?.[0]?.name}
              </p>
            </div>
          </div>
        ))}
    </div>
  )}
</div>


        {/* Mobile Categories (simple, no mega menu) */}
        <ul className="flex flex-col gap-3">
          {MEGA_MENU.map((cat) => (
            <li key={cat.slug}>
              <Link
                to={`/collections/${cat.slug}`}
                className="block text-gray-700 hover:text-pink-600 transition py-1"
                onClick={() => setMenuOpen(false)}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t pt-4 flex flex-col gap-3">
          <a
            href="tel:+919876543210"
            className="text-gray-700 font-medium hover:text-pink-600 transition"
            onClick={() => setMenuOpen(false)}
          >
            <FaPhoneAlt className="inline mr-2" />
            +91 98765 43210
          </a>
          <button className="bg-pink-600 hover:bg-pink-700 text-white text-sm px-4 py-2 rounded-md transition text-left">
            Pay Now
          </button>
          <Link
            to="/login"
            className="text-gray-700 font-medium hover:text-pink-600 transition"
            onClick={() => setMenuOpen(false)}
          >
            <FaRegUser className="inline mr-2" />
            Sign In / Register
          </Link>
        </div>
      </Drawer>
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}

/* ✅ Add this once in global CSS */
