import { useMutation } from "@tanstack/react-query";
import { POST } from "../utils/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { usePharmacyStore } from "../store/pharmacyStore";

const usePharmacyLogin = () => {
  const { setPharmacy } = usePharmacyStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data) => {
      const result = await POST("/pharmacy/login", data);
      return result.data;
    },
    onSuccess: (res) => {
      toast.success("User logged in successfully");
      setPharmacy(res.pharmacy);
      navigate("/");
    },
    onError: (error) => {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.error || error.message);
    },
  });
};

export default usePharmacyLogin;
