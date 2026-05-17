
import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7110/api",
});

export default api;

