import RouterOutlet from "@/routes/RouterOutlet.tsx";
import {QueryClientProvider} from "@tanstack/react-query";
import defaultQueryClient from "@/libs/defaultQueryClient.ts";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Toaster} from "@/components/ui/sonner.tsx";

function App() {
    return (
        <QueryClientProvider client={defaultQueryClient}>
            <RouterOutlet/>
            <Toaster/>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}

export default App
