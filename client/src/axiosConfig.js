import { default as ax } from "axios";

const axios = ax.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export default axios;
