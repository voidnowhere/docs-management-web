import {Link, Outlet} from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu.tsx";
import {useAuth} from "react-oidc-context";
import LogoutButton from "@/components/auth/logout-button.tsx";
import LoginButton from "@/components/auth/login-button.tsx";

function DefaultLayout() {
    const auth = useAuth()

    return (
        <>
            <div className='flex mt-2 px-2'>
                <div className='flex justify-center grow'>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link to='/' className={navigationMenuTriggerStyle()}>
                                    Home
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem hidden={!auth.isAuthenticated}>
                                <Link to='/docs' className={navigationMenuTriggerStyle()}>
                                    Docs
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div>
                    <LoginButton/>
                    <LogoutButton/>
                </div>
            </div>
            <Outlet/>
        </>
    )
}

export default DefaultLayout