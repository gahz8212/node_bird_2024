import client from "../client";
export const addImage = (formData: FormData) => {
  return client.post("/home/room/1/images", formData);
};
export const getChats = () => {
  return client.get("/home/all");
};
