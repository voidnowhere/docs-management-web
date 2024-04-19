import {useState} from "react";
import {useDeleteDoc, useDocs} from "@/hooks";
import UploadDocDrawer from "@/components/dashboard/UploadDocDrawer";
import {
    BadgeMinus,
    Download,
    Search,
} from "lucide-react";
import {Button} from "@/components/ui/button";
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
import {Skeleton} from "@/components/ui/skeleton";
import {
    formatLocalDateToDateString,
    formatLocalDateToTimeString,
} from "@/libs/utils";
import {Doc} from "@/types/doc.ts";


function RenderSkeleton() {
    return <>
        <TableRow>
            <TableCell colSpan={3}><Skeleton
                className="h-4 w-full"/></TableCell>
        </TableRow>
        <TableRow>
            <TableCell colSpan={3}><Skeleton
                className="h-4 w-full"/></TableCell>
        </TableRow>
    </>;
}

interface Props {
    doc: Doc,
    handleDelete: (id: string) => void;
    handleDownload: (id: string) => void;

}

function DocumentRow(props: Props) {
    return (
        <TableRow>
            <TableCell>{props.doc.title}</TableCell>
            <TableCell>
                {formatLocalDateToDateString(props.doc.creationDate)} -{" "}
                {formatLocalDateToTimeString(props.doc.creationDate)}
            </TableCell>
            <TableCell>
                {Object.entries(props.doc.metadata).map(([key, value]) => (
                    <li key={key}>
                        <strong>{key}:</strong> {value}
                    </li>
                ))}
            </TableCell>
            <TableCell>
                <div className="flex h-1 items-center text-sm">
                    <Button variant="outline" size="sm" onClick={() => props.handleDownload(props.doc.id)}>
                        <Download className="h-4 w-4"/>
                    </Button>
                    <Button variant="outline" size="sm" name="deleteDoc"
                            onClick={() => props.handleDelete(props.doc.id)}>
                        <BadgeMinus className="h-4 w-4" color="red"/>
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    );
}

function Dashboard() {
    const [searchValue, setSearchValue] = useState<string>("" as string);
    const {data: filterDocs, isPending} = useDocs(searchValue);
    const deleteMutation = useDeleteDoc();
    const columns = ['Title', 'Creation date', 'Metadata', ''];
    const [count, setCount] = useState(filterDocs?.length || 0);


    function handleSearch(value: string) {
        setSearchValue(value);
    }

    const handleDelete = async (id: string) => {
        await deleteMutation.mutateAsync(id);
        if (count > 0) setCount(count - 1);
    };

    const incrementCount = () => {
        setCount(count + 1);
    }
    const handleDownload = async (id: string) => {
        console.log('Download', id);
        window.open(`api/docs/${id}/download`, '_blank')

    }


    function getFilterDocs() {
        if (!filterDocs || filterDocs?.length === 0) return (
            <TableRow>
                <TableCell colSpan={3} className={"text-center"}>No documents found</TableCell>
            </TableRow>
        );

        return filterDocs.map((doc, index) => (
            <DocumentRow
                key={index}
                doc={doc}
                handleDownload={handleDownload}
                handleDelete={handleDelete}
            />
        ));

    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-14 sm:py-10 sm:pl-4">
                <main
                    className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                            <Card x-chunk="dashboard-05-chunk-1">
                                <CardHeader className="pb-2">
                                    <CardDescription>Number of Documents</CardDescription>
                                    <CardTitle className="text-4xl">{filterDocs?.length}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center">
                                        <span className="text-muted-foreground">Total</span>
                                    </div>
                                </CardContent>
                            </Card>
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
                            <UploadDocDrawer incrementCount={incrementCount}/>
                        </div>

                        <Card x-chunk="dashboard-05-chunk-3">
                            <CardHeader className="px-7">
                                <CardTitle>Documents</CardTitle>
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
                                        {isPending ? <RenderSkeleton/> : getFilterDocs()}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard;
