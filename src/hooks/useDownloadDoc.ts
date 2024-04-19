import {useMutation} from "@tanstack/react-query";
import {useApi} from "@/libs/useApi.ts";
import DocDownloadRequest from "@/types/docDownloadRequest.ts";

const useDownloadDoc = () => {
    const api = useApi()

    return useMutation({
        mutationFn: async (docId: string): Promise<DocDownloadRequest> => {
            const response = await api.current.get(`/api/docs/${docId}/download`, {
                responseType: 'blob'
            })
            const contentDispositionHeader = response.headers['content-disposition']
            const fileName = contentDispositionHeader.split('filename=')[1].replaceAll('"', '')

            return {
                fileName: fileName,
                fileContent: response.data,
            }
        }
    })
}

export default useDownloadDoc