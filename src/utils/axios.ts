import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});

export const GET = async (url: string): Promise<AxiosResponse> => {
  return axiosInstance.get(url);
};

export const POST = async (
  url: string,
  data: any,
  option: any = {},
): Promise<AxiosResponse> => {
  return axiosInstance.post(url, data, option);
};
