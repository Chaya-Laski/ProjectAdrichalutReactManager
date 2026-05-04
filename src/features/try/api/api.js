import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7110/api",
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
});

export default api;