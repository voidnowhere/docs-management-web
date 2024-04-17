import {useRef} from "react";
import axios, {AxiosInstance} from "axios";

export const useApi = () => {
    return useRef<AxiosInstance>(axios.create());

}