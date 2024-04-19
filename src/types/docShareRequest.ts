import {PermissionType} from "@/types/permissionType.ts";

export default interface DocShareRequest {
    docId: string
    permissionType: PermissionType
    emails: string[]
}