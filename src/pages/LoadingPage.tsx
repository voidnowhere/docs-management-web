import {Loader} from "lucide-react";

function LoadingPage() {
    return (
        <div className='flex gap-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <span>Loading</span>
            <Loader/>
        </div>
    )
}

export default LoadingPage;