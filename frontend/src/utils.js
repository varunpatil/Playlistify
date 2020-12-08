export const isLoggedIn = () => {
  let flag = JSON.parse(localStorage.getItem("isLoggedIn"));
  return flag;
};
