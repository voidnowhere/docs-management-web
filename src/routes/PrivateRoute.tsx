import {useAuth} from "react-oidc-context";
import {JSX, useEffect} from "react";

function PrivateRoute({children}: { children: JSX.Element[] | JSX.Element }) {
    const auth = useAuth();

    useEffect(() => {
        if (!auth.isAuthenticated) {
            auth.signinRedirect()
        }
    }, [auth]);

    if (!auth.isAuthenticated) {
        return null
    }

    return children
}

export default PrivateRoute;