import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CircleMinus, CirclePlus, File} from "lucide-react";
import {useFieldArray, useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import useCreateDoc from "@/hooks/useCreateDoc.ts";
import {useRef, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {useToast} from "@/components/ui/use-toast.ts";
import {docsQueryKeys} from "@/hooks/doc-query-keys.ts";


const formSchema = z.object({
    file: z.any(),
    metadata: z.array(
        z.object({
            key: z.string().min(1).max(50),
            value: z.string().min(1).max(50),
        })
    )
})

function UploadDocDrawer() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            file: ''
        }
    })
    const {
        fields: metadataFields,
        append: appendNewMetadata,
        remove: removeMetadata,
    } = useFieldArray({
        name: 'metadata',
        control: form.control
    })
    const {mutateAsync: createDoc} = useCreateDoc()
    const inputFile = useRef<HTMLInputElement | null>(null)
    const queryClient = useQueryClient()
    const {toast} = useToast()

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const file = inputFile.current?.files?.[0]

        if (file === undefined) {
            throw new Error('File is required')
        }

        createDoc({
            file: file,
            metadata: values.metadata,
        }).then(() => {
            closeDrawer()
            queryClient.invalidateQueries({queryKey: docsQueryKeys.all})
        }).catch(reason => {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: reason.response?.data?.error,
            })
        })
    }

    const addBlankMetadata = () => {
        appendNewMetadata({
            key: '',
            value: '',
        })
    }

    const closeDrawer = () => {
        setIsOpen(false)
        removeMetadata()
        form.reset()
    }

    return (
        <Drawer open={isOpen} dismissible={false}>
            <DrawerTrigger asChild>
                <Button variant="outline" onClick={() => setIsOpen(true)}>
                    <File className="h-3.5 w-3.5 mr-2"/>
                    Upload new doc
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Upload new doc</DrawerTitle>
                    </DrawerHeader>
                    <ScrollArea className="h-96">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="file"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type='file' required {...field} ref={inputFile}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                {metadataFields.map((_, index) => {
                                    return (
                                        <div key={index} className='flex gap-2 px-3'>
                                            <FormField
                                                control={form.control}
                                                name={`metadata.${index}.key`}
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-red-500 capitalize"/>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`metadata.${index}.value`}
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormMessage className="text-red-500 capitalize"/>
                                                    </FormItem>
                                                )}
                                            />
                                            <Button variant="destructive" onClick={() => removeMetadata(index)}>
                                                <CircleMinus/>
                                            </Button>
                                        </div>
                                    )
                                })}
                                <div className="flex justify-center">
                                    <Button onClick={addBlankMetadata} variant="secondary" type='button'>
                                        <CirclePlus className='mr-2'/>
                                        Add metadata
                                    </Button>
                                </div>
                                <DrawerFooter>
                                    <Button type="submit">Submit</Button>
                                    <Button variant="outline" type='button' onClick={closeDrawer}>
                                        Cancel
                                    </Button>
                                </DrawerFooter>
                            </form>
                        </Form>
                    </ScrollArea>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default UploadDocDrawer