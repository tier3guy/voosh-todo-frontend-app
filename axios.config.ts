import _axios from "axios";
import { BACKEND_BASE_URL } from "./constants";

const axios = _axios.create({
    withCredentials: true,
    baseURL: BACKEND_BASE_URL,
});

export default axios;
