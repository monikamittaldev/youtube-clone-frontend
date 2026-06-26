import { useState, useEffect } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useIsMobile from "../hooks/useIsMobile";
import PageLoader from "../components/PageLoader";
import ChannelHeader from "../components/Channel/ChannelHeader";
import ChannelVideoGrid from "../components/Channel/ChannelVideoGrid";
import VideoFormModal from "../components/Channel/VideoFormModal";
import useDelete from "../hooks/useDelete";
import ConfirmDialog from "../components/ConfirmDialog";
import { useToast } from "../components/ToastContainer";

const ChannelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarOpen } = useOutletContext();
  const isMobile = useIsMobile();

  const token = localStorage.getItem("yt_token");
  const user = JSON.parse(localStorage.getItem("yt_user") || "null");
  const { showToast } = useToast();
  const [videos, setVideos] = useState([]);
  const [editingVideo, setEditingVideo] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(
    location.state?.openUpload || false,
  );

  const { data, loading, error } = useFetch(
    `http://localhost:5000/api/channel/${id}`,
  );

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const { deleteVideo, loading: deleting } = useDelete(token);
  const channel = data?.channel;

  // ── Check if current user is owner ───────
  const isOwner =
    user?._id === channel?.owner?._id || user?.id === channel?.owner?._id;

  // ── Redirect if not logged in ─────────────
  useEffect(() => {
    if (!token) navigate("/auth");
  }, []);

  // ── Set videos from API ───────────────────
  useEffect(() => {
    if (channel?.videos) {
      setVideos(channel.videos);
    }
  }, [channel]);

  // ── Handle video saved ────────────────────
  const handleVideoSaved = (video, isEdit) => {
    if (isEdit) {
      setVideos((prev) => prev.map((v) => (v._id === video._id ? video : v)));
    } else {
      setVideos((prev) => [video, ...prev]);
    }
  };

  // ── Handle delete video ───────────────────
  const handleDeleteVideo = (videoId) => {
    setSelectedVideoId(videoId);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    const success = await deleteVideo(
      `http://localhost:5000/api/videos/${selectedVideoId}`,
    );

    if (success) {
      setVideos((prev) =>
        prev.filter((video) => video._id !== selectedVideoId),
      );
       showToast("Video deleted successfully");
    }

    setShowDeleteDialog(false);
    setSelectedVideoId(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
    setSelectedVideoId(null);
  };

  // ── Open edit modal ───────────────────────
  const handleEditClick = (video) => {
    setEditingVideo(video);
    setShowVideoModal(true);
  };

  // ── Open upload modal ─────────────────────
  const handleUploadClick = () => {
    setEditingVideo(null);
    setShowVideoModal(true);
  };

  // ── Close modal ───────────────────────────
  const handleCloseModal = () => {
    setShowVideoModal(false);
    setEditingVideo(null);
  };

  if (loading) return <PageLoader />;
  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-primary">
        <p className="text-red-500">{error}</p>
      </div>
    );
  if (!channel) return null;

  return (
    <div
      className={`min-h-screen bg-primary pt-14 transition-[margin] duration-300 ease-in-out ${
        isMobile ? "ml-0" : sidebarOpen ? "ml-60" : "ml-20"
      }`}
    >
      {/* Channel Banner + Info */}
      <ChannelHeader
        channel={channel}
        videosCount={videos.length}
        isOwner={isOwner}
        onUploadClick={handleUploadClick}
      />
      {/* Videos Grid */}
      <div className="max-w-[1200px] mx-auto px-4 mb-10">
        <ChannelVideoGrid
          videos={videos}
          isOwner={isOwner}
          onUploadClick={handleUploadClick}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteVideo}
        />
      </div>
      {/* Video Upload/Edit Modal */}
      {showVideoModal && (
        <VideoFormModal
          channelId={id}
          video={editingVideo}
          onClose={handleCloseModal}
          onSaved={handleVideoSaved}
        />
      )}
      <ConfirmDialog
        open={showDeleteDialog}
        title="Delete Video"
        message="Are you sure you want to delete this video? This action cannot be undone."
        loading={deleting}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />{" "}
    </div>
  );
};

export default ChannelPage;
