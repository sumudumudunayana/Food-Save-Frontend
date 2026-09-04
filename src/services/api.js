import axios from "axios";

const API = axios.create({
  baseURL: "https://food-save-backend.onrender.com/api",
});

export default API;