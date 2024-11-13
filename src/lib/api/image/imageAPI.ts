import client from "../client";
export const addImage = (image: FormData) => {
  return client.post("/item/images", image);
};
