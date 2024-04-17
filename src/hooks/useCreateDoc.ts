import {useMutation} from "@tanstack/react-query";
import {useApi} from "@/libs/useApi.ts";
import DocPostRequest from "@/types/docPostRequest.ts";

const useCreateDoc = () => {
    const api = useApi()

    return useMutation({
        mutationFn: async (doc: DocPostRequest) => {
            const formData = new FormData();
            formData.append('file', doc.file)
            formData.append('metadata', JSON.stringify(doc.metadata))
            await api.current.post<void>('api/docs', formData)
        },
    })
}

export default useCreateDoc