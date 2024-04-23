import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";

function DocsCounterCard({docsCount}: { docsCount: number }) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardDescription>Number of Documents</CardDescription>
                <CardTitle className="text-4xl">{docsCount}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center">
                    <span className="text-muted-foreground">Total</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default DocsCounterCard