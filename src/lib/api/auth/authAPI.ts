import client from "../client";
export const login = (loginData: { email: string; password: string }) => {
  return client.post("/auth/login", loginData);
};
export const join = (joinData: {
  email: string;
  password: string;
  name: string;
  rank: number;
}) => {
  return client.post("/auth/join", joinData);
};
export const logout = () => {
  return client.post("/auth/logout");
};
export const check = () => {
  return client.get("/auth/check");
};
