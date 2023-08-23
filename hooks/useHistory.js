import axios from "axios";
import { getCookie } from "cookies-next";
import useSWR from "swr";

async function fetcher(url, latitude, longitude) {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${getCookie("access_token")}`,
    },
    params: {
      latitude,
      longitude,
    },
  });
  return response.data;
}

export default function useHistory(userId, latitude, longitude) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const url = userId ? `${apiDomain}/users/${userId}/events` : null;
  const { data, error, isLoading } = useSWR(url, () =>
    fetcher(url, latitude, longitude),
  );

  if (isLoading || error) {
    return null;
  }

  return data?.data;
}
