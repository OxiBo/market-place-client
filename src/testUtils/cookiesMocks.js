import { Cookies } from "react-cookie";
export const setMyCookies = (token, type, name, id) => {
  const cookiesMocks = new Cookies();
  cookiesMocks.set("token", token);
  cookiesMocks.set("type", type);
  cookiesMocks.set("name", name);
  cookiesMocks.set("id", id);
  return cookiesMocks;
};
