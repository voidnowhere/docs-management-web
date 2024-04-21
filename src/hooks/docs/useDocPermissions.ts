import {useQuery} from "@tanstack/react-query";
import {useApi} from "@/hooks/api/useApi.ts";
import DocPermission from "@/types/docs/docPermission.ts";

export const docPermissionsQueryKey = 'docPermissions'

const useDocPermissions = (docId: string) => {
    const api = useApi()

    return useQuery({
        queryFn: async () => {
            if (docId.length > 0) {
                const response = await api.current.get<DocPermission[]>(`/api/docs/${docId}/permissions`)
                return response.data
            }
            return []
        },
        queryKey: [docPermissionsQueryKey, docId],
        enabled: docId.length > 0,
    })
}

export default useDocPermissions;