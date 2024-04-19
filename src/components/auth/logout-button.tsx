import {Button} from "@/components/ui/button.tsx";
import {LogOut} from "lucide-react";
import {useAuth} from "react-oidc-context";

function LogoutButton() {
    const auth = useAuth()

    const logout = () => {
        auth.signoutRedirect()
    }

    if (auth.isAuthenticated) {
        return (
            <Button variant='ghost' onClick={logout}>
                <LogOut/>&nbsp;Logout
            </Button>
        )
    }
}

export default LogoutButton