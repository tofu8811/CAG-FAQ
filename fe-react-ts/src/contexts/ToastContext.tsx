import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { Toast } from "../components/common/Toast";

interface ToastContextType {
  triggerToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = (): ToastContextType => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }
  return ctx;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerToast = useCallback((msg: string) => {
    // Clear any existing timer so rapid calls reset the countdown
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setMessage(msg);
    timerRef.current = setTimeout(() => {
      setMessage(null);
      timerRef.current = null;
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ triggerToast }}>
      {children}
      <Toast message={message} />
    </ToastContext.Provider>
  );
};
