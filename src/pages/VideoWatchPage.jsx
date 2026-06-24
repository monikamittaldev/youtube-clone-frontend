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
import PageLoader from "../components/PageLoader";
import Comments from "../components/Watch/Comments";
import RelatedVideos from "../components/Watch/RelatedVideos";

const VideoWatchPage = () => {
  const { id } = useParams();
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const { data, loading, error } = useFetch(
    `http://localhost:5000/api/videos/${id}`,
  );

  console.log(data);

  const video = data?.data;

  // ← set like count in useEffect not in render
  useEffect(() => {
    if (video?._id) {
      console.log("Video data : ", video.videoUrl);
      setLikeCount(video.likes?.length || 0);
    }
  }, [video?._id]);

  // Like handler
  const handleLike = async () => {
    const token = localStorage.getItem("yt_token");
    if (!token) return alert("Please sign in to like videos");
    try {
      const res = await fetch(`http://localhost:5000/api/videos/${id}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setLikeCount(data.likes);
        setLiked((v) => !v);
        setDisliked(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Dislike handler
  const handleDislike = async () => {
    const token = localStorage.getItem("yt_token");
    if (!token) return alert("Please sign in");
    try {
      const res = await fetch(
        `http://localhost:5000/api/videos/${id}/dislike`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      if (data.success) {
        setDisliked((v) => !v);
        setLiked(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

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

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-primary">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-primary ">
      <div className="max-w-[1800px] mx-auto px-4 py-4 flex flex-col lg:flex-row gap-6">
        {/* ── Left — Player + Info ── */}
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

            {/* Like / Dislike / Share */}
            <div className="flex items-center gap-2">
              {/* Like + Dislike group */}
              <div className="flex items-center bg-secondary rounded-full overflow-hidden">
                <button
                  onClick={handleLike}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-hover transition-colors border-r border-[#3f3f3f]"
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
                  className="flex items-center px-4 py-2 hover:bg-hover transition-colors"
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
          <Comments videoId={id} initialComments={video.comments || []} />
        </div>

        {/* ── Right — Related Videos ── */}
        <div className="w-full lg:w-[380px] flex-shrink-0">
          <RelatedVideos currentVideoId={id} />
        </div>
      </div>
    </div>
  );
};

export default VideoWatchPage;
