import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {lazy, Suspense} from "react";
import PrivateRoute from "@/routes/PrivateRoute.tsx";
import LoadingPage from "@/pages/LoadingPage.tsx";

const DefaultLayout = lazy(() => import('@/layouts/DefaultLayout.tsx'))
const DocsPage = lazy(() => import('@/pages/DocsPage.tsx'))
const SharedDocsPage = lazy(() => import('@/pages/SharedDocsPage.tsx'))

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<DefaultLayout/>}>
            <Route path='docs'>
                <Route index element={<PrivateRoute><DocsPage/></PrivateRoute>}/>
                <Route path='shared' element={<PrivateRoute><SharedDocsPage/></PrivateRoute>}/>
            </Route>
        </Route>
    )
)

function RouterOutlet() {
    return (
        <Suspense fallback={<LoadingPage/>}>
            <RouterProvider router={router}/>
        </Suspense>
    )
}

export default RouterOutlet