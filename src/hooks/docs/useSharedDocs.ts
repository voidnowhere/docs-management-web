import {useApi} from "@/hooks/api/useApi.ts";
import {useQuery} from "@tanstack/react-query";
import {Doc} from "@/types/docs/doc.ts";

export const sharedDocsQueryKey = 'sharedDocs'

export const useGetSharedDocs = () => {
    const api = useApi();

    return useQuery({
        queryFn: async () => {
            const response = await api.current.get<Doc[]>(`/api/docs/shared`);
            return response.data;
        },
        queryKey: [sharedDocsQueryKey],
    });
};

export default useGetSharedDocs
