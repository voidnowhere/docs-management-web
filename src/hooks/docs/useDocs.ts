import {useApi} from "@/hooks/api/useApi.ts";
import {useQuery} from "@tanstack/react-query";
import {Doc} from "@/types/docs/doc.ts";

export const docsQueryKey = 'docs'

const useDocs = (keyword: string) => {
    const api = useApi();

    return useQuery({
        queryFn: async () => {
            const response = await api.current.get<Doc[]>(`/api/docs`, {params: {keyword: keyword}});
            return response.data;
        },
        queryKey: [docsQueryKey, keyword],
    });
};

export default useDocs