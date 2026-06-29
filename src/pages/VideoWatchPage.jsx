import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { PiShareFatLight } from "react-icons/pi";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import usePost from "../hooks/usePost";
import { useToast } from "../components/ToastContainer";
import PageLoader from "../components/PageLoader";
import Comments from "../components/Watch/Comments";
import RelatedVideos from "../components/Watch/RelatedVideos";

const BASE = "http://localhost:5000/api/videos";

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

const VideoWatchPage = () => {
  const { id } = useParams();
  const token = localStorage.getItem("yt_token");
  const user = JSON.parse(localStorage.getItem("yt_user") || "null");
  const { showToast } = useToast();

  const [showFullDesc, setShowFullDesc] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // ── Fetch video ────────────────────────────────────────────
  const { data, loading, error } = useFetch(`${BASE}/${id}`);
  const video = data?.data;

  // ── Like / Dislike hooks ───────────────────────────────────
  const { postData: likePost, loading: likeLoading } = usePost(
    `${BASE}/${id}/like`,
  );
  const { postData: dislikePost, loading: dislikeLoading } = usePost(
    `${BASE}/${id}/dislike`,
  );

  // ── Sync initial like state from video data ────────────────
  useEffect(() => {
    if (video?._id) {
      setLikeCount(video.likes?.length || 0);
      if (user) {
        setLiked(video.likes?.includes(user.id));
        setDisliked(video.dislikes?.includes(user.id));
      }
    }
  }, [video?._id]);

  // ── Like handler ───────────────────────────────────────────
  const handleLike = async () => {
    if (!token) {
      showToast("Please sign in to like videos", "error");
      return;
    }
    if (likeLoading) return;
    try {
      const data = await likePost({}, token);
      if (data?.success) {
        setLikeCount(data.likes);
        setLiked((v) => !v);
        if (disliked) setDisliked(false);
      } else {
        showToast(data?.message || "Failed to like", "error");
      }
    } catch (err) {
      showToast(err.message || "Something went wrong", "error");
    }
  };

  // ── Dislike handler ────────────────────────────────────────
  const handleDislike = async () => {
    if (!token) {
      showToast("Please sign in", "error");
      return;
    }
    if (dislikeLoading) return;
    try {
      const data = await dislikePost({}, token);
      if (data?.success) {
        setDisliked((v) => !v);
        if (liked) {
          setLiked(false);
          setLikeCount((c) => Math.max(0, c - 1));
        }
      } else {
        showToast(data?.message || "Failed to dislike", "error");
      }
    } catch (err) {
      showToast(err.message || "Something went wrong", "error");
    }
  };

  if (loading) return <PageLoader />;

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-primary">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  console.log("video url : "+video.videoUrl);

  return (
    <div className="pt-16 min-h-screen bg-primary">
      <div className="max-w-[1800px] mx-auto px-4 py-4 flex flex-col lg:flex-row gap-6">
        {/* ── Left — Player + Info ────────────────────────── */}
        <div className="flex-1 min-w-0">
          {/* Video Player */}
          <div className="w-full rounded-xl overflow-hidden bg-black aspect-video">
            <ReactPlayer
              src={video.videoUrl}
              controls
              width="100%"
              height="100%"
              playing={false}
            />
          </div>

          {/* Title */}
          <h1 className="text-primary font-semibold text-lg mt-4 leading-snug">
            {video.title}
          </h1>

          {/* Channel + Actions Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3">
            {/* Channel Info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                {video.channelId?.channelName?.[0]?.toUpperCase() ||
                  video.uploaderName?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="text-primary font-medium text-sm">
                  {video.channelId?.channelName || video.uploaderName}
                </p>
                <p className="text-secondary text-xs">
                  {formatViews(video.views)} views
                </p>
              </div>
              <button className="ml-4 dark:text-stone-950 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-stone-900 transition-colors bg-stone-950 dark:bg-white dark:hover:bg-stone-200">
                Subscribe
              </button>
            </div>

            {/* Like / Dislike / Share / Save */}
            <div className="flex items-center gap-2">
              {/* Like + Dislike group */}
              <div className="flex items-center bg-secondary rounded-full overflow-hidden">
                <button
                  onClick={handleLike}
                  disabled={likeLoading}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-hover transition-colors border-r border-[#3f3f3f] disabled:opacity-60"
                >
                  {liked ? (
                    <AiFillLike className="text-xl text-primary" />
                  ) : (
                    <AiOutlineLike className="text-xl text-primary" />
                  )}
                  <span className="text-sm text-primary">{likeCount}</span>
                </button>
                <button
                  onClick={handleDislike}
                  disabled={dislikeLoading}
                  className="flex items-center px-4 py-2 hover:bg-hover transition-colors disabled:opacity-60"
                >
                  {disliked ? (
                    <AiFillDislike className="text-xl text-primary" />
                  ) : (
                    <AiOutlineDislike className="text-xl text-primary" />
                  )}
                </button>
              </div>

              {/* Share */}
              <button className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full hover:bg-hover transition-colors">
                <PiShareFatLight className="text-xl text-primary" />
                <span className="text-sm text-primary">Share</span>
              </button>

              {/* Save */}
              <button className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full hover:bg-hover transition-colors">
                <MdOutlinePlaylistAdd className="text-xl text-primary" />
                <span className="text-sm text-primary hidden sm:block">
                  Save
                </span>
              </button>
            </div>
          </div>

          {/* Description Box */}
          <div
            className="bg-secondary rounded-xl p-4 mt-4 cursor-pointer"
            onClick={() => setShowFullDesc((v) => !v)}
          >
            <p className="text-sm text-primary font-medium mb-1">
              {formatViews(video.views)} views • {timeAgo(video.createdAt)}
            </p>
            <p
              className={`text-sm text-secondary whitespace-pre-wrap leading-relaxed ${
                showFullDesc ? "" : "line-clamp-2"
              }`}
            >
              {video.description || "No description available."}
            </p>
            <button className="text-sm font-semibold text-primary mt-2">
              {showFullDesc ? "Show less" : "...more"}
            </button>
          </div>

          {/* Comments */}
          <Comments videoId={id} />
        </div>

        {/* ── Right — Related Videos ───────────────────────── */}
        <div className="w-full lg:w-[380px] flex-shrink-0">
          <RelatedVideos currentVideoId={id} />
        </div>
      </div>
    </div>
  );
};

export default VideoWatchPage;
