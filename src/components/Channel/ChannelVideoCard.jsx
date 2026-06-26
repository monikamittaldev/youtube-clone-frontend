import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbShare3 } from "react-icons/tb";

// ── Format views ─────────────────────────────
const formatViews = (views) => {
  if (views >= 1_000_000) return (views / 1_000_000).toFixed(1) + "M";
  if (views >= 1_000) return (views / 1_000).toFixed(1) + "K";
  return views;
};

// ── Format time ago ──────────────────────────
const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} minutes ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hours ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} months ago`;
  return `${Math.floor(months / 12)} years ago`;
};

const getDuration = () => {
  const mins = Math.floor(Math.random() * 20) + 3;
  const secs = Math.floor(Math.random() * 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const ChannelVideoCard = ({ video, isOwner, onDeleteClick, onEditClick }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState("bottom");
  const menuBtnRef = useRef(null);
  const menuRef = useRef(null);
  const duration = getDuration();

  const channelAvatar = video.channelId?.channelAvatar;
  const channelName = video.channelId?.channelName || video.uploaderName;

  // ── Close menu on outside click ───────────
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !menuBtnRef.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Calculate menu position ───────────────
  const handleMenuToggle = (e) => {
    e.stopPropagation();
    if (!showMenu && menuBtnRef.current) {
      const rect = menuBtnRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // If less than 200px below → open upward
      setMenuPosition(spaceBelow < 200 ? "top" : "bottom");
    }
    setShowMenu((v) => !v);
  };

  return (
    <div className="cursor-pointer group relative rounded-xl p-2 hover:bg-[#a2d9eb44] dark:hover:bg-[#191c2fb5] transition-colors duration-200">
      <Link to={`/watch/${video._id}`}>
        {/* Thumbnail */}
        <div className="relative overflow-hidden rounded-xl shadow">
          <img
            src={
              video.thumbnailUrl ||
              `https://picsum.photos/seed/${video._id}/320/180`
            }
            alt={video.title}
            className="w-full aspect-video object-cover rounded-xl hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = `https://picsum.photos/seed/${video._id}/320/180`;
            }}
          />
          {/* Duration badge */}
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
            {duration}
          </span>
        </div>
      </Link>

      {/* Details */}
      <div className="flex gap-3 mt-3 pr-6 relative">
        {/* Channel Avatar */}
        {channelAvatar ? (
          <img
            src={channelAvatar}
            alt={channelName}
            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
            {channelName?.[0]?.toUpperCase()}
          </div>
        )}
        <Link to={`/watch/${video._id}`}>
          {/* Video Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-primary line-clamp-2 leading-snug">
              {video.title}
            </h3>
            <p className="text-xs text-secondary mt-1">{channelName}</p>
            <p className="text-xs text-secondary">
              {formatViews(video.views)} views • {timeAgo(video.createdAt)}
            </p>
          </div>
        </Link>
        {/* Edit / Delete — owner only */}
        {isOwner && <div className="flex gap-2 px-2"></div>}
        {/* 3 Dots — always visible */}
        <div className="absolute right-0 top-0 rounded-2xl hover:bg-[#1645a44d]">
          <button
            ref={menuBtnRef}
            className="p-1 rounded-full hover:bg-hover transition-colors"
            onClick={handleMenuToggle}
          >
            <BsThreeDotsVertical className="text-primary text-base" />
          </button>
          {/* Dropdown Menu */}
          {showMenu && (
            <div
              ref={menuRef}
              className={`
      absolute right-0 z-50 w-44
      rounded-xl border border-theme
      bg-white dark:bg-[#272727]
      shadow-xl p-2
      ${menuPosition === "top" ? "bottom-10" : "top-10"}
    `}
            >
              <button
                onClick={() => onEditClick(video)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-secondary hover:bg-gray-100 hover:text-primary transition-colors"
              >
                <MdOutlineEdit className="text-lg" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => onDeleteClick(video._id)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <MdDeleteOutline className="text-lg" />
                <span>Delete</span>
              </button>
            </div>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default ChannelVideoCard;
