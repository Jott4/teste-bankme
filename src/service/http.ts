import axios from "axios";

const api = axios.create({ baseURL: "https://teste-bankme.vercel.app/api" });

export default api;
