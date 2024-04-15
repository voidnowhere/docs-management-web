import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {lazy, Suspense} from "react";

const HomePage = lazy(() => import('../pages/HomePage.tsx'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<HomePage/>}/>
  )
)

function RouterOutlet() {
  return <Suspense fallback={<h1>Loading...</h1>}>
    <RouterProvider router={router}/>
  </Suspense>
}

export default RouterOutlet