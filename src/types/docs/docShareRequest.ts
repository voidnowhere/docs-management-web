import DocPermission from "@/types/docs/docPermission.ts";

export default interface DocShareRequest {
    docId: string
    users: DocPermission[]
}