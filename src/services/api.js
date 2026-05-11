
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default api;


// axios.post('http://<host>:<port>/<path>', postData, axiosConfig)
// .then((res) => {
//   console.log("RESPONSE RECEIVED: ", res);
// })
// .catch((err) => {
//   console.log("AXIOS ERROR: ", err);
// })npm uninstall cors