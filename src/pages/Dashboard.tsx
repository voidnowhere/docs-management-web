import {
    File, Search,
} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {Input} from "@/components/ui/input"

import {useSearchDocs} from "@/hooks/useSearchDocs.ts";
import React, {useState} from "react";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {formatLocalDateToDateString, formatLocalDateToTimeString} from "@/libs/utils.ts";


function Dashboard() {
    const [searchValue, setSearchValue] = useState<string>("" as string);
    const {data: filterDocs, isPending} = useSearchDocs(searchValue);
    const columns = ['Titre', 'Date de création', 'Metadata'];


    function handleSearch(value: string) {
        setSearchValue(value);
    }


    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-14 sm:py-20 sm:pl-4">
                <main
                    className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3">
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                            <Card x-chunk="dashboard-05-chunk-1">
                                <CardHeader className="pb-2">
                                    <CardDescription>Number of Documents</CardDescription>
                                    <CardTitle className="text-4xl">86</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-muted-foreground">
                                        +2 from last week
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
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-7 gap-1 text-sm"
                            >
                                <File className="h-3.5 w-3.5"/>
                                <span className="sr-only sm:not-sr-only">Upload new file</span>
                            </Button>
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
                                    <TableCaption>A list of documents.</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableHead key={column}>{column}</TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {isPending ? (
                                            <>
                                                <TableRow>
                                                    <TableCell colSpan={3}><Skeleton
                                                        className="h-4 w-full"/></TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell colSpan={3}><Skeleton
                                                        className="h-4 w-full"/></TableCell>
                                                </TableRow>
                                            </>

                                        ) : (
                                            filterDocs && filterDocs.length > 0 &&
                                            filterDocs?.map((doc, index) => (
                                                <React.Fragment key={index}>
                                                    <TableRow>
                                                        <TableCell>{doc.title}</TableCell>
                                                        <TableCell>
                                                            {formatLocalDateToDateString(doc.creationDate)} - {formatLocalDateToTimeString(doc.creationDate)}
                                                        </TableCell>
                                                        <TableCell>
                                                            {Object.entries(doc.metadata).map(([key, value]) => (
                                                                <li key={key}>
                                                                    <strong>{key}:</strong> {value}
                                                                </li>
                                                            ))}
                                                        </TableCell>
                                                    </TableRow>
                                                </React.Fragment>
                                            ))
                                        )}
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
