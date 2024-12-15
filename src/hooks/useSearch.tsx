import { useQuery } from "@tanstack/react-query";
import { GET } from "../utils/axios";

const useSearch = ({
  medicine,
  pinCode,
}: {
  medicine: string;
  pinCode: string;
}) => {
  const query = useQuery({
    queryKey: ["search", medicine, pinCode],
    queryFn: async () => {
      const result = await GET(
        `/pharmacy/all?medicine=${medicine}&location=${pinCode}`,
      );
      console.log(result.data);
      return result.data;
    },
    enabled: !!medicine && !!pinCode,
  });
  return query;
};

export default useSearch;
