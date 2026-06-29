import { useState } from "react";
import axios from "axios";

const usePost = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postData = async (body, token = null) => {
    setLoading(true);
    setError(null);
    try {
      // Check if any value in body is a File → use FormData
      const hasFile = Object.values(body).some((v) => v instanceof File);
      let payload = body;
      let headers = token ? { Authorization: `Bearer ${token}` } : {};

      if (hasFile) {
        payload = new FormData();
        Object.entries(body).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            payload.append(key, value);
          }
        });
        // Don't set Content-Type — axios sets it automatically with boundary
      }

      const res = await axios.post(url, payload, { headers });
      setData(res.data);
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error, data };
};

export default usePost;
