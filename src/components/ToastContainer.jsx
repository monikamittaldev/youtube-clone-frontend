// src/components/ToastContainer.jsx
import { useState, useCallback } from "react";
import Toast from "./Toast";

// We'll export a hook + container together
let addToastExternal = null;

export const useToast = () => {
  const showToast = useCallback((message, duration = 3000) => {
    if (addToastExternal) addToastExternal(message, duration);
  }, []);
  return { showToast };
};

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  // Expose adder to external hook
  addToastExternal = (message, duration) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, duration }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast
            message={toast.message}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;