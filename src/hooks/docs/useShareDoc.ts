import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useApi} from "@/hooks/api/useApi.ts";
import DocShareRequest from "@/types/docs/docShareRequest.ts";
import {toast} from "sonner";
import {docPermissionsQueryKey} from "@/hooks/docs/useDocPermissions.ts";

const useShareDoc = () => {
    const api = useApi()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (docShareRequest: DocShareRequest) => {
            await api.current.post(`/api/docs/${docShareRequest.docId}/share`, {
                users: docShareRequest.users,
            })
        },
        onSuccess: () => {
            toast.success('Success', {
                description: 'Doc shared successfully.',
            })
            queryClient.removeQueries({queryKey: [docPermissionsQueryKey]})
        }
    })
}

export default useShareDoc