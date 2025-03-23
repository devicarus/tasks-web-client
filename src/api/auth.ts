import { axiosPublic } from "@/util/axios";
import { Credentials } from "@/types";

export const fetchAccessToken = async ({
  username,
  password,
}: Credentials): Promise<string> => {
  const response = await axiosPublic
    .post("/auth/access-token", {
      username,
      password,
    })
    .catch((error) => {
      throw new Error(error?.response?.data?.error || "An error occurred");
    });

  return response.data.token;
};
