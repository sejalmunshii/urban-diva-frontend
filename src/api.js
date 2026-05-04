import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://urban-diva-backend.onrender.com/api",
});


export default API;