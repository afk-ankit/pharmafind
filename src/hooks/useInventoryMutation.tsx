import { useMutation, useQueryClient } from "@tanstack/react-query";
import { POST } from "../utils/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useInventoryMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data) => {
      const result = await POST("/pharmacy/inventory", data);
      return result.data;
    },
    onSuccess: () => {
      toast.success("medicine Added successfully");
      navigate("/inventory");
      queryClient.invalidateQueries({
        queryKey: ["inventory"],
      });
    },
  });
};

export default useInventoryMutation;
