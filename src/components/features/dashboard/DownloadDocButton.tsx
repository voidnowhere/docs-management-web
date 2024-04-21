import useDownloadDoc from "@/hooks/docs/useDownloadDoc.ts";
import {Download} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

function DownloadDocButton({docId}: { docId: string }) {
    const {mutateAsync: downloadDoc} = useDownloadDoc()

    const handleDownload = () => {
        downloadDoc(docId).then(data => {
            const blob = new Blob([data.fileContent]);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a')
            link.setAttribute('href', url)
            link.setAttribute('download', data.fileName)
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
    }

    return (
        <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4"/>
        </Button>
    )
}

export default DownloadDocButton