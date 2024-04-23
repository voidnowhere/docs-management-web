import Metadata from "@/types/docs/metadata.ts";

interface DocPostRequest {
    file: File,
    metadata: Metadata[]
}

export default DocPostRequest;