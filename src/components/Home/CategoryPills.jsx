import { useRef, useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const CategoryPills = ({ categories, activeCategory, setActiveCategory }) => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  // ── Update arrow visibility on scroll ─────────────────────
  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 10);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  return (
    <div className="relative flex items-center mb-6">

      {/* ── Left Arrow ──────────────────────────────────────── */}
      {showLeft && (
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 z-10 flex items-center justify-center
            w-8 h-8 rounded-full bg-white dark:bg-[#212121]
            shadow-md border border-gray-200 dark:border-[#3a3a3a]
            hover:bg-gray-100 dark:hover:bg-[#2f2f2f] transition-colors"
        >
          <MdChevronLeft className="text-xl text-gray-700 dark:text-gray-300" />
        </button>
      )}

      {/* ── Pills Strip ─────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className={`flex gap-3 overflow-x-auto scrollbar-hide pb-1 transition-all duration-200
          ${showLeft  ? "pl-10" : "pl-0"}
          ${showRight ? "pr-10" : "pr-0"}`}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
              ${activeCategory === category
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-gray-100 hover:bg-gray-200 text-black dark:bg-[#272727] dark:text-white dark:hover:bg-[#3f3f3f]"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* ── Right Arrow ─────────────────────────────────────── */}
      {showRight && (
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 z-10 flex items-center justify-center
            w-8 h-8 rounded-full bg-white dark:bg-[#212121]
            shadow-md border border-gray-200 dark:border-[#3a3a3a]
            hover:bg-gray-100 dark:hover:bg-[#2f2f2f] transition-colors"
        >
          <MdChevronRight className="text-xl text-gray-700 dark:text-gray-300" />
        </button>
      )}

    </div>
  );
};

export default CategoryPills;