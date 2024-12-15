import { useMutation } from "@tanstack/react-query";
import { POST } from "../utils/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const usePharmacyMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data) => {
      const result = await POST("/pharmacy/registerPharma", data);
      return result.data;
    },
    onSuccess: () => {
      toast.success("Pharmacy registration applied Successfully");
      navigate("/");
    },
  });
};

export default usePharmacyMutation;
