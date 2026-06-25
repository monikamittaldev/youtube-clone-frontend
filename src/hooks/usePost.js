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
      const headers = token
        ? { Authorization: `Bearer ${token}` }
        : {};

      const res = await axios.post(url, body, { headers });
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