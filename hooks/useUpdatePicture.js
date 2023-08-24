import { getCookie } from "cookies-next";

async function updatePicture(blob) {
  const formData = new FormData();
  formData.append("picture", blob);

  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const res = await fetch(`${apiDomain}/users/picture`, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getCookie("access_token")}`,
    },
    body: formData,
  });
  return res;
}

export default function useUpdatePicture() {
  return updatePicture;
}
