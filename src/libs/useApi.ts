import {useEffect, useRef} from "react";
import axios, {AxiosInstance} from "axios";
import {useAuth} from "react-oidc-context";

export const useApi = () => {
    const auth = useAuth();
    const axiosInstance = useRef<AxiosInstance>(axios.create());

    useEffect(() => {
        if (auth.isAuthenticated) {
            axiosInstance.current.interceptors.request.use((config) => {
                config.headers.Authorization = `Bearer ${auth.user?.access_token}`

                return config;
            });
        }
    }, [auth]);

    return axiosInstance
}