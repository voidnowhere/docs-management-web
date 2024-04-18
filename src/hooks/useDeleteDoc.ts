import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useApi} from "@/libs/useApi.ts";
import {docsQueryKeys} from "@/hooks/user-query-keys.ts";
import {useToast} from "@/components/ui/use-toast.ts";


export function useDeleteDoc() {
    const api = useApi();
    const queryClient = useQueryClient();
    const {toast} = useToast()

    const deleteDocFn = async (id: string) => {
        return await api.current.delete<void>(`/api/docs/${id}`);
    };

    return useMutation({
        mutationFn: deleteDocFn,
        onMutate: async () => {
            await queryClient.cancelQueries({queryKey: docsQueryKeys.all});
        },
        onSuccess: () => {
            toast({
                title: "Document deleted",
                description: new Date().toLocaleString(
                    'fr-FR',
                    {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    }
                ),
            });
            queryClient.invalidateQueries({queryKey: docsQueryKeys.all});
        }
    });
}