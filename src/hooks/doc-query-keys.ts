

export const docsQueryKeys = {
    all: ['docs'],
    search: (keyword: string) => [...docsQueryKeys.all, keyword],
};