export const isLoggedIn = () => {
  var flag = window.localStorage.getItem("isLoggedIn");

  if (flag) {
    return true;
  }

  return false;
};

export const setLoggedInFlag = () => {
  window.localStorage.setItem("isLoggedIn", true);
};
