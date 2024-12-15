import { useMutation } from "@tanstack/react-query";
import { POST } from "../utils/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const userMutationHook = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data) => {
      const result = await POST("/user", data);
      return result.data;
    },
    onSuccess: () => {
      toast.success("user created successfully");
      navigate("/login");
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err.message);
      }
    },
  });
};

export default userMutationHook;
