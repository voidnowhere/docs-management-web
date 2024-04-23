import {useAuth} from "react-oidc-context";
import {LogIn} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

function LoginButton() {
    const auth = useAuth()

    const login = () => {
        auth.signinRedirect()
    }

    if (auth.isLoading) {
        return null
    }

    if (!auth.isAuthenticated) {
        return (
            <Button variant='ghost' onClick={login}>
                <LogIn/>&nbsp;Login
            </Button>
        )
    }
}

export default LoginButton