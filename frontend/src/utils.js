export const isLoggedIn = () => {
  var flag = localStorage.getItem("isLoggedIn");

  return Boolean(flag);
};

export const setLoggedInFlag = () => {
  localStorage.setItem("isLoggedIn", true);
};
