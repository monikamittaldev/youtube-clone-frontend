// src/components/Toast.jsx
import { useEffect, useState } from "react";
import { MdCheckCircle, MdClose } from "react-icons/md";

const Toast = ({ message, onClose, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger slide-in
    const showTimer = setTimeout(() => setVisible(true), 10);
    // Trigger slide-out before unmount
    const hideTimer = setTimeout(() => setVisible(false), duration - 400);
    // Unmount
    const closeTimer = setTimeout(onClose, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  return (
    <div
      className={`flex items-center gap-3 min-w-[280px] max-w-sm px-4 py-3 rounded-xl shadow-2xl
        bg-white dark:bg-[#272727] border border-gray-100 dark:border-[#3a3a3a]
        transition-all duration-400 ease-in-out
        ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"}`}
    >
      {/* Icon */}
      <MdCheckCircle className="text-green-500 text-xl flex-shrink-0" />

      {/* Message */}
      <p className="text-sm text-primary flex-1">{message}</p>

      {/* Close button */}
      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 400); }}
        className="text-secondary hover:text-primary transition-colors"
      >
        <MdClose className="text-base" />
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-green-500 rounded-b-xl"
        style={{ animation: `shrink ${duration}ms linear forwards` }}
      />
    </div>
  );
};

export default Toast;