import { axiosPublic, axiosPrivate } from "@/shared/util/axios";
import { Credentials, User } from "@/feature/auth/model";

export const fetchTokens = async ({
  username,
  password,
}: Credentials): Promise<string> => {
  const response = await axiosPublic
    .post("/auth/token", {
      username,
      password,
    })
    .catch((error) => {
      throw new Error(error?.response?.data?.error || "An error occurred");
    });

  return response.data.accessToken;
};

export const refreshAccessToken = async (): Promise<string> => {
  const response = await axiosPublic
    .post("/auth/refresh", {
      withCredentials: true,
    })
    .catch((error) => {
      throw new Error(error?.response?.data?.error || "An error occurred");
    });

  return response.data.accessToken;
};

export const deleteRefreshToken = async () => {
  await axiosPublic.delete("/auth/token").catch((error) => {
    throw new Error(error?.response?.data?.error || "An error occurred");
  });
};

export const fetchUserInfo = async (): Promise<User> => {
  const response = await axiosPrivate.get("/users/me").catch((error) => {
    throw new Error(error?.response?.data?.error || "An error occurred");
  });

  return response.data;
};
