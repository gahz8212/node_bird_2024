import client from "../client";
export const login = (loginData: { email: string; password: string }) => {
  console.log(loginData);
  return client.post("/login", loginData);
};
export const join = (joinData: {
  email: string;
  password: string;
  name?: string;
  rank?: number;
}) => {
  console.log(joinData);
  return client.post("/join", joinData);
};
export const logout = () => {
  return client.post("/logout");
};
export const check = () => {
  return client.get("/check");
};
export const extends_auth=()=>{
  return client.post('/extends')
}