import {PermissionType} from "@/types/docs/permissionType.ts";

export default interface DocShareRequest {
    docId: string
    permissionType: PermissionType
    emails: string[]
}