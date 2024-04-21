import {useMemo, useState} from "react";
import UploadDocDrawer from "@/components/features/dashboard/UploadDocDrawer";
import {Search} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    formatLocalDateToDateString,
    formatLocalDateToTimeString,
} from "@/utils/dateFormat.ts";
import ShareDocModal from "@/components/features/dashboard/ShareDocModal.tsx";
import {useDebounce} from "ahooks";
import useDocs from "@/hooks/docs/useDocs.ts";
import DownloadDocButton from "@/components/features/dashboard/DownloadDocButton.tsx";
import DeleteDocButton from "@/components/features/dashboard/DeleteDocButton.tsx";
import DocsCounterCard from "@/components/features/dashboard/DocsCounterCard.tsx";
import TableRowSkeletons from "@/components/custom/TableRowSkeleton.tsx";

function DocsPage() {
    const [searchValue, setSearchValue] = useState<string>("");
    const debouncedSearchValue = useDebounce(searchValue, {wait: 500})
    const {data: filterDocs, isPending} = useDocs(debouncedSearchValue);
    const columns = ['Title', 'Content Type', 'Creation date', 'Metadata', ''];
    const filterDocsCount = useMemo<number>(
        () => filterDocs?.length ?? 0,
        [filterDocs]
    )

    const handleSearch = (value: string) => {
        setSearchValue(value);
    }

    const getFilteredDocsRows = () => {
        if (isPending) {
            return (
                <TableRowSkeletons count={2} colSpan={5}/>
            )
        }

        if (filterDocsCount === 0) return (
            <TableRow>
                <TableCell colSpan={5} className={"text-center"}>No documents found</TableCell>
            </TableRow>
        );

        return filterDocs?.map((doc, index) => (
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
                    <div className="flex h-1 items-center text-sm">
                        <DownloadDocButton docId={doc.id}/>
                        <ShareDocModal docId={doc.id}/>
                        <DeleteDocButton docId={doc.id}/>
                    </div>
                </TableCell>
            </TableRow>
        ));
    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-14 sm:py-10 sm:pl-4">
                <main
                    className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                            <DocsCounterCard docsCount={filterDocsCount}/>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="relative flex-grow">
                                <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2">
                                    <Search className="h-4 w-4 text-muted-foreground"/>
                                </div>
                                <Input
                                    type="search"
                                    placeholder="Search..."
                                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                                    onChange={(e) => {
                                        handleSearch(e.target.value)
                                    }}
                                />
                            </div>
                            <UploadDocDrawer/>
                        </div>
                        <div>
                            <Card>
                                <CardHeader className="px-7">
                                    <CardTitle>My Documents</CardTitle>
                                    <CardDescription>
                                        Recent documents from your storage.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableHead key={column}>{column}</TableHead>
                                                ))}
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {getFilteredDocsRows()}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DocsPage;
