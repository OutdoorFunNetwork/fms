import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import Toastr from "~/components/Toastr/Toastr";

const ToastContext = createContext({});

type Toast = {
  title: string;
  message: string;
  type: 'Error'|'Success'|'Warning';
}

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => setToasts(t => t.slice(1)), 3000);

      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const addToast = useCallback((toast: Toast) => {
    setToasts((toasts: Toast[]) => [...toasts, toast]);
  }, [setToasts]);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <Toastr toasts={toasts} />
    </ToastContext.Provider>
  )
}

export default ToastContext;
