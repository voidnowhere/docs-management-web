import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import useSharedDocs from "@/hooks/docs/useSharedDocs.ts";
import DocsCounterCard from "@/components/features/dashboard/DocsCounterCard.tsx";
import {useMemo} from "react";
import TableRowSkeletons from "@/components/custom/TableRowSkeleton.tsx";
import {formatLocalDateToDateString, formatLocalDateToTimeString} from "@/utils/dateFormat.ts";
import DownloadDocButton from "@/components/features/dashboard/DownloadDocButton.tsx";

const columns = ['Title', 'Content Type', 'Creation date', 'Metadata', ''];

function SharedDocsPage() {
    const {data: sharedDocs, isPending: isSharedDocsPending} = useSharedDocs();
    const sharedDocsCount = useMemo<number>(
        () => sharedDocs?.length ?? 0,
        [sharedDocs]
    );

    const getSharedDocsColumns = () => columns.map((column) => (
        <TableHead key={column}>{column}</TableHead>
    ))

    const getSharedDocsRows = () => {
        if (isSharedDocsPending) {
            return (
                <TableRowSkeletons count={2} colSpan={5}/>
            )
        }

        if (sharedDocsCount === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={5} className={"text-center"}>No documents found</TableCell>
                </TableRow>
            )
        }

        return sharedDocs?.map((doc, index) => (
            <TableRow key={index}>
                <TableCell>{doc.title}</TableCell>
                <TableCell>{doc.type}</TableCell>
                <TableCell>
                    {formatLocalDateToDateString(doc.creationDate)} -{" "}
                    {formatLocalDateToTimeString(doc.creationDate)}
                </TableCell>
                <TableCell>
                    {Object.entries(doc.metadata).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {value}
                        </li>
                    ))}
                </TableCell>
                <TableCell>
                    <DownloadDocButton docId={doc.id}/>
                </TableCell>
            </TableRow>
        ))
    }

    return (<>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-14 sm:py-10 sm:pl-4">
                <main
                    className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                            <DocsCounterCard docsCount={sharedDocsCount}/>
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Shared with me</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            {getSharedDocsColumns()}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {getSharedDocsRows()}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    </>)
}

export default SharedDocsPage;