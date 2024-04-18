import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {lazy, Suspense} from "react";
import PrivateRoute from "@/routes/PrivateRoute.tsx";

const DefaultLayout = lazy(() => import('../layouts/DefaultLayout.tsx'))
const Dashboard = lazy(() => import('../pages/Dashboard.tsx'))

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<DefaultLayout/>}>
            <Route path='docs' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
        </Route>
    )
)

function RouterOutlet() {
    return <Suspense fallback={<h1>Loading...</h1>}>
        <RouterProvider router={router}/>
    </Suspense>
}

export default RouterOutlet