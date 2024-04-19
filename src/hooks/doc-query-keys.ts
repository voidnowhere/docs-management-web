export const docsQueryKeys = {
    all: ['docs'],
    sharedDocs: ['sharedDocs'],
    search: (keyword: string) => [...docsQueryKeys.all, keyword],
};