import { useQuery } from "@tanstack/react-query";
import { GET } from "../utils/axios";

const useInventory = () => {
  return useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      const result = await GET("/pharmacy/inventory");
      return result.data;
    },
  });
};

export default useInventory;
