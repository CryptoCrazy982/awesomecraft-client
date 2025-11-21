import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getAllCategories } from "../api/categoryAPI";

export default function PopularCategories() {
  const scrollerRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [dragging, setDragging] = useState(false);
  const start = useRef({ x: 0, left: 0 });

  // 🚀 Fetch highlighted subcategories
  useEffect(() => {
    getAllCategories()
      .then((data) => {
        const highlighted = data.filter(
          (cat) => cat.highlighted === true && cat.parentCategory // only subcategories
        );

        setCategories(highlighted);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanLeft(scrollLeft > 0);
    setCanRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scrollByAmount = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.8);
    el.scrollTo({ left: el.scrollLeft + (dir === "left" ? -amount : amount), behavior: "smooth" });
  };

  const onDragStart = (clientX) => {
    const el = scrollerRef.current;
    if (!el) return;
    setDragging(true);
    start.current = { x: clientX, left: el.scrollLeft };
  };
  const onDragMove = (clientX) => {
    if (!dragging) return;
    const el = scrollerRef.current;
    const delta = clientX - start.current.x;
    el.scrollLeft = start.current.left - delta;
    updateArrows();
  };
  const endDrag = () => setDragging(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateArrows();
    const onScroll = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => updateArrows();
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Most Loved Invitation Collections
          </h2>
          <Link to="/collections" className="text-pink-600 hover:text-pink-700 font-medium">
            View All
          </Link>
        </div>

        <div className="relative">
          <button
            onClick={() => scrollByAmount("left")}
            disabled={!canLeft}
            className={`hidden md:flex items-center justify-center absolute -left-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full shadow-md bg-white transition
              ${canLeft ? "opacity-100 cursor-pointer hover:bg-gray-100" : "opacity-0 pointer-events-none"}`}
          >
            <FaChevronLeft />
          </button>

          <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent" />

          <div
            ref={scrollerRef}
            className="flex gap-10 overflow-x-auto scroll-smooth px-4 md:px-8 no-scrollbar"
            onMouseDown={(e) => onDragStart(e.clientX)}
            onMouseMove={(e) => onDragMove(e.clientX)}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
            onTouchEnd={endDrag}
          >
            {categories.map((cat) => (
              <Link
                key={cat._id}
                to={`/collections/${cat.slug}`}
                className="flex flex-col items-center shrink-0 min-w-[140px]"
              >
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border shadow-md bg-white transition-transform duration-300 hover:scale-110">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <p className="mt-3 text-center text-sm font-medium text-gray-700 leading-snug line-clamp-2">
                  {cat.name}
                </p>
              </Link>
            ))}
          </div>

          <button
            onClick={() => scrollByAmount("right")}
            disabled={!canRight}
            className={`hidden md:flex items-center justify-center absolute -right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full shadow-md bg-white transition
              ${canRight ? "opacity-100 cursor-pointer hover:bg-gray-100" : "opacity-0 pointer-events-none"}`}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
