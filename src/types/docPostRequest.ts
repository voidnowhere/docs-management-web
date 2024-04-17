import Metadata from "@/types/metadata.ts";

interface DocPostRequest {
    file: File,
    metadata: Metadata[]
}

export default DocPostRequest;