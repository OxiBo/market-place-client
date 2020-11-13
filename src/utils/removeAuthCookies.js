const removeAuthCookies = (cookies) => {
  cookies.remove("token", { path: "/" });
  cookies.remove("name", { path: "/" });
  cookies.remove("id", { path: "/" });
  cookies.remove("type", { path: "/" });
};

export default removeAuthCookies;
