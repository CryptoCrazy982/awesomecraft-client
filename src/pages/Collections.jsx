import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCategories } from "../api/categoryAPI";

const Collections = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center text-gray-500">
        Loading collections...
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="py-20 text-center text-gray-500">
        No collections available
      </section>
    );
  }

  // ✅ Separate broad, category, subcategory
  const broadCategories = categories.filter((cat) => !cat.parentCategory);
  const subCategories = (parentId) =>
    categories.filter((cat) => cat.parentCategory === parentId);

  return (
    <section className="w-full bg-white py-14">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Most-Loved Collections
          </h1>
          <p className="mt-2 text-gray-500">
            Explore all our beautiful invitation collections crafted with love 💌
          </p>
        </div>

        {/* Loop over broad categories */}
        {broadCategories.map((broad) => (
          <div key={broad._id} className="mb-16">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 border-b pb-2 text-pink-700">
              {broad.name}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-10 place-items-center">
              {subCategories(broad._id).length > 0 ? (
                subCategories(broad._id).map((cat) => (
                  <Link
                    key={cat._id}
                    to={`/collections/${cat.slug}`}
                    className="group flex flex-col items-center transition-transform hover:scale-105"
                  >
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border shadow-sm bg-white group-hover:shadow-lg">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <p className="mt-3 text-center text-[14px] md:text-sm font-medium text-gray-700 leading-snug">
                      {cat.name}
                    </p>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 col-span-full text-center">
                  No categories found under {broad.name}
                </p>
              )}
            </div>

            {/* ✅ Nested subcategories display */}
            {subCategories(broad._id).map((cat) => {
              const subCats = subCategories(cat._id);
              if (subCats.length === 0) return null;
              return (
                <div key={cat._id} className="mt-10">
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">
                    {cat.name}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 place-items-center">
                    {subCats.map((sub) => (
                      <Link
                        key={sub._id}
                        to={`/subcategory/${sub.slug}`}
                        className="group flex flex-col items-center transition-transform hover:scale-105"
                      >
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border shadow-sm bg-white group-hover:shadow-lg">
                          <img
                            src={sub.image}
                            alt={sub.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <p className="mt-3 text-center text-[13px] md:text-sm font-medium text-gray-700 leading-snug">
                          {sub.name}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collections;
