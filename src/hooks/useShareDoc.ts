import {useMutation} from "@tanstack/react-query";
import {useApi} from "@/libs/useApi.ts";
import DocShareRequest from "@/types/docShareRequest.ts";

const useShareDoc = () => {
    const api = useApi()

    return useMutation({
        mutationFn: async (docShareRequest: DocShareRequest) => {
            await api.current.post(`/api/docs/${docShareRequest.docId}/share`, {
                permissionType: docShareRequest.permissionType,
                emails: docShareRequest.emails,
            })
        }
    })
}

export default useShareDoc