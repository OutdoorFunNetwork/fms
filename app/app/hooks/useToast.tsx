import { useContext } from "react";
import ToastContext from "~/context/Toast";

const useToastContext = () => {
  return useContext(ToastContext)
};

export default useToastContext;