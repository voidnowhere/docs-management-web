import {BadgeMinus} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useDeleteDoc} from "@/hooks/docs/useDeleteDoc.ts";

function DeleteDocButton({docId}: { docId: string }) {
    const {mutate: deleteDoc} = useDeleteDoc();

    const handleDelete = () => {
        deleteDoc(docId);
    };

    return (
        <Button variant="outline" size="sm" onClick={handleDelete}>
            <BadgeMinus className="h-4 w-4" color="red"/>
        </Button>
    )
}

export default DeleteDocButton