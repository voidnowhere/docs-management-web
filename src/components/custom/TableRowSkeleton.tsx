import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";

function TableRowSkeletons({count, colSpan}: { count: number; colSpan: number }) {
    return Array(count).fill(0).map((_, index) => (
        <TableRow key={index}>
            <TableCell colSpan={colSpan}>
                <Skeleton className="h-4 w-full"/>
            </TableCell>
        </TableRow>
    ));
}

export default TableRowSkeletons