import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog.tsx"
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {CircleMinus, CirclePlus, Share} from "lucide-react";
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
import {Switch} from "@/components/ui/switch.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useBoolean} from "ahooks";

const formSchema = z.object({
    users: z.array(z.object({
        email: z.string().email()
    })),
})

function ShareDocModal({docId}: { docId: string }) {
    const [isOpen, {setTrue: setIsOpenTrue, setFalse: setIsOpenFalse}] = useBoolean(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            users: [{email: ''}],
        }
    })
    const {
        fields: emailFields,
        append: appendEmail,
        remove: removeUser,
    } = useFieldArray({
        name: 'users',
        control: form.control
    })
    const {mutateAsync: shareDoc} = useShareDoc()
    const [permission, setPermission] = useState<PermissionType>(PermissionType.READ)

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const emails = values.users.map(user => user.email)
        const request: DocShareRequest = {
            docId: docId,
            permissionType: permission,
            emails: emails
        }

        shareDoc(request).then(() => {
            closeModal()
        })
    }

    const addBlankEmail = () => {
        appendEmail({
            email: ''
        })
    }

    const closeModal = () => {
        removeUser()
        form.reset()
        setIsOpenFalse()
    }

    const changePermission = () => {
        setPermission(prevState => (prevState === PermissionType.READ)
            ? PermissionType.WRITE
            : PermissionType.READ
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpenTrue}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Share className="h-4 w-4"/>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Share doc</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-96">
                    <div className='flex justify-center items-center space-x-2 grow'>
                        <Switch checked={permission === PermissionType.WRITE} onCheckedChange={changePermission}/>
                        <Label>{permission.toLowerCase()}</Label>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-2">
                            {emailFields.map((_, index) => {
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
                                        <Button variant="destructive" onClick={() => removeUser(index)}
                                                disabled={index === 0}>
                                            <CircleMinus/>
                                        </Button>
                                    </div>
                                )
                            })}
                            <div className="flex justify-center">
                                <Button onClick={addBlankEmail} variant="secondary" type='button'>
                                    <CirclePlus className='mr-2'/>
                                    Add user email
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