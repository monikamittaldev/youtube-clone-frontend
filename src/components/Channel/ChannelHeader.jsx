import { useState } from "react";
import { MdOutlineVideoCall } from "react-icons/md";
import ChannelDescriptionModal from "./ChannelDescriptionModal";

const ChannelHeader = ({ channel, videosCount, isOwner, onUploadClick }) => {
  const [showDescModal, setShowDescModal] = useState(false);

  return (
    <>
      {/* Banner */}
      <div className="max-w-[1280px] mx-auto mt-4 px-4 md:px-0">
        <div
          className="w-full h-36 md:h-52 rounded-2xl overflow-hidden bg-gradient-to-r from-[#1a1a2e] to-[#16213e]"
          style={{
            backgroundImage: channel.channelBanner
              ? `url(${channel.channelBanner})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      {/* Channel Content */}
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex flex-row gap-4 md:gap-6 py-4 md:py-6 mb-2 items-center md:items-start">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-14 h-14 md:w-36 md:h-36 rounded-full overflow-hidden bg-red-600 flex items-center justify-center text-white text-2xl md:text-4xl font-bold">
              {channel.channelAvatar ? (
                <img
                  src={channel.channelAvatar}
                  alt={channel.channelName}
                  className="w-full h-full object-cover"
                />
              ) : (
                channel.channelName?.[0]?.toUpperCase()
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <h1 className="text-lg md:text-4xl font-bold text-gray-900 dark:text-white truncate">
              {channel.channelName}
            </h1>

            <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mt-1 text-xs md:text-sm text-gray-600 dark:text-gray-400">
              <span className="text-stone-950 dark:text-white font-semibold">
                {channel.handle}
              </span>
              <span>•</span>
              <span>
                {videosCount} {videosCount === 1 ? "video" : "videos"}
              </span>
            </div>

            {/* Description — clickable */}
            {channel.description && (
              <div
                onClick={() => setShowDescModal(true)}
                className="flex items-baseline text-xs md:text-sm cursor-pointer mt-1"
              >
                <p className="text-gray-500 dark:text-gray-400 max-w-[200px] md:max-w-60 line-clamp-1 hover:text-gray-800 dark:hover:text-white transition-colors">
                  {channel.description}
                </p>
                <span className="text-gray-900 dark:text-white font-semibold ml-1 whitespace-nowrap">
                  ...more
                </span>
              </div>
            )}

            {isOwner && (
              <button
                onClick={onUploadClick}
                className="mt-3 w-fit flex items-center gap-2 rounded-full bg-gray-200 dark:bg-[#272727] px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-medium text-stone-950 dark:text-white hover:bg-gray-300 dark:hover:bg-[#3f3f3f] transition-colors"
              >
                <MdOutlineVideoCall className="text-lg md:text-xl" />
                Upload video
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-[#3f3f3f] font-semibold">
          <button className="px-3 pb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
            Home
          </button>
          <button className="border-b-2 border-black dark:border-white px-3 pb-3 text-sm font-medium text-gray-900 dark:text-white">
            Videos
          </button>
          <button className="px-3 pb-3 text-sm font-medium text-gray-900 dark:text-white">
            Shorts
          </button>
          <button className="px-3 pb-3 text-sm font-medium text-gray-900 dark:text-white">
            Playlist
          </button>
        </div>
      </div>

      {/* Description Modal */}
      {showDescModal && (
        <ChannelDescriptionModal
          channel={channel}
          onClose={() => setShowDescModal(false)}
        />
      )}
    </>
  );
};

export default ChannelHeader;