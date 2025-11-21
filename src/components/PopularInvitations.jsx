import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import { fetchTemplates } from "../api/templateAPI";

// 🟦 Tabs with label + slug
const tabs = [
  { label: "All", slug: "" },
  { label: "Wedding", slug: "wedding-invites" },
  { label: "Baby Shower", slug: "Baby-and-Kids-invitations" },
  { label: "Corporate", slug: "corporate-invites" },
  { label: "Puja Invites", slug: "puja-invites" },
  { label: "Anniversary", slug: "anniversary" },
];

export default function PopularInvitations() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 🔹 Fetch from backend using slug
  useEffect(() => {
    const loadTemplates = async () => {
      setLoading(true);

      const data =
        activeTab.slug === ""
          ? await fetchTemplates() // fetch all
          : await fetchTemplates({ categorySlug: activeTab.slug });

      setTemplates(data);
      setLoading(false);
    };

    loadTemplates();
  }, [activeTab]);

  // 🔹 Pagination
  const totalPages = Math.ceil(templates.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const displayed = templates.slice(startIdx, startIdx + itemsPerPage);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <section className="w-full py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-2">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">
            Popular Invitations
          </h2>

          <div className="flex gap-6 text-sm font-medium text-gray-600 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.slug || "all"}
                onClick={() => handleTabClick(tab)}
                className={`pb-1 border-b-2 transition ${
                  activeTab.slug === tab.slug
                    ? "text-pink-600 border-pink-600"
                    : "border-transparent hover:text-pink-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {loading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))
          ) : displayed.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              Coming Soon...
            </p>
          ) : (
            displayed.map((t) => (
              <ProductCard
                key={t._id}
                product={{
                  id: t._id,
                  slug: t.slug,
                  title: t.title,
                  category: t.categories?.[0]?.name || "Uncategorized",
                  price: t.offerPrice,
                  salePrice: t.salePrice,
                  discount: t.discount,
                  image1: t.mainImageUrl,
                  image2: t.images?.[1]?.url || t.mainImageUrl,
                  productType: t.productType,
                }}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md text-sm font-medium border transition ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100 text-gray-800"
              }`}
            >
              ← Prev
            </button>

            <div className="text-sm font-medium text-gray-600">
              Page {currentPage} of {totalPages}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md text-sm font-medium border transition ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100 text-gray-800"
              }`}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
