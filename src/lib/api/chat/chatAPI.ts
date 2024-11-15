import client from "../client";
export const addImage = (formData: FormData) => {
  return client.post("/home/images", formData);
};
