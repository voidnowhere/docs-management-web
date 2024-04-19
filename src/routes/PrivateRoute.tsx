import {useAuth} from "react-oidc-context";
import {JSX} from "react";
import {Navigate} from "react-router-dom";

function PrivateRoute({children}: { children: JSX.Element[] | JSX.Element }) {
    const auth = useAuth();

    if (!auth.isAuthenticated) {
        return <Navigate to={'/'}/>
    }

    return children
}

export default PrivateRoute;