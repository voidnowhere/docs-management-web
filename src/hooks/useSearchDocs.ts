import {useApi} from "../libs/useApi";
import {useQuery} from "@tanstack/react-query";
import {Doc} from "@/types/doc.ts";


export const useSearchDocs = (keyword: string) => {
    const api = useApi();

    return useQuery({
        queryFn: async () => {
            const response = await api.current.get<Doc[]>(`/api/docs`, {params: {keyword: keyword}});
            return response.data;
        },
        queryKey: ['docs', keyword],
    });
};
