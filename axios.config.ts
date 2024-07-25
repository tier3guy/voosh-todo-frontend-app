import _axios from "axios";
import { AUTH_TOKEN, BACKEND_BASE_URL } from "./constants";
import { getCookie } from "./lib/utils";

const axios = _axios.create({
    withCredentials: true,
    baseURL: BACKEND_BASE_URL,
});

axios.interceptors.request.use((conf) => {
    const token = getCookie(AUTH_TOKEN);
    if (token) {
        conf.headers["Authorization"] = `Bearer ${token}`;
    }

    return conf;
});

export default axios;
