import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {lazy, Suspense} from "react";

const HomePage = lazy(() => import('../pages/HomePage.tsx'))
const Dashboard = lazy(() => import('../pages/Dashboard.tsx'))
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<HomePage/>}>
            <Route path='docs' element={<Dashboard/>}/>
        </Route>
    )
)

function RouterOutlet() {
    return <Suspense fallback={<h1>Loading...</h1>}>
        <RouterProvider router={router}/>
    </Suspense>
}

export default RouterOutlet