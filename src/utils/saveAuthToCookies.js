export default (cookies, token, id, name, type) => {
  cookies.set("token", token, { path: "/" });
  cookies.set("id", id, { path: "/" });
  cookies.set("name", name, { path: "/" });
  cookies.set("type", type, { path: "/" });
};
