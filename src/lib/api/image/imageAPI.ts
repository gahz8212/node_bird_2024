import client from "../client";
export const addImage = (formData: FormData) => {
  console.log("ok");
  return client.post("/item/images", formData);
};
