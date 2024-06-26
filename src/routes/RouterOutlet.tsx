import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {lazy, Suspense} from "react";
import PrivateRoute from "@/routes/PrivateRoute.tsx";
import LoadingPage from "@/pages/LoadingPage.tsx";

const DefaultLayout = lazy(() => import('../layouts/DefaultLayout.tsx'))
const Dashboard = lazy(() => import('../pages/DashboardPage.tsx'))

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<DefaultLayout/>}>
            <Route path='docs' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
        </Route>
    )
)

function RouterOutlet() {
    return <Suspense fallback={<LoadingPage/>}>
        <RouterProvider router={router}/>
    </Suspense>
}

export default RouterOutlet