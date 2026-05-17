
import axios from "axios";
let axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }
};
const api = axios.create({
  baseURL: "https://localhost:7110/api", axiosConfig
});

export default api;

