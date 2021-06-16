import axios from "./axiosConfig";

export const logout = async () => {
  localStorage.clear();
  await axios.post("/logout", {});
  window.location.replace("/");
};
