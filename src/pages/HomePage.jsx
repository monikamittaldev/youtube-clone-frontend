import { useState } from "react";
import VideoCard from "../components/Home/VideoCard";
import useFetch from "../hooks/useFetch";
import { useOutletContext } from "react-router-dom";
import useIsMobile from "../hooks/useIsMobile";
import VideoCardSkeleton from "../components/Home/VideoCardSkeleton";
import CategoryPills from "../components/Home/CategoryPills";

const categories = [
  "All",
  "Web Development",
  "JavaScript",
  "React",
  "Node.js",
  "Data Structures",
  "Python",
  "CSS",
  "Database",
  "DevOps",
  "Music",
  "Gaming",
  "News",
  "Sports",
  "MongoDB",
  "Express",
  "Tailwind",
  "Programming",
  "Podcasts",
];

const HomePage = () => {
  const { sidebarOpen } = useOutletContext();
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState("All");

  // ── Build URL based on active category ──────────────────────
  const apiUrl =
    activeCategory === "All"
      ? "http://localhost:5000/api/videos"
      : `http://localhost:5000/api/videos?category=${encodeURIComponent(activeCategory)}`;

  const { data, loading, error } = useFetch(apiUrl);

  const videoList = data?.data || [];

  return (
    <div
      className={`pt-20 px-4 transition-[margin] duration-300 overflow-hidden ease-in-out ${
        isMobile ? "ml-0" : sidebarOpen ? "ml-60" : "ml-20"
      }`}
    >
      {/* ── Category Pills ───────────────────────────────────── */}
      <CategoryPills
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* ── Loading ──────────────────────────────────────────── */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <VideoCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* ── Error ────────────────────────────────────────────── */}
      {error && !loading && (
        <div className="pt-20 text-center text-red-500">{error}</div>
      )}

      {/* ── Empty state ──────────────────────────────────────── */}
      {!loading && !error && videoList.length === 0 && (
        <div className="pt-20 text-center text-gray-400 dark:text-gray-500">
          <p className="text-lg font-medium">No videos found</p>
          <p className="text-sm mt-1">
            No videos in{" "}
            <span className="font-semibold">"{activeCategory}"</span> category
            yet.
          </p>
        </div>
      )}

      {/* ── Videos ───────────────────────────────────────────── */}
      {!loading && !error && videoList.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoList.map((item) => (
            <VideoCard key={item._id} video={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
