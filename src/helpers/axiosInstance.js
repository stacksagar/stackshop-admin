import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    "Context-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
  baseURL: "https://stackshop-server.herokuapp.com",
});

export default axiosInstance;
