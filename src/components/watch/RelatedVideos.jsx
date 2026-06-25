import React from "react";
import { useNavigate } from "react-router-dom";
import PageLoader from "../PageLoader";
import useFetch from "../../hooks/useFetch";

const formatViews = (views) => {
  if (views >= 1_000_000) return (views / 1_000_000).toFixed(1) + "M";
  if (views >= 1_000) return (views / 1_000).toFixed(1) + "K";
  return views;
};

const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "Today";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} months ago`;
  return `${Math.floor(months / 12)} years ago`;
};

const RelatedVideos = ({ currentVideoId }) => {
  const navigate = useNavigate();
  const { data, loading } = useFetch(`http://localhost:5000/api/videos`);

  if (loading) return <PageLoader />;

  // ✅ filter directly — no useState needed
  const videos = (data?.data || [])
    .filter((v) => v._id !== currentVideoId)
    .sort(() => Math.random() - 0.5)
    .slice(0, 12);

  return (
    <div className="flex flex-col gap-3">
      {videos.map((video) => (
        <div
          key={video._id}
          className="flex gap-2 cursor-pointer group rounded-xl p-1 hover:bg-hover transition-colors"
          onClick={() => navigate(`/watch/${video._id}`)}
        >
          {/* Thumbnail */}
          <div className="relative w-40 flex-shrink-0 rounded-lg overflow-hidden">
            <img
              src={
                video.thumbnailUrl ||
                `https://picsum.photos/seed/${video._id}/160/90`
              }
              alt={video.title}
              className="w-full aspect-video object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = `https://picsum.photos/seed/${video._id}/160/90`;
              }}
            />
            <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded">
              {Math.floor(Math.random() * 20) + 3}:
              {String(Math.floor(Math.random() * 60)).padStart(2, "0")}
            </span>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 pt-1">
            <h3 className="text-xs font-medium text-primary line-clamp-2 leading-snug">
              {video.title}
            </h3>
            <p className="text-xs text-secondary mt-1">
              {video.channelId?.channelName || video.uploaderName}
            </p>
            <p className="text-xs text-secondary">
              {formatViews(video.views)} views • {timeAgo(video.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedVideos;
