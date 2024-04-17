import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useApi} from "@/libs/useApi.ts";
import {submissionQueryKeys} from "@/hooks/submission-query-keys.ts";


export function useDeleteDoc() {
    const api = useApi();
    const queryClient = useQueryClient();

    const deleteDocFn = async (id: string) => {
        return await api.current.delete<void>(`/api/docs/${id}`);
    };

    return useMutation({
        mutationFn: deleteDocFn,
        onMutate: async () => {
            await queryClient.cancelQueries({queryKey: submissionQueryKeys.all});
        },
        onSuccess: () => {
             queryClient.invalidateQueries({queryKey: submissionQueryKeys.all});
        }
    });
}