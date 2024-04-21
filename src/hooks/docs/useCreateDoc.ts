import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useApi} from "@/hooks/api/useApi.ts";
import DocPostRequest from "@/types/docs/docPostRequest.ts";
import {toast} from "sonner";
import {AxiosError} from "axios";
import {ApiError} from "@/types/api/apiError.ts";
import {docsQueryKey} from "@/hooks/docs/useDocs.ts";

const useCreateDoc = () => {
    const api = useApi()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (doc: DocPostRequest) => {
            const formData = new FormData();
            formData.append('file', doc.file)
            formData.append('metadata', new Blob(
                [JSON.stringify(doc.metadata)],
                {type: 'application/json'})
            )
            await api.current.post<void>('api/docs', formData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [docsQueryKey]})
            toast.success('Success', {
                description: 'Doc uploaded successfully.',
            })
        },
        onError: (error: AxiosError<ApiError>) => {
            toast.error('Error', {
                description: error.response?.data.error,
            })
        }
    })
}

export default useCreateDoc