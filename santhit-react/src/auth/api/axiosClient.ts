import axios from "axios";
import {useAuthStore} from "../store/useAuthStore.tsx";

const axiosClient = axios.create({
    baseURL:"http://localhost:8080",
    headers:{
        "Content-Type":"application/json"
    }
});
// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config) {
        const token = useAuthStore.getState().accessToken;
        if(token && config.headers){
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if(error.response?.status == 401 && !originalRequest._retry){
            originalRequest._retry = true;
            const refreshToken = useAuthStore.getState().refreshToken;
            if(refreshToken){
                try {
                    const response =
                        await axios.post('http://localhost:8080/api/auth/refresh', {
                            refreshToken
                        });
                    const {accessToken: newAccessToken, refreshToken: newRefreshToken} =
                        response.data;
                    useAuthStore.getState().setAuth(newAccessToken, newRefreshToken);
                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return axiosClient(originalRequest);
                }catch (refreshError){
                    useAuthStore.getState().clearAuth();
                    window.location.href = "/login";
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);
export default axiosClient;
