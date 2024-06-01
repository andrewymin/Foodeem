import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useToast = () => {
  return {
    showSuccess: (message: String) => {
      toast.success(message);
    },
    showError: (message: String) => {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    },
    showInfo: (message: String) => {
      toast.info(message);
    },
    showWarning: (message: String) => {
      toast.warning(message);
    },
  };
};

// add success notifySuccess

export default useToast;
