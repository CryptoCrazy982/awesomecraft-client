import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import { Drawer, MenuItem, Select } from "@mui/material";
import { FaFilter } from "react-icons/fa6";
import { MdOutlineSort } from "react-icons/md";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function CategoryPage() {
  const { slug } = useParams();

  const [filters, setFilters] = useState({
    style: [],
    color: [],
    language: [],
    editableLevel: [],
    productType: [],
    dimension: [],
    price: [0, 5000],
    rating: [],
  });

  const [sortBy, setSortBy] = useState("name_asc");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const categoryTitle =
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) +
    " Invitations";

  const buildParams = () => {
    const params = { categorySlug: slug };
    if (filters.style?.length) params.style = filters.style.join(",");
    if (filters.color?.length) params.color = filters.color.join(",");
    if (filters.language?.length) params.language = filters.language.join(",");
    if (filters.editableLevel?.length)
      params.editableLevel = filters.editableLevel.join(",");
    if (filters.productType?.length)
      params.productType = filters.productType.join(",");
    if (filters.dimension?.length)
      params.dimension = filters.dimension.join(",");
    if (filters.price?.length) {
      params.minPrice = filters.price[0];
      params.maxPrice = filters.price[1];
    }
    if (filters.rating?.length) params.rating = filters.rating.join(",");
    params.sort = sortBy;
    return params;
  };

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API_BASE}/public/templates`, {
          params: buildParams(),
        });
        setProducts(data.templates || []);
        setCurrentPage(1);
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, [slug, filters, sortBy]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const displayedProducts = products.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">

      {/* HERO SECTION */}
      <div className="relative w-full bg-gradient-to-br from-pink-50 to-blue-50 py-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-pink-200 rounded-full opacity-30 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-200 rounded-full opacity-30 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 max-w-full overflow-hidden">
          <div className="text-sm text-gray-500 mb-2 flex gap-1">
            <Link to="/" className="hover:text-pink-600">Home</Link>
            <span>›</span>
            <span className="font-medium text-gray-700">{categoryTitle}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight drop-shadow-sm max-w-full break-words">
            {categoryTitle}
          </h1>

          <p className="text-gray-600 mt-2 text-lg max-w-2xl break-words">
            Discover premium, fully customizable invitation templates crafted for your special moments.
          </p>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto px-2 md:px-6 py-10 flex gap-8">

        {/* SIDEBAR */}
        <div className="hidden md:block w-72 shrink-0 sticky top-24 self-start">
          <div className="bg-white/70 backdrop-blur-xl shadow-md rounded-2xl p-5 border border-gray-100">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>
        </div>

        {/* PRODUCT SECTION */}
        <div className="flex-1 min-w-0">

          {/* TOOLBAR */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-700 font-medium text-lg">
              {products.length} templates found
            </p>

            <div className="flex items-center gap-3">
              <button
                className="md:hidden flex items-center gap-2 bg-white shadow-sm px-4 py-2 rounded-full border hover:bg-gray-50"
                onClick={() => setSidebarOpen(true)}
              >
                <FaFilter className="text-pink-600" />
                <span className="text-sm text-gray-700">Filters</span>
              </button>

              <div className="flex items-center gap-2 bg-white shadow-sm rounded-full px-3 py-1 border hover:shadow transition">
                <MdOutlineSort className="text-gray-500 text-xl" />
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  size="small"
                  className="!text-sm"
                  sx={{ "& fieldset": { border: "none" } }}
                >
                  <MenuItem value="name_asc">Name A → Z</MenuItem>
                  <MenuItem value="name_desc">Name Z → A</MenuItem>
                  <MenuItem value="price_asc">Price Low → High</MenuItem>
                  <MenuItem value="price_desc">Price High → Low</MenuItem>
                </Select>
              </div>
            </div>
          </div>

          {/* PRODUCT GRID */}
          {!loading && displayedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7 [&>*]:min-w-0">
                {displayedProducts.map((p) => (
                  <ProductCard
                    key={p._id}
                    product={{
                      id: p._id,
                      slug: p.slug,
                      title: p.title,
                      category: p.categories?.[0]?.name,
                      categorySlug: p.categories?.[0]?.slug || "",
                      price: p.offerPrice,
                      salePrice: p.salePrice,
                      discount: p.discount,
                      image1: p.mainImageUrl || p.images?.[0]?.url,
                      image2: p.images?.[1]?.url || p.mainImageUrl,
                      productType: p.productType,
                      rating: p.rating || 4.5,
                    }}
                  />
                ))}
              </div>

              {/* PAGINATION */}
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className={`px-4 py-2 rounded-full border text-sm ${
                    currentPage === 1
                      ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  ← Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-full border text-sm transition ${
                      currentPage === page
                        ? "bg-pink-600 text-white shadow"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className={`px-4 py-2 rounded-full border text-sm ${
                    currentPage === totalPages
                      ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  Next →
                </button>
              </div>
            </>
          ) : loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7 [&>*]:min-w-0">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-10">No templates found.</div>
          )}
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      <Drawer
        anchor="right"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      >
        <div className="w-[300px] p-4">
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </div>
      </Drawer>
    </div>
  );
}
