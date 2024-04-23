import {PermissionType} from "@/types/docs/permissionType.ts";

export default interface DocPermission {
    email: string
    permission: PermissionType
}