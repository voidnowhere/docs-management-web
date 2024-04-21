import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useApi} from "@/hooks/api/useApi.ts";
import {toast} from "sonner";
import {docsQueryKey} from "@/hooks/docs/useDocs.ts";


export function useDeleteDoc() {
    const api = useApi();
    const queryClient = useQueryClient();

    const deleteDocFn = async (id: string) => {
        return await api.current.delete<void>(`/api/docs/${id}`);
    };

    return useMutation({
        mutationFn: deleteDocFn,
        onMutate: async () => {
            await queryClient.cancelQueries({queryKey: [docsQueryKey]});
        },
        onSuccess: () => {
            toast.success('Document deleted', {
                description: new Date().toLocaleString(
                    'fr-FR',
                    {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    }
                ),
            });
            queryClient.invalidateQueries({queryKey: [docsQueryKey]});
        }
    });
}