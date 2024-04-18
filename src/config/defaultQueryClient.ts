import {QueryClient} from "@tanstack/react-query";

const defaultQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    }
})

export default defaultQueryClient