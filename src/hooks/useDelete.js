import { useState } from "react";
import toast from "react-hot-toast";

const useDelete = (token) => {
  const [loading, setLoading] = useState(false);

  const deleteVideo = async (url) => {
    setLoading(true);

    try {
      const res = await fetch(
        url,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to delete");
      }

      toast.success("Video deleted!");

      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteVideo,
    loading,
  };
};

export default useDelete;