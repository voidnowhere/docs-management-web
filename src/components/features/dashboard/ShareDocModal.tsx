import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx"
import {Button} from "@/components/ui/button.tsx";
import {CircleMinus, CirclePlus} from "lucide-react";
import {z} from "zod";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {DrawerFooter} from "@/components/ui/drawer.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import useShareDoc from "@/hooks/docs/useShareDoc.ts";
import {PermissionType} from "@/types/docs/permissionType.ts";
import DocShareRequest from "@/types/docs/docShareRequest.ts";
import {useBoolean} from "ahooks";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import useDocPermissions from "@/hooks/docs/useDocPermissions.ts";
import {useEffect} from "react";

const formSchema = z.object({
    users: z.array(z.object({
        email: z.string().email(),
        permission: z.enum([PermissionType.READ, PermissionType.WRITE]),
    })),
})

function ShareDocModal({docId, unselectDocId}: { docId: string, unselectDocId: () => void }) {
    const [isOpen, {setTrue: setIsOpenTrue, setFalse: setIsOpenFalse}] = useBoolean(false);
    const {data: docPermissions} = useDocPermissions(docId)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            users: [],
        }
    })
    const {
        fields: permissionFields,
        append: appendPermission,
        remove: removeUser,
    } = useFieldArray({
        name: 'users',
        control: form.control
    })
    const {mutateAsync: shareDoc} = useShareDoc()
    useEffect(() => {
        if (docId.length > 0) {
            setIsOpenTrue()
        }
    }, [docId]);
    useEffect(() => {
        if (docPermissions) {
            removeUser()
            docPermissions.forEach(p => {
                appendPermission(p)
            })
        }
    }, [docPermissions]);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const request: DocShareRequest = {
            docId: docId,
            users: values.users,
        }

        shareDoc(request).then(closeModal)
    }

    const addBlankEmail = () => {
        appendPermission({
            email: '',
            permission: PermissionType.READ,
        })
    }

    const closeModal = () => {
        removeUser()
        form.reset()
        setIsOpenFalse()
        unselectDocId()
    }

    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Share doc</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-96">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-2">
                            {permissionFields.map((_, index) => {
                                return (
                                    <div key={index} className='flex gap-2 px-3'>
                                        <FormField
                                            control={form.control}
                                            name={`users.${index}.email`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input {...field} className='w-72' type='email'/>
                                                    </FormControl>
                                                    <FormMessage className="text-red-500 capitalize"/>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`users.${index}.permission`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <Select onValueChange={field.onChange}
                                                            defaultValue={PermissionType.READ}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue
                                                                    placeholder="Select a verified email to display"/>
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value={PermissionType.READ}>
                                                                {PermissionType.READ.toLowerCase()}
                                                            </SelectItem>
                                                            <SelectItem value={PermissionType.WRITE}>
                                                                {PermissionType.WRITE.toLowerCase()}
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <Button variant="destructive" onClick={() => removeUser(index)}>
                                            <CircleMinus/>
                                        </Button>
                                    </div>
                                )
                            })}
                            <div className="flex justify-center">
                                <Button onClick={addBlankEmail} variant="secondary" type='button'>
                                    <CirclePlus/>&nbsp;Add user
                                </Button>
                            </div>
                            <DrawerFooter>
                                <Button type="submit">Share</Button>
                                <Button variant="outline" type='button' onClick={closeModal}>
                                    Cancel
                                </Button>
                            </DrawerFooter>
                        </form>
                    </Form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default ShareDocModal;