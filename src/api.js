import axios from "axios";

const API = axios.create({
  baseURL: "https://urban-diva-backend.onrender.com/api",
});

export default API;