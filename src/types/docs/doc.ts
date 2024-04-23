export interface Doc {
    id: string;
    title: string;
    type: string;
    creationDate: string;
    metadata: Record<string, string>;
}
